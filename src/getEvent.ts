export class GetEvent {
  queryString!: string;
  parameter!: { [index: string]: string | undefined; };
  parameters!: { [index: string]: [string | undefined]; };
  contentLength!: number;
  contentPath!: string;
}
