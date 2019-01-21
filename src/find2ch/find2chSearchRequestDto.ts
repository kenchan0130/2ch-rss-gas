import { Copyable } from 'ts-copyable';

import { Find2chSearchWord } from './domain/find2chSearchWord';

export class Find2chSearchRequestDto extends Copyable<Find2chSearchRequestDto>  {
  constructor(readonly searchWord: Find2chSearchWord) {
    super(Find2chSearchRequestDto);
  }
}
