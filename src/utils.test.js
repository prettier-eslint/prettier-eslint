import {getOptionsForFormatting} from './utils'

const getPrettierOptionsFromESLintRulesTests = [
  {
    rules: {
      'max-len': [2, 120, 2],
      indent: [2, 2, {SwitchCase: 1}],
      quotes: [2, 'single', {avoidEscape: true, allowTemplateLiterals: true}],
      'comma-dangle': [
        2,
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'always-multiline',
        },
      ],
    },
    options: {
      printWidth: 120,
      tabWidth: 2,
      parser: 'babylon',
      singleQuote: true,
      trailingComma: 'all',
      bracketSpacing: false,
    },
  },
  {rules: {'max-len': 2}, options: {printWidth: 80}},
  {rules: {'comma-dangle': [2, 'never']}, options: {trailingComma: 'none'}},
  {rules: {'comma-dangle': [2, 'always']}, options: {trailingComma: 'all'}},
  {
    rules: {
      'comma-dangle': [
        2,
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'never-multiline',
        },
      ],
    },
    options: {trailingComma: 'es5'},
  },
  {
    rules: {
      'comma-dangle': [
        2,
        {
          arrays: 'never',
          objects: 'never',
          imports: 'never',
          exports: 'never',
          functions: 'never',
        },
      ],
    },
    options: {trailingComma: 'none'},
  },
  // prettier doesn't allow tabs,
  // so we'll just go with the default and let eslint fix it
  {rules: {indent: [2, 'tab']}, options: {tabWidth: 2}},
  {rules: {'max-len': ['error', {code: 120}]}, options: {printWidth: 120}},
]

getPrettierOptionsFromESLintRulesTests.forEach(({rules, options}, index) => {
  test(`getPrettierOptionsFromESLintRulesTests ${index}`, () => {
    const {prettier} = getOptionsForFormatting({rules})
    expect(prettier).toMatchObject(options)
  })
})

test('if prettierOptions are provided, those are preferred', () => {
  const {prettier} = getOptionsForFormatting({rules: {quotes: [2, 'single']}}, {
    singleQuote: false,
  })
  expect(prettier).toMatchObject({singleQuote: false})
})

test('eslint config has only necessary properties', () => {
  const {eslint} = getOptionsForFormatting({
    globals: {window: false},
    rules: {'no-var': 'error', quotes: [2, 'single']},
  })
  expect(eslint).toMatchObject({
    fix: true,
    useEslintrc: false,
    rules: {quotes: [2, 'single']},
  })
})

test('useEslintrc is set to the given config value', () => {
  const {eslint} = getOptionsForFormatting({useEslintrc: true, rules: {}})
  expect(eslint).toMatchObject({fix: true, useEslintrc: true})
})
