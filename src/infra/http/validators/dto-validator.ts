import { type ValidationError } from '@nestjs/common';

export class DtoValidator {
	public static extractConstraints(errors: ValidationError[]): string[] {
		const constraints: string[] = errors.flatMap((err): string[] =>
			err.constraints ? Object.values(err.constraints) : [],
		);

		return constraints;
	}
}
