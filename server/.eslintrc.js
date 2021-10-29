module.exports = {
    env: {
        commonjs: true,
        node: true,
        es2021: true
    },
    extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: './'
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: { 'no-underscore-dangle': ['error', {allow: ['_id'] }] },
    ignorePatterns: ['.eslintrc.js']
};