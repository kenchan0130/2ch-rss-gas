import { Find2chSearchResult } from './Find2chSearchResult';

export class CacheStoreObject {
  content: Find2chSearchResult
  insertedAt: Date
  
  constructor(content: Find2chSearchResult, insertedAt: string | Date) {
    this.content = content;
    this.insertedAt = 'string' === typeof insertedAt ? new Date(insertedAt) : insertedAt;
  }
}
