import * as queryString from 'querystring';

import { Find2chSearchWord } from '../domain/find2chSearchWord';
import { Find2chSearchScendType } from './find2chSearchScendType';
import { Find2chSearchSortType } from './find2chSearchSortType';
import { Find2chSearchTargetBbsType } from './find2chSearchTargetBbsType';
import { Find2chSearchTargetContentType } from './find2chSearchTargetContentType';
import { Find2chSearchUrl } from './find2chSearchUrl';

export class Find2chSearchUrlFactory {
  private searchWord: Find2chSearchWord;
  private sortType: Find2chSearchSortType;
  private contentType: Find2chSearchTargetContentType;
  private bbsType: Find2chSearchTargetBbsType;
  private baseUrl = 'http://find.2ch.sc/index.php';

  private scendTypeUrlParamMap: ReadonlyMap<Find2chSearchScendType, string> = new Map([
    [Find2chSearchScendType.Included, 'D'],
    [Find2chSearchScendType.NotInclude, 'A'],
  ]);

  private sortTypeUrlParamMap: ReadonlyMap<Find2chSearchSortType, string> = new Map([
    [Find2chSearchSortType.LatestPost, 'MODIFIED'],
    [Find2chSearchSortType.Created, 'CREATED'],
    [Find2chSearchSortType.NumberOfPosts, 'NPOSTS'],
  ]);

  private contentTypeUrlParamMap: ReadonlyMap<Find2chSearchTargetContentType, string> = new Map([
    [Find2chSearchTargetContentType.Body, 'BODY'],
    [Find2chSearchTargetContentType.Title, 'TITLE'],
  ]);

  private bbsTypeUrlParamMap: ReadonlyMap<Find2chSearchTargetBbsType, string> = new Map([
    [Find2chSearchTargetBbsType.All, 'ALL'],
    [Find2chSearchTargetBbsType.Net, 'NET'],
    [Find2chSearchTargetBbsType.Sc, 'SC'],
  ]);

  constructor(
    searchWord: Find2chSearchWord,
    sortType: Find2chSearchSortType,
    contentType: Find2chSearchTargetContentType,
    bbsType: Find2chSearchTargetBbsType,
  ) {
    this.searchWord = searchWord;
    this.sortType = sortType;
    this.contentType = contentType;
    this.bbsType = bbsType;
  }

  generate(): Find2chSearchUrl {
    const params = this.urlSearchParams();
    const url = `${this.baseUrl}?${queryString.stringify(params)}`;

    return new Find2chSearchUrl(url);
  }

  private urlSearchParams(): { [key: string]: string; } {
    const params: { [key: string]: string; } = {};
    params['STR'] = this.searchWord.toUrlEncode();

    const scendType = Find2chSearchScendType.Included;

    const scendTypeUrlParamString = this.scendTypeUrlParamMap.get(scendType);
    if (scendTypeUrlParamString) {
      params['SCEND'] = 'D';
    } else {
      throw new Error(`${scendType} is not supported param.`);
    }

    const sortTypeUrlParamString = this.sortTypeUrlParamMap.get(this.sortType);
    if (sortTypeUrlParamString) {
      params['SORT'] = sortTypeUrlParamString;
    } else {
      throw new Error(`${this.sortType} is not supported param.`);
    }

    const contentTypeUrlParamString = this.contentTypeUrlParamMap.get(this.contentType);
    if (contentTypeUrlParamString) {
      params['TYPE'] = contentTypeUrlParamString;
    } else {
      throw new Error(`${this.contentType} is not supported param.`);
    }

    const bbsTypeUrlParamString = this.bbsTypeUrlParamMap.get(this.bbsType);
    if (bbsTypeUrlParamString) {
      params['BBS'] = bbsTypeUrlParamString;
    } else {
      throw new Error(`${this.bbsType} is not supported param.`);
    }

    return params;
  }
}
