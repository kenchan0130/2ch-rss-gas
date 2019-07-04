import { Find2chSearchThreadBoardName } from '../domain/find2chSearchThreadBoardName';
import { Find2chSearchThreadBoardServerType } from '../domain/find2chSearchThreadBoardServerType';
import { Find2chSearchThreadBoardUrl } from '../domain/find2chSearchThreadBoardUrl';
import { Find2chSearchThreadhHighlightBody } from '../domain/find2chSearchThreadHighlightBody';
import { Find2chSearchThreadPostCount } from '../domain/find2chSearchThreadPostCount';
import { Find2chSearchThreadTitle } from '../domain/find2chSearchThreadTitle';
import { Find2chSearchThreadUpdatedAt } from '../domain/find2chSearchThreadUpdatedAt';
import { Find2chSearchThreadUrl } from '../domain/find2chSearchThreadUrl';
import { CacheStoreObject } from './cacheStoreObject';
import { Find2chSearchResult } from './find2chSearchResult';

export class CacheStoreClient {
  private cacheKey: string;
  private cache: GoogleAppsScript.Cache.Cache;
  private saveItemUpper: number ;
  private maxCacheTimeSec: number;

  constructor(cacheKey: string) {
    this.cacheKey = cacheKey;
    this.cache = CacheService.getScriptCache();
    // 500 items are buffer sufficient for store size
    this.saveItemUpper = 500;
    this.maxCacheTimeSec = 21600;
  }

  selectAllSortByInsertDateDesc(limit: number): Find2chSearchResult[] {
    return this._selectAll().sort((a, b) => { 
      return a.insertedAt > b.insertedAt ? 1 : -1;
    }).slice(0, limit).map((value) => {
      return value.content;
    });
  };

  pushOut(insertingValue: Find2chSearchResult) {
    var all = this._selectAll();
    var insertingObject = new CacheStoreObject(insertingValue, new Date());
    var canInsert = all.filter((value) => {
      return insertingObject.isSameObject(value);
    }).length === 0;
    
    if (canInsert) {
      all.push(insertingObject);
      var sortedAll = all.sort((a, b) => { return a.insertedAt < b.insertedAt ? 1 : -1 });
      if (sortedAll.length > this.saveItemUpper) {
        sortedAll.pop();
      }

      const storeValue = JSON.stringify(
        sortedAll.map((value) => {  
          return this._serializeStoreObject(value);
        })
      );
      this._save(storeValue);
    }
  };

  clearStore() {
    this.cache.remove(this.cacheKey);
  }

  extentionStorePeriod() {
    const content = this.cache.get(this.cacheKey);
    if (content) {
      this._save(content);
    }
  }

  _save(storeValue: string) {
    this.cache.put(this.cacheKey, storeValue, this.maxCacheTimeSec);
  }

  _selectAll(): CacheStoreObject[] {
    return JSON.parse(this.cache.get(this.cacheKey) || '[]').map((value: any) => {
      return this._deserializeStoreObject(value);
    });
  }

  _serializeStoreObject(value: CacheStoreObject): any {
    const content = value.content;
    return {
      insertedAt: value.insertedAt,
      content: {
        boardName: content.boardName.value,
        boardUrl: content.boardUrl.value,
        highlightBody: content.highlightBody.value,
        postCount: content.postCount.value,
        serverType: content.serverType.value,
        threadTitle: content.threadTitle.value,
        threadUrl: content.threadUrl.value,
        updatedAt: content.updatedAt.value,
      }
    };
  }
  
  _deserializeStoreObject(value: any): CacheStoreObject {
    const result = new Find2chSearchResult(
      new Find2chSearchThreadTitle(value.content.threadTitle),
      new Find2chSearchThreadUrl(value.content.threadUrl),
      new Find2chSearchThreadPostCount(value.content.postCount),
      new Find2chSearchThreadBoardName(value.content.boardName),
      new Find2chSearchThreadBoardUrl(value.content.boardUrl),
      new Find2chSearchThreadUpdatedAt(new Date(value.content.updatedAt)),
      new Find2chSearchThreadBoardServerType(value.content.serverType),
      new Find2chSearchThreadhHighlightBody(value.content.highlightBody),
    );
    return new CacheStoreObject(result, new Date(value.insertedAt));
  }
}