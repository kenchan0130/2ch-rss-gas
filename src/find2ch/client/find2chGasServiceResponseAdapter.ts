import * as cheerio from 'cheerio';
import { injectable } from 'tsyringe';

import { Find2chSearchThreadBoardName } from '../domain/find2chSearchThreadBoardName';
import { Find2chSearchThreadBoardServerType } from '../domain/find2chSearchThreadBoardServerType';
import { Find2chSearchThreadBoardUrl } from '../domain/find2chSearchThreadBoardUrl';
import { Find2chSearchThreadhHighlightBody } from '../domain/find2chSearchThreadHighlightBody';
import { Find2chSearchThreadPostCount } from '../domain/find2chSearchThreadPostCount';
import { Find2chSearchThreadTitle } from '../domain/find2chSearchThreadTitle';
import { Find2chSearchThreadUpdatedAt } from '../domain/find2chSearchThreadUpdatedAt';
import { Find2chSearchThreadUrl } from '../domain/find2chSearchThreadUrl';
import { Find2chSearchResult } from './find2chSearchResult';
import { GetThreadListResponse } from './getThreadListResponse';

@injectable()
export class Find2chGasServiceResponseAdapter {
  adapt(value: string): GetThreadListResponse {
    const resultList = this.parseHtml(value);
    return new GetThreadListResponse(resultList);
  }

  private parseHtml(value: string): Find2chSearchResult[] {
    const $root = cheerio.load(value);
    const searchResultDom = $root('dl');
    searchResultDom.remove('dt:last-child');
    const threadResultDom = searchResultDom.children();
    const threadResultDomSize = threadResultDom.length;

    if (threadResultDomSize % 2 !== 0) {
      throw new Error(`Thread result size is ${threadResultDomSize}. It expects even number.`);
    }

    const evenIndexSeq = [...Array(threadResultDomSize)]
      .map((_, i) => i)
      .filter((v) => { return v % 2 === 0; });
    return evenIndexSeq.map((evenValue) => {
      const threadHeadlineDom = cheerio.load(threadResultDom[evenValue]).root();
      const additionalThreadInfoDom = cheerio.load(threadResultDom[evenValue + 1]).root();

      const boardName = threadHeadlineDom.closest('font').find('a').text().trim();
      const boardUrl = new URL(threadHeadlineDom.closest('font').find('a').attr('href'));

      const serverTypeMatch = threadHeadlineDom.closest('font').remove('a')
        .text().trim().match(/@(.+)/);
      const serverType = () => {
        if (serverTypeMatch && serverTypeMatch[1]) {
          return serverTypeMatch[1];
        }
        throw new Error('Cannot find server type.');
      };

      const threadTitle = threadHeadlineDom.closest('a').text().trim();
      const threadUrl = new URL(threadHeadlineDom.closest('a').attr('href'));
      const postCountMatch = threadHeadlineDom.remove('font').remove('a')
        .text().trim().match(/\(([0-9]+)\)/);
      const postCount = () => {
        if (postCountMatch && postCountMatch[1]) {
          return Number(postCountMatch[1]);
        }
        throw new Error('Cannot find post count.');
      };

      const updatedAtMatch = additionalThreadInfoDom.find('.r_sec_body > font').first()
        .text().trim().match(/.*?:(.+)/);
      const updatedAt = () => {
        if (updatedAtMatch && updatedAtMatch[1]) {
          return new Date(updatedAtMatch[1]);
        }
        throw new Error('Cannot find updated time.');
      };

      const highlightBody = () => {
        const body = additionalThreadInfoDom.find('.r_sec_body')
        .remove('a').remove('font')
        .text().trim().replace(/^…/, '').trim();
        return body.length === 0 ? null : body;
      };

      return new Find2chSearchResult(
        new Find2chSearchThreadTitle(threadTitle),
        new Find2chSearchThreadUrl(threadUrl),
        new Find2chSearchThreadPostCount(postCount()),
        new Find2chSearchThreadBoardName(boardName),
        new Find2chSearchThreadBoardUrl(boardUrl),
        new Find2chSearchThreadUpdatedAt(updatedAt()),
        new Find2chSearchThreadBoardServerType(serverType()),
        new Find2chSearchThreadhHighlightBody(highlightBody()),
      );
    });
  }
}
