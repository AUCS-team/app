// This is a demo code file
// Feel free to delete it

/**
 * 增加数据
 * 此处的注释将会自动附带到生成的 API 文档中
 */
export interface ReqAddTopic {
    /** 要增加的消息内容 */
    videoName:string
    topic:string
}

export interface ResAddTopic {
    /** 服务端内容创建时间 */
    issuccess: boolean
}