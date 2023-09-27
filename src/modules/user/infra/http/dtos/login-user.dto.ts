import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const LoginUserSchema = z.object({
	email: z.string().email('Invalid email address').nonempty().toLowerCase(),
	password: z
		.password()
		.min(8)
		.max(30)
		.atLeastOne('digit')
		.atLeastOne('lowercase')
		.atLeastOne('special')
		.atLeastOne('uppercase'),
});

export class LoginUserDto extends createZodDto(LoginUserSchema) {}
