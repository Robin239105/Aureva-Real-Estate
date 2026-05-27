import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  { ignores: ['dist', 'node_modules', 'public'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        // Legacy global pattern — every .jsx attaches symbols to window
        React: 'readonly',
        ReactDOM: 'readonly',
        IMG: 'readonly',
        PROPERTIES: 'readonly',
        LOCATIONS: 'readonly',
        AGENTS: 'readonly',
        TESTIMONIALS: 'readonly',
        BLOG_POSTS: 'readonly',
        formatPrice: 'readonly',
        slugify: 'readonly',
        Logo: 'readonly',
        Icon: 'readonly',
        Header: 'readonly',
        Footer: 'readonly',
        PropertyCard: 'readonly',
        SearchBar: 'readonly',
        SectionHead: 'readonly',
        CTABand: 'readonly',
        Reveal: 'readonly',
        PageBanner: 'readonly',
        NAV_LINKS: 'readonly',
        CookieBanner: 'readonly',
        HomePage: 'readonly',
        LocationCard: 'readonly',
        AgentMiniCard: 'readonly',
        BlogCard: 'readonly',
        TestimonialRotator: 'readonly',
        HeroCinematic: 'readonly',
        Counter: 'readonly',
        PropertiesPage: 'readonly',
        FilterField: 'readonly',
        ListRow: 'readonly',
        DetailsPage: 'readonly',
        FloorPlanSVG: 'readonly',
        MapPlaceholder: 'readonly',
        BuyPage: 'readonly',
        RentPage: 'readonly',
        SellPage: 'readonly',
        Field: 'readonly',
        AgentsPage: 'readonly',
        AgentCard: 'readonly',
        AgentProfilePage: 'readonly',
        AboutPage: 'readonly',
        BlogPage: 'readonly',
        BlogDetailsPage: 'readonly',
        ContactPage: 'readonly',
        PrivacyPage: 'readonly',
        TermsPage: 'readonly',
        AccessibilityPage: 'readonly',
        CookiesPage: 'readonly',
        App: 'readonly',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: { react: { version: '18.3' } },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...prettier.rules,

      // React 18 + automatic JSX runtime — no need to import React for JSX
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      // Legacy global pattern — page components attached to window are valid refs
      'react/jsx-no-undef': ['error', { allowGlobals: true }],

      // Legacy pattern uses redeclared module-level consts after destructure
      'no-redeclare': 'off',
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_|^React$',
        },
      ],
      'no-empty': ['warn', { allowEmptyCatch: true }],

      'react-refresh/only-export-components': 'off',
    },
  },
];
