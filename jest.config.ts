import type jest from 'jest';

export default {
	roots: ['<rootDir>/src'],
	moduleFileExtensions: ['js', 'json', 'ts'],
	testRegex: '.*\\.spec\\.ts$',
	transform: {
		'^.+\\.(t|j)s$': '@swc/jest',
	},
	passWithNoTests: true,
	cache: false,
	collectCoverageFrom: ['**/*.(t|j)s'],
	coverageDirectory: './tests/coverage',
	testEnvironment: 'node',
	moduleNameMapper: {
		'@tests/(.+)': '<rootDir>/tests/$1',
		'@core/(.+)': '<rootDir>/src/core/$1',
		'@modules/(.+)': '<rootDir>/src/modules/$1',
	},
} as jest.Config;
