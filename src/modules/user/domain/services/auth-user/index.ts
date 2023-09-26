import { type BaseService } from '@core/base-service';

export type AuthUserRequest = {
	email: string;
	password: string;
};

export type AuthUserResponse = {
	token: string;
};

export class AuthUserService
	implements BaseService<AuthUserRequest, AuthUserResponse>
{
	public async exec(request: AuthUserRequest): Promise<AuthUserResponse> {
		console.log(request);

		return {
			token: '',
		};
	}
}
