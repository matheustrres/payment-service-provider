import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateUserSchema = z.object({
	name: z.string().nonempty(),
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

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
