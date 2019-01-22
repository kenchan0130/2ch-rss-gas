import * as cheerio from 'cheerio';

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

export class Find2chGasServiceResponseAdapter {
  adapt(value: string): GetThreadListResponse {
    const resultList = this.parseHtml(value);
    return new GetThreadListResponse(resultList);
  }

  private parseHtml(value: string): Find2chSearchResult[] {
    const $root = cheerio.load(value);
    const searchResultDom = $root('.content_pane > nbsp > dl');
    // Remove extra dt tag
    searchResultDom.find('dt').last().remove();

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

      const boardName = threadHeadlineDom.find('font > a').text().trim();
      const boardUrl = threadHeadlineDom.find('font > a').attr('href');

      // Remove tag to extract text
      threadHeadlineDom.find('font > a').remove();
      const includedServerTypeString = threadHeadlineDom.find('font').text().trim();
      const serverTypeMatch = includedServerTypeString.match(/＠(.+)/);
      const serverType = () => {
        if (serverTypeMatch && serverTypeMatch[1]) {
          return serverTypeMatch[1];
        }
        throw new Error(`Cannot find server type in "${includedServerTypeString}".`);
      };

      const threadTitle = threadHeadlineDom.find('a').first().text().trim();
      const threadUrl = threadHeadlineDom.find('a').first().attr('href');
      // Remove tag to extract text
      threadHeadlineDom.find('font, a').remove();
      const includedPostCountString = threadHeadlineDom.text().trim();
      const postCountMatch = includedPostCountString.match(/([0-9]+)/);
      const postCount = () => {
        if (postCountMatch && postCountMatch[1]) {
          return Number(postCountMatch[1]);
        }
        throw new Error(`Cannot find post count in "${includedPostCountString}".`);
      };

      const updatedAtString = additionalThreadInfoDom.find('.r_sec_body > font').first()
        .text().trim();
      const updatedAtMatch = updatedAtString.match(/.*?:(.+)/);
      const updatedAt = () => {
        if (updatedAtMatch && updatedAtMatch[1]) {
          return new Date(updatedAtMatch[1]);
        }
        throw new Error(`Cannot find updated time in "${updatedAtString}".`);
      };

      const highlightBody = () => {
        additionalThreadInfoDom.find('.r_sec_body > font, .r_sec_body > a').remove();
        const body = additionalThreadInfoDom.text().trim().replace(/^…/, '').trim();
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
