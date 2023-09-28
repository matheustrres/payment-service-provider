export {};

declare global {
	export namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: string;
			TYPEORM_CONN_TYPE: string;
			TYPEORM_CONN_HOST: string;
			TYPEORM_CONN_DATABASE: string;
			TYPEORM_CONN_USERNAME: string;
			TYPEORM_CONN_PASSWORD: string;
			TYPEORM_CONN_PORT: number;
			TYPEORM_ENTITIES_PATH: string;
			TYPEORM_MIGRATIONS_PATH: string;
			JWT_MD5_SECRET_KEY: string;
		}
	}
}
