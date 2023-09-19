import { type GetBaseProps } from '@core/helpers/get-base-props';

import {
	User,
	type UserProps,
} from '@modules/user/domain/entities/user-entity';

export const makeUser = (
	override: Partial<GetBaseProps<UserProps>> = {},
): User =>
	new User({
		id: override.id ?? 'random_id',
		name: 'Adam Smith',
		email: 'adam.smith@gmail.com',
		password: 'superdifficultpassword',
		transactions: [],
		...override,
	});
