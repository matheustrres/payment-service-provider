import type jest from 'jest';

export default {
	roots: ['<rootDir>/src'],
	moduleFileExtensions: ['js', 'json', 'ts'],
	testRegex: '.*\\.spec\\.ts$',
	transform: {
		'^.+\\.(t|j)s$': [
			'@swc/jest',
			{
				jsc: {
					keepClassNames: true,
					transform: {
						legacyDecorator: true,
						decoratorMetadata: true,
					},
					parser: {
						syntax: 'typescript',
						tsx: false,
						decorators: true,
					},
				},
			},
		],
	},
	passWithNoTests: true,
	cache: false,
	collectCoverageFrom: [
		'**/*.(t|j)s',
		'!<rootDir>/src/*.ts',
		'!<rootDir>/src/infra/database/**/**/**/*.ts',
	],
	coverageDirectory: './tests/coverage',
	testEnvironment: 'node',
	moduleNameMapper: {
		'@tests/(.+)': '<rootDir>/tests/$1',
		'@types/(.+)': '<rootDir>/src/types/$1',
		'@core/(.+)': '<rootDir>/src/core/$1',
		'@infra/(.+)': '<rootDir>/src/infra/$1',
		'@ioC/(.+)': '<rootDir>/src/ioC/$1',
		'@modules/(.+)': '<rootDir>/src/modules/$1',
	},
} as jest.Config;
