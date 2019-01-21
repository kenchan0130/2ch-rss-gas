import { DoGetResponseAdapter } from './doGetResponseAdapter';
import { Find2chSearchWord } from './find2ch/domain/find2chSearchWord';
import { Find2chSearchRequestDto } from './find2ch/find2chSearchRequestDto';
import { Find2chSearchUseCase } from './find2ch/find2chSearchUseCase';
import { GetEvent } from './getEvent';

export function doGet(getEvent: GetEvent): GoogleAppsScript.Content.TextOutput {
  const searchQuery = getEvent.parameter.q;
  if (!searchQuery) {
    throw new Error('Query parameter "q" is empty. Please set it.');
  }
  const requestDto = new Find2chSearchRequestDto(new Find2chSearchWord(searchQuery));
  const useCase = new Find2chSearchUseCase();
  const responseDto = useCase.run(requestDto);
  const doGetResponseAdapter = new DoGetResponseAdapter();

  return doGetResponseAdapter.adapt(responseDto);
}
