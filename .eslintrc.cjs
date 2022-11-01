module.exports = {
  root: true,
  extends: ['airbnb-typescript/base', 'prettier'],
  plugins: ['import', 'prettier'],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
};
