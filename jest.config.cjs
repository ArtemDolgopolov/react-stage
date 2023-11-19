module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.test.(ts|tsx|js|jsx)'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  coverageThreshold: {
    global: {
      statements: 80,
    },
  },
};
