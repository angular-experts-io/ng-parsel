export default {
  roots: ['<rootDir>/src'],
  resolver: 'jest-ts-webcompat-resolver',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['<rootDir>/bin/help-menu.ts', '<rootDir>/bin/pretty-html-log.bin.ts'],
};
