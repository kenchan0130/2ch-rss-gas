import { Find2chSearchResult } from './find2chSearchResult';

export class CacheStoreObject {
  content: Find2chSearchResult
  insertedAt: Date
  
  constructor(content: Find2chSearchResult, insertedAt: string | Date) {
    this.content = content;
    this.insertedAt = 'string' === typeof insertedAt ? new Date(insertedAt) : insertedAt;
  }

  isSameObject(value: CacheStoreObject): boolean {
    return value.content.threadUrl.value === this.content.threadUrl.value;
  }
}
