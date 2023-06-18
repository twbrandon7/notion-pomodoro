import { Client } from '@notionhq/client'
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'
import { Plugin } from '@nuxt/types'
import { config } from 'dotenv'
import NotionBlock from '@/types/notion/block'
import NotionApi from '@/types/notion/notion'

config()

class Notion implements NotionApi {
  public readonly notion: Client
  private readonly pageId: string
  constructor() {
    this.notion = new Client({
      auth: process.env.NOTION_API_KEY,
    })
    this.pageId = process.env.NOTION_PAGE_ID ? process.env.NOTION_PAGE_ID : ''
  }

  async getDatabase(databaseId: string) {
    const response = await this.notion.databases.query({
      database_id: databaseId,
    })
    return response
  }

  async createDatabase(databaseName: string, databaseProperties: any) {
    if (this.pageId === undefined) {
      return []
    }
    // Create a new database
    const createdDatabase = await this.notion.databases.create({
      parent: {
        page_id: this.pageId,
      },
      title: [
        {
          type: 'text',
          text: {
            content: databaseName,
          },
        },
      ],
      properties: databaseProperties,
    })

    return createdDatabase.id
  }

  async listDatabaseInPage() {
    const results = []
    let nextCursor
    do {
      const response: ListBlockChildrenResponse =
        await this.notion.blocks.children.list({
          block_id: this.pageId,
          start_cursor: nextCursor,
          page_size: 100,
        })
      results.push(...response.results)
      nextCursor = response.next_cursor ? response.next_cursor : undefined
    } while (nextCursor !== undefined)
    return results.filter((block) => {
      return (block as NotionBlock).type === 'child_database'
    })
  }
}

const notion = new Notion()

const notionPlugin: Plugin = (
  { app }, // eslint-disable-line @typescript-eslint/no-unused-vars
  inject: (key: string, value: any) => void
) => {
  inject('notion', notion)
}

export default { notionPlugin, Notion }
