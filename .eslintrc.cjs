module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "plugin:react/recommended",
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    '**/*.module.css.d.ts',
    '*.config.js',
    '.stylelintrc.json'
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    'react',
    'import',
    'newline-destructuring',
    'import-newlines',
    "@typescript-eslint",
    "eslint-plugin-import",
    "react-hooks",
    "simple-import-sort",
    "sort-destructure-keys",
    "sort-imports-es6-autofix",
    "sort-keys-fix",
  ],
  settings: {
    "react": {
        "version": "detect",
    },
  },
  rules: {
    "array-bracket-newline": [
        "error",
        {
            "multiline": true,
        },
    ],
    "array-bracket-spacing": [
        "error",
        "always"
    ],
    "array-element-newline": [
        "error",
        {
            "ArrayExpression": {
                "minItems": 2,
            },
            "ArrayPattern": {
                "minItems": 3,
            },
        },
    ],
    "block-spacing": ["error"],
    "comma-dangle": [
        "error",
        "always-multiline",
    ],
    "comma-spacing": ["error"],
    "complexity": [
        "error",
        10,
    ],
    "dot-notation": ["error"],
    "eol-last": [
        "error",
        "always",
    ],
    "import/newline-after-import": [
        "error",
        {
            "count": 1,
        },
    ],
    "import/no-duplicates": ["error"],
    "import-newlines/enforce": [
        "error",
        1,
    ],
    "indent": [
        "error",
        4,
    ],
    "jsx-quotes": [
        "error",
        "prefer-double",
    ],
    "key-spacing": ["error"],
    "keyword-spacing": [
        "error",
        {
            "before": true,
            "after": true,
        },
    ],
    "max-len": [
        "off",
        {
            "code": 140,
        },
    ],
    "newline-destructuring/newline": [
        "error",
        {
            "items": 1,
        },
    ],
    "newline-per-chained-call": ["error"],
    "no-alert": ["error"],
    "no-console": ["error"],
    "no-debugger": ["error"],
    "no-dupe-class-members": ["error"],
    "no-else-return": ["error"],
    "no-empty": [
        "error",
        {
            "allowEmptyCatch": true,
        },
    ],
    "no-multiple-empty-lines": [
        "error",
        {
            "max": 1,
            "maxBOF": 0,
        }
    ],
    "no-multi-spaces": "error",
    "no-shadow": ["error"],
    "no-trailing-spaces": ["error"],
    "no-unused-vars": ["error"],
    "object-curly-newline": [
        "error",
        {
            "ImportDeclaration": {
                "multiline": true,
                "minProperties": 2,
            },
            "ExportDeclaration": "never",
            "ObjectPattern": {
                "multiline": true,
                "minProperties": 2
            },
        },
    ],
    "object-curly-spacing": [
        "error",
        "always",
    ],
    "object-shorthand": ["error"],
    "padding-line-between-statements": [
        "error",
        {
            "blankLine": "always",
            "prev": "*",
            "next": "return",
        },
        {
            "blankLine": "any",
            "prev": [
                "const",
                "let",
                "var",
            ],
            "next": "*",
        },
    ],
    "quotes": [
        "off",
        "single",
        {
            "allowTemplateLiterals": true,
        },
    ],
    "react/react-in-jsx-scope": "off",
    "react-hooks/exhaustive-deps": ["error"],
    "react-hooks/rules-of-hooks": ["error"],
    "react/display-name": 0,
    "react/jsx-boolean-value": [
        "error",
        "never",
    ],
    "react/jsx-closing-bracket-location": [
        "error",
        {
            "nonEmpty": "tag-aligned",
        },
    ],
    "react/jsx-curly-spacing": [
        "error",
        "never",
    ],
    "react/jsx-first-prop-new-line": [
        "error",
        "multiline",
    ],
    "react/jsx-max-props-per-line": [
        "error",
        {
            "maximum": 1,
        },
    ],
    "react/jsx-newline": [
        "error",
        {
            "prevent": true,
            "allowMultilines": true,
        },
    ],
    "react/jsx-sort-props": ["error"],
    "react/jsx-tag-spacing": [
        "error",
        {
            "beforeSelfClosing": "always",
        },
    ],
    "react/prop-types": 0,
    "simple-import-sort/exports": ["error"],
    "sort-destructure-keys/sort-destructure-keys": [
        "error",
        {
            "caseSensitive": true,
        },
    ],
    "sort-imports-es6-autofix/sort-imports-es6": ["error"],
    "sort-keys": [
        "error",
        "asc",
        {
            "natural": true,
        },
    ],
    "sort-keys-fix/sort-keys-fix": [
        "error",
        "asc",
        {
            "natural": true,
        },
    ],
    "space-before-blocks": "error",
  },
  overrides: [
    {
        "files": ["**/*.ts", "**/*.tsx"],
        "parser": "@typescript-eslint/parser",
        "plugins": [
            "typescript-sort-keys",
        ],
        "rules": {
            // Disabled rules
            "@typescript-eslint/ban-types": 0,
            "@typescript-eslint/no-empty-interface": 0,
            "@typescript-eslint/no-restricted-imports": 0,
            "@typescript-eslint/no-var-requires": 0,
            "no-restricted-imports": 0,

            // Enabled rules
            "@typescript-eslint/array-type": ["error"],
            "@typescript-eslint/consistent-type-assertions": ["error"],
            "@typescript-eslint/explicit-module-boundary-types": ["off"],
            "@typescript-eslint/member-delimiter-style": ["error"],
            "@typescript-eslint/method-signature-style": ["error"],
            "@typescript-eslint/naming-convention": [
                "warn",
                {
                    "selector": "interface",
                    "format": ["PascalCase"],
                    "prefix": ["I"],
                },
            ],
            "@typescript-eslint/no-confusing-non-null-assertion": ["error"],
            "@typescript-eslint/no-explicit-any": ["warn"],
            "@typescript-eslint/no-extra-non-null-assertion": ["error"],
            "@typescript-eslint/no-inferrable-types": ["error"],
            "@typescript-eslint/no-namespace": ["error"],
            "@typescript-eslint/no-non-null-assertion": ["error"],
            "@typescript-eslint/no-non-null-asserted-optional-chain": ["error"],
            "@typescript-eslint/no-require-imports": ["error"],
            "@typescript-eslint/prefer-enum-initializers": ["error"],
            "@typescript-eslint/type-annotation-spacing": [
                "error",
                {
                    "before": false,
                    "after": true,
                    "overrides": {
                        "arrow": {
                            "before": true,
                            "after": true,
                        },
                    },
                },
            ],

            // Override eslint rules with their @typescipt-eslint equivalents
            "brace-style": 0,
            "@typescript-eslint/brace-style": [
                "error",
                "1tbs",
                {
                    "allowSingleLine": true,
                },
            ],
            "comma-spacing": 0,
            "@typescript-eslint/comma-spacing": ["error"],
            "func-call-spacing": 0,
            "@typescript-eslint/func-call-spacing": ["error"],
            "indent": 0,
            "@typescript-eslint/indent": [
                "error",
                4,
            ],
            "keyword-spacing": 0,
            "@typescript-eslint/keyword-spacing": ["error"],
            "no-array-constructor": 0,
            "@typescript-eslint/no-array-constructor": ["error"],
            "no-dupe-class-members": 0,
            "@typescript-eslint/no-dupe-class-members": ["error"],
            "no-empty-function": 0,
            "@typescript-eslint/no-empty-function": ["error"],
            "no-extra-semi": 0,
            "@typescript-eslint/no-extra-semi": ["error"],
            "no-invalid-this": 0,
            "@typescript-eslint/no-invalid-this": ["error"],
            "no-loop-func": 0,
            "@typescript-eslint/no-loop-func": ["error"],
            "no-loss-of-precision": 0,
            "@typescript-eslint/no-loss-of-precision": ["error"],
            "no-redeclare": 0,
            "@typescript-eslint/no-redeclare": ["error"],
            "no-shadow": 0,
            "@typescript-eslint/no-shadow": ["error"],
            "no-unused-expressions": 0,
            "@typescript-eslint/no-unused-expressions": [
                "error",
                {
                    "allowShortCircuit": true,
                },
            ],
            "no-unused-vars": 0,
            "@typescript-eslint/no-unused-vars": ["error"],
            "no-use-before-define": 0,
            "@typescript-eslint/no-use-before-define": ["error"],
            "object-curly-spacing": 0,
            "@typescript-eslint/object-curly-spacing": [
                "error",
                "always",
            ],
            "semi": 0,
            "@typescript-eslint/semi": ["error"],
            "space-infix-ops": 0,
            "@typescript-eslint/space-infix-ops": [
                "error",
                {
                    "int32Hint": false,
                },
            ],
            "quotes": 0,
            "@typescript-eslint/quotes": [
                "off",
                "single",
            ],
        },
    },
  ],
}
