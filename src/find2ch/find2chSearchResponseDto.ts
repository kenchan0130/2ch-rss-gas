import { Copyable } from 'ts-copyable';

import { Find2chSearchThread } from './domain/find2chSearchThread';
import { Find2chSearchWord } from './domain/find2chSearchWord';

export class Find2chSearchResponseDto extends Copyable<Find2chSearchResponseDto>  {
  constructor(
    readonly threadList: Find2chSearchThread[],
    readonly searchWord: Find2chSearchWord,
  ) {
    super(Find2chSearchResponseDto);
  }
}
