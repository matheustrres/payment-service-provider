import {
	User,
	type UserProps,
} from '@modules/user/domain/entities/user-entity';

export const makeUser = (
	override: Partial<UserProps> = {},
	id?: string,
): User =>
	new User(
		{
			name: 'Adam Smith',
			email: 'adam.smith@gmail.com',
			password: 'superbdifficultpassword',
			...override,
		},
		id,
	);
