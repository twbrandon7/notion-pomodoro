import { QueryDatabaseResponse, PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

interface NotionApi {
    getDatabase: (databaseId: string) => Promise<QueryDatabaseResponse>
    createDatabase: (databaseName: string, databaseProperties: any) => Promise<string | never[]>
    listDatabaseInPage: () => Promise<PartialBlockObjectResponse[]>
}

export default NotionApi