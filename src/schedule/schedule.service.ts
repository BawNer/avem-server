import { Injectable } from "@nestjs/common";
import * as fs from 'fs'
import * as path from 'path'
import { DbfParserUtils } from "./utils/dbfParser.utils";

@Injectable()
export class ScheduleService {
  async getSchedule(query: any): Promise<any> {
    const {groupsId, schedule} = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '/uploads/schedule/schema.json'), {encoding: 'utf-8'}))

    let schema = schedule

    if (query.group) {
      schema = schema.filter(item => item.group == query.group)
    }

    if (query.date == 'today') {
      for (const item of schema) {
        item.schema = item.schema.filter(item => {
          const currentDate = new Date().toLocaleDateString()
          const itemDate = new Date(item.date).toLocaleDateString()
          return currentDate == itemDate ? item : false
        })
      }
    }

    if (query.audience) {
      for (let i = 0; i < schema.length; i++) {
        for (const item of schema[i].schema) {
          item.classes = item.classes.filter(classes => classes.audience == query.audience)
        }
        schema[i].schema = schema[i].schema.filter(sh => sh.classes.length)
      }
      schema = schema.filter(cl => cl.schema.length)
    }

    if (query.lecturer) {
      for (let i = 0; i < schema.length; i++) {
        for (const item of schema[i].schema) {
          item.classes = item.classes.filter(classes => classes.lecturer.includes(query.lecturer))
        }
        schema[i].schema = schema[i].schema.filter(sh => sh.classes.length)
      }
      schema = schema.filter(cl => cl.schema.length)
    }

    return {
      groups: groupsId,
      schema
    }
  }

  async uploadSchema(schema: Express.Multer.File) {
    const dbfParser = new DbfParserUtils(schema)
    let parsedSchema = {}
    await dbfParser.parse().then(() => {
      parsedSchema = this.getSchedule({})
    })

    return parsedSchema
  }
}