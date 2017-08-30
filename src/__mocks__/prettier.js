const prettier = require.requireActual('prettier')
const {format} = prettier

module.exports = prettier

const mockFormatSpy = jest.fn(mockFormat)

Object.assign(prettier, {
  format: mockFormatSpy,
  resolveConfig: jest.fn(prettier.resolveConfig),
})

function mockFormat(...args) {
  global.__PRETTIER_ESLINT_TEST_STATE__.prettierPath = __filename
  if (mockFormatSpy.throwError) {
    throw mockFormatSpy.throwError
  }
  return format(...args)
}
