export default class HttpResponse {
  constructor(
    private statusCode: number,
    private message: string,
    private data?: any,
  ) {}
}
