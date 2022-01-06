module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/airbnb',
        '@vue/typescript/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'arrow-parens': 0,
        'no-underscore-dangle': 0,
        'no-param-reassign': 0,
        'class-methods-use-this': 0,
        'max-len': 0,
        'import/no-cycle': 0,
        'linebreak-style': 0,
        indent: ['error', 4],
        'space-before-function-paren': ['error', 'always'],
        'no-continue': 0,
        'import/prefer-default-export': 0,
        'no-await-in-loop': 0,
        'default-case': 0,
        'prefer-destructuring': 0,
    },
};
