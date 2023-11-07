import { HttpClient } from 'tsrpc-browser';
import { serviceProto } from './shared/protocols/serviceProto';

// 创建全局唯一的 apiClient，需要时从该文件引入
export const Client = new HttpClient(serviceProto, {
  server: 'http://127.0.0.1:3000',
  json: true,
});
