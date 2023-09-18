export interface BaseService<Request, Response> {
	exec(request: Request): Promise<Response> | Response;
}
