import { Copyable } from 'ts-copyable';

import { Find2chClearCache } from './domain/find2chClearCache';
import { Find2chSearchWord } from './domain/find2chSearchWord';

export class Find2chSearchRequestDto extends Copyable<Find2chSearchRequestDto>  {
  constructor(readonly searchWord: Find2chSearchWord, readonly clearCache: Find2chClearCache) {
    super(Find2chSearchRequestDto);
  }
}
