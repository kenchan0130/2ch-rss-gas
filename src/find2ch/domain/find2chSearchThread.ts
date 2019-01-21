import { Copyable } from 'ts-copyable';

import { Find2chSearchThreadBoard } from './find2chSearchThreadBoard';
import { Find2chSearchThreadhHighlightBody } from './find2chSearchThreadHighlightBody';
import { Find2chSearchThreadPostCount } from './find2chSearchThreadPostCount';
import { Find2chSearchThreadTitle } from './find2chSearchThreadTitle';
import { Find2chSearchThreadUpdatedAt } from './find2chSearchThreadUpdatedAt';
import { Find2chSearchThreadUrl } from './find2chSearchThreadUrl';

export class Find2chSearchThread extends Copyable<Find2chSearchThread> {
  constructor(
    readonly title: Find2chSearchThreadTitle,
    readonly url: Find2chSearchThreadUrl,
    readonly postCount: Find2chSearchThreadPostCount,
    readonly updatedAt: Find2chSearchThreadUpdatedAt,
    readonly board: Find2chSearchThreadBoard,
    readonly highlightBody: Find2chSearchThreadhHighlightBody,
  ) {
    super(Find2chSearchThread);
  }
}
