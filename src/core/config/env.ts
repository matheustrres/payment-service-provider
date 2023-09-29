import { z } from 'zod';

enum NodeEnv {
	DEVELOPMENT = 'development',
	PRODUCTION = 'production',
	TEST = 'test',
}

const EnvSchema = z.object({
	NODE_ENV: z.nativeEnum(NodeEnv),
	APP_PORT: z.string().transform((v: string): number => parseInt(v)),
	TYPEORM_CONN_TYPE: z.string().nonempty(),
	TYPEORM_CONN_DATABASE: z.string().nonempty(),
	TYPEORM_CONN_USERNAME: z.string().default('postgres'),
	TYPEORM_CONN_HOST: z.string().nonempty(),
	TYPEORM_CONN_PASSWORD: z.string().nonempty(),
	TYPEORM_CONN_PORT: z
		.string()
		.nonempty()
		.transform((v) => parseInt(v)),
	TYPEORM_MIGRATIONS_PATH: z.string().nonempty(),
	TYPEORM_ENTITIES_PATH: z.string().nonempty(),
	JWT_MD5_SECRET_KEY: z.string().nonempty(),
});

export const Env = EnvSchema.parse(process.env);

export type Env = z.infer<typeof EnvSchema>;
