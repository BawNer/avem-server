import * as path from 'path'
import * as fs from 'fs'
import { DBFFile } from 'dbffile';

export class DbfParserUtils {
  private filename
  constructor (dbf) {
    this.filename = dbf.filename
  }

  private getDBFFile = () => {
    const pathToDBF = path.join(__dirname, '..', '..', '..', '/uploads/')
    const DBF = fs.readdirSync(pathToDBF).filter(file => file == this.filename)[0]
    return path.join(pathToDBF, DBF)
  }

  private getPathToDist = () => path.join(__dirname, '..', '..', '..', '/uploads/schedule/')

  private makeClassesShema = ({ LES, AUD, NAME, SUBJECT, SUBJ_TYPE }) => {
    return {
        lesson: LES,
        audience: AUD,
        lecturer: NAME,
        subject: SUBJECT,
        subjectType : SUBJ_TYPE
      }
  }

  private parseDate = isoDate => {
      const dt = new Date(isoDate.split('-').reverse().join('-'))
      return dt.toISOString()
  }

  private getRowFromDBF = async () => {
      const dbf = await DBFFile.open(this.getDBFFile(), { encoding: 'IBM866' })
      const result = await dbf.readRecords()
      return result as any
  }

  private getGroupID = (nodeGroupList, childGroupList?) => {
      const tmp = childGroupList || []
      nodeGroupList.map(element => tmp.indexOf(element.GROUP) === -1 ? tmp.push(element.GROUP) : false)
      return tmp
  }

  private makeDBFToJSON = async () => {

      const schedule = []

      const dbfData = await this.getRowFromDBF()

      const groupsId = this.getGroupID(dbfData)

      for (const gid in groupsId ) {
          schedule.push({group: groupsId[gid], schema: []})
          for (let indexDBF = 0; indexDBF < dbfData.length; indexDBF++) {
              if ( schedule[gid].group === dbfData[indexDBF].GROUP && dbfData[indexDBF].SUBG !== '2') {
                  const date = this.parseDate(dbfData[indexDBF].DATE)
                  const schema = this.makeClassesShema(dbfData[indexDBF])
                  if ( schedule[gid].schema.length === 0 ) {
                      schedule[gid].schema.push({
                          date: date,
                          classes: [schema]
                      })
                  } else {
                      for (let sch = 0; sch < schedule[gid].schema.length; sch++) {
                          if (schedule[gid].schema[sch].date === date ) {
                              schedule[gid].schema[sch].classes.push(schema)
                          } else {
                              if ( ++sch === schedule[gid].schema.length) {
                                  schedule[gid].schema.push({
                                      date: date,
                                      classes: [schema]
                                  })
                              } else { --sch }
                          }
                      }
                  }
              }
          }
      }

      return {
          groupsId,
          schedule
      }

  }

  public async parse() {
    await this.makeDBFToJSON().then(res => {
        try {
            if (!fs.existsSync(this.getPathToDist())) {
                fs.mkdirSync(this.getPathToDist())
            }
            fs.writeFileSync(path.join(this.getPathToDist(), 'schema.json'), JSON.stringify(res))
            fs.unlinkSync(this.getDBFFile())
        } catch (err) {
            console.log('Error', err)
        }
    })
  }
 
}