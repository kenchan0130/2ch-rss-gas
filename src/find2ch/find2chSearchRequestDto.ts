import { Copyable } from 'ts-copyable';

import { Find2chClearCache } from './domain/find2chClearCache';
import { Find2chRssItemSize } from './domain/find2chRssItemSize';
import { Find2chSearchWord } from './domain/find2chSearchWord';

export class Find2chSearchRequestDto extends Copyable<Find2chSearchRequestDto>  {
  constructor(
    readonly searchWord: Find2chSearchWord,
    readonly clearCache: Find2chClearCache,
    readonly find2chRssItemSize: Find2chRssItemSize,
  ) {
    super(Find2chSearchRequestDto);
  }
}
