import { Injectable } from "@nestjs/common";
import * as fs from 'fs'
import * as path from 'path'
import { DbfParserUtils } from "./utils/dbfParser.utils";

@Injectable()
export class ScheduleService {
  async getSchedule(query?: any): Promise<any> {
    const {groupsId, schedule} = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '/uploads/schedule/schema.json'), {encoding: 'utf-8'}))

    let schema = schedule

    if (query?.group) {
      schema = schema.filter(item => item.group == query.group)
    }

    if (query?.date == 'today') {
      for (const item of schema) {
        item.schema = item.schema.filter(item => {
          const currentDate = new Date().toLocaleDateString()
          const itemDate = new Date(item.date).toLocaleDateString()
          return currentDate == itemDate ? item : false
        })
      }
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
      parsedSchema = this.getSchedule()
    })

    return parsedSchema
  }
}