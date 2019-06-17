import { Find2chSearchThreadBoardName } from '../domain/find2chSearchThreadBoardName';
import { Find2chSearchThreadBoardServerType } from '../domain/find2chSearchThreadBoardServerType';
import { Find2chSearchThreadBoardUrl } from '../domain/find2chSearchThreadBoardUrl';
import { Find2chSearchThreadhHighlightBody } from '../domain/find2chSearchThreadHighlightBody';
import { Find2chSearchThreadPostCount } from '../domain/find2chSearchThreadPostCount';
import { Find2chSearchThreadTitle } from '../domain/find2chSearchThreadTitle';
import { Find2chSearchThreadUpdatedAt } from '../domain/find2chSearchThreadUpdatedAt';
import { Find2chSearchThreadUrl } from '../domain/find2chSearchThreadUrl';
import { CacheStoreObject } from './cacheStoreObject';
import { Find2chSearchResult } from './Find2chSearchResult';

export class CacheStoreClient {
  private cacheKey: string;
  private cache: GoogleAppsScript.Cache.Cache;
  private saveItemUpper: number 

  constructor(cacheKey: string) {
    this.cacheKey = cacheKey;
    this.cache = CacheService.getScriptCache();
    this.saveItemUpper = 20;
  }

  selectAllSortByInsertDateDesc(): Find2chSearchResult[] {
    return this._selectAll().sort((a, b) => { 
      return a.insertedAt < b.insertedAt ? 1 : -1;
    }).map((value) => {
      return value.content;
    });
  };

  pushOut(insertingValue: Find2chSearchResult) {
    var all = this._selectAll();
    var insertingObject = new CacheStoreObject(insertingValue, new Date());
    var canInsert = all.filter((value) => {
      // board name and thread title as id
      return value.content.boardUrl.value === insertingObject.content.boardUrl.value && value.content.threadTitle.value === insertingObject.content.boardUrl.value;
    }).length === 0;
    
    if (canInsert) {
      all.push(insertingObject);
      var sortedAll = all.sort((a, b) => { return a.insertedAt < b.insertedAt ? 1 : -1 });
      if (sortedAll.length > this.saveItemUpper) {
        sortedAll.pop();
      }

      const storeValue = JSON.stringify(
        sortedAll.map((value) => {  
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
        })
      );
      this.cache.put(this.cacheKey, storeValue);
    }
  };

  _selectAll(): CacheStoreObject[] {
    return JSON.parse(this.cache.get(this.cacheKey) || '[]').map((value: any) => {
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
    });
  }
}