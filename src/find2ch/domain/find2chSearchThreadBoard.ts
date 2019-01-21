import { Copyable } from 'ts-copyable';

import { Find2chSearchThreadBoardName } from './find2chSearchThreadBoardName';
import { Find2chSearchThreadBoardServerType } from './find2chSearchThreadBoardServerType';
import { Find2chSearchThreadBoardUrl } from './find2chSearchThreadBoardUrl';

export class Find2chSearchThreadBoard extends Copyable<Find2chSearchThreadBoard> {
  constructor(
    readonly name: Find2chSearchThreadBoardName,
    readonly url: Find2chSearchThreadBoardUrl,
    readonly serverType: Find2chSearchThreadBoardServerType,
  ) {
    super(Find2chSearchThreadBoard);
  }
}
