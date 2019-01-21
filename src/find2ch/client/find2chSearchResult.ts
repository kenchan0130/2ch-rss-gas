import { Copyable } from 'ts-copyable';

import { Find2chSearchThreadBoardName } from '../domain/find2chSearchThreadBoardName';
import { Find2chSearchThreadBoardServerType } from '../domain/find2chSearchThreadBoardServerType';
import { Find2chSearchThreadBoardUrl } from '../domain/find2chSearchThreadBoardUrl';
import { Find2chSearchThreadhHighlightBody } from '../domain/find2chSearchThreadHighlightBody';
import { Find2chSearchThreadPostCount } from '../domain/find2chSearchThreadPostCount';
import { Find2chSearchThreadTitle } from '../domain/find2chSearchThreadTitle';
import { Find2chSearchThreadUpdatedAt } from '../domain/find2chSearchThreadUpdatedAt';
import { Find2chSearchThreadUrl } from '../domain/find2chSearchThreadUrl';

export class Find2chSearchResult extends Copyable<Find2chSearchResult> {
  constructor(
    readonly threadTitle: Find2chSearchThreadTitle,
    readonly threadUrl: Find2chSearchThreadUrl,
    readonly postCount: Find2chSearchThreadPostCount,
    readonly boardName: Find2chSearchThreadBoardName,
    readonly boardUrl: Find2chSearchThreadBoardUrl,
    readonly updatedAt: Find2chSearchThreadUpdatedAt,
    readonly serverType: Find2chSearchThreadBoardServerType,
    readonly highlightBody: Find2chSearchThreadhHighlightBody,
    ) {
    super(Find2chSearchResult);
  }
}
