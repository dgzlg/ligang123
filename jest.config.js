module.exports = {
  setupFilesAfterEnv: ['./rtl.setup.js'],
  moduleNameMapper: {
    '\.(css|less|jpeg|jpg|png|svg)$': '<rootDir>/jest.file.ignore.js',
  },
};
