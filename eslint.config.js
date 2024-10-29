import js from '@eslint/js';
import globals from 'globals';
import parser from '@typescript-eslint/parser';
import plugin from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';

export default [
	js.configs.recommended,
	{
		languageOptions: {
			ecmaVersion: 2020,
			globals: {
				...globals.browser,
				...globals.node,
			},
			parser, // Встановлення парсера
			parserOptions: {
				project: ['tsconfig.json'], // Вкажіть коректний шлях до tsconfig.json
			},
		},
		files: ['**/*.{js,ts}'],
		plugins: {
			prettier,
			'typescript-eslint': plugin,
		},
		rules: {
			'prettier/prettier': 'error',
			'no-console': ['error', { allow: ['error', 'warn'] }], // Забороняємо використання console, дозволяємо error та warn
			'prefer-const': 'warn', // Попередження при використанні let
			'no-unused-vars': 'warn', // Заміна 'error' на 'warn', якщо потрібно
		},
	},
];
