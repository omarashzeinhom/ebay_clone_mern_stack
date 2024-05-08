// jest.config.js

export default {
    // other Jest configuration options
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
      '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    preset: 'ts-jest/presets/js-with-babel',
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      },
    },
  };
  