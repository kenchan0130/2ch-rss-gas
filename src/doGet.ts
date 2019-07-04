import { DoGetResponseAdapter } from './doGetResponseAdapter';
import { Find2chClearCache } from './find2ch/domain/find2chClearCache';
import { Find2chRssItemSize } from './find2ch/domain/find2chRssItemSize';
import { Find2chSearchWord } from './find2ch/domain/find2chSearchWord';
import { Find2chSearchRequestDto } from './find2ch/find2chSearchRequestDto';
import { Find2chSearchUseCase } from './find2ch/find2chSearchUseCase';
import { GetEvent } from './getEvent';

export function doGet(event: GetEvent): GoogleAppsScript.Content.TextOutput {
  const searchQuery = event.parameter.q;
  if (!searchQuery) {
    throw new Error('Query parameter "q" is empty. Please set it.');
  }

  const itemSizeParam = (() => {
    const defaultSize = 5;
    const itemSizeParam = event.parameter.itemSize;
    if (!itemSizeParam) {
      return defaultSize;
    }

    const itemSize = parseInt(itemSizeParam);
    if (isNaN(itemSize) || itemSize <= 0) {
      return defaultSize;
    }
    return itemSize;
  })();

  const searchWord = new Find2chSearchWord(searchQuery)
  const clearCache = new Find2chClearCache(!!event.parameter.clearCache);
  const rssItemSize = new Find2chRssItemSize(itemSizeParam);

  const cache = CacheService.getScriptCache();
  const cacheKey = `rss-${searchWord.value}`;

  if (clearCache.value) {
    cache.remove(cacheKey);
  }
  const rssText = cache.get(cacheKey);
  if (rssText) {
    return ContentService.createTextOutput(rssText).setMimeType(ContentService.MimeType.RSS)
  }

  const requestDto = new Find2chSearchRequestDto(searchWord, clearCache, rssItemSize);
  const useCase = new Find2chSearchUseCase();
  const responseDto = useCase.run(requestDto);
  const doGetResponseAdapter = new DoGetResponseAdapter();

  const responseRssText = doGetResponseAdapter.adapt(responseDto);

  // 1時間 RSS をキャッシュ
  cache.put(cacheKey, responseRssText, 60*60);
  
  return ContentService.createTextOutput(responseRssText).setMimeType(ContentService.MimeType.RSS)
}
