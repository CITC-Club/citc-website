import google from 'eslint-config-google';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

/** Next.js defaults + Google JavaScript Style Guide (eslint-config-google). */
const eslintConfig = [
  ...nextCoreWebVitals,
  {
    rules: {
      ...google.rules,
      'require-jsdoc': 'off',
      'valid-jsdoc': 'off',
      'max-len': [
        'error',
        {
          code: 100,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      'new-cap': [
        'error',
        {
          capIsNewExceptions: [
            'Component',
            'Metadata',
            'MetadataRoute',
            'NextRequest',
            'NextResponse',
          ],
        },
      ],
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/purity': 'off',
    },
  },
  {
    ignores: ['public/**', 'src/db/migrations/**'],
  },
];

export default eslintConfig;
