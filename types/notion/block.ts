interface NotionBlock {
  object: string
  id: string
  parent: {
    type: string
    page_id: string
  }
  created_time: string
  last_edited_time: string
  created_by: {
    object: string
    id: string
  }
  last_edited_by: {
    object: string
    id: string
  }
  has_children: boolean
  archived: boolean
  type: string
  heading_2: {
    rich_text: {
      type: string
      text: {
        content: string
        link: null
      }
      annotations: {
        bold: boolean
        italic: boolean
        strikethrough: boolean
        underline: boolean
        code: boolean
        color: string
      }
      plain_text: string
      href: null
    }[]
    color: string
    is_toggleable: boolean
  }
}

export default NotionBlock
