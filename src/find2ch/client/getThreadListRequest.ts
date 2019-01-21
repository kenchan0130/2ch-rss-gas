import { Copyable } from 'ts-copyable';

import { Find2chSearchWord } from '../domain/find2chSearchWord';
import { Find2chSearchSortType } from './find2chSearchSortType';
import { Find2chSearchTargetBbsType } from './find2chSearchTargetBbsType';
import { Find2chSearchTargetContentType } from './find2chSearchTargetContentType';
import { Find2chSearchUrl } from './find2chSearchUrl';
import { Find2chSearchUrlFactory } from './find2chSearchUrlFactory';

export class GetThreadListRequest extends Copyable<GetThreadListRequest> {
  private _url?: Find2chSearchUrl;

  constructor(
    readonly searchWord: Find2chSearchWord,
    readonly sortType: Find2chSearchSortType,
    readonly contentType: Find2chSearchTargetContentType,
    readonly bbsType: Find2chSearchTargetBbsType,
  ) {
    super(GetThreadListRequest);
  }

  url(): Find2chSearchUrl {
    if (this._url) return this._url;

    const factory = new Find2chSearchUrlFactory(
      this.searchWord,
      this.sortType,
      this.contentType,
      this.bbsType,
    );
    const generatedUrl = factory.generate();
    this._url = generatedUrl;

    return generatedUrl;
  }
}
