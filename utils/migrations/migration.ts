import NotionApi from '@/types/notion/notion'


abstract class DatabaseMigration {
  protected readonly notion: NotionApi
  constructor(notion: NotionApi) {
    this.notion = notion
  }

  abstract migrate(): void
}

export default DatabaseMigration
