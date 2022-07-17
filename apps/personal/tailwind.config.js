/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-var-requires */
const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Marcellus', ...defaultTheme.fontFamily.serif],
        mono: ['Roboto Mono', ...defaultTheme.fontFamily.mono],
        sundanesse: ['TG Siloka Sundanesse'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.stone.800'),
            a: {
              color: theme('colors.blue.500'),
              '&:hover': {
                color: theme('colors.blue.700'),
              },
              code: { color: theme('colors.blue.400') },
            },
            'h2,h3,h4': {
              'scroll-margin-top': defaultTheme.spacing[32],
            },
            thead: {
              borderBottomColor: theme('colors.stone.200'),
            },
            code: { color: theme('colors.pink.500') },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false,
          },
        },
        dark: {
          css: {
            color: theme('colors.slate.200'),
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.600'),
              },
              code: { color: theme('colors.blue.400') },
            },
            blockquote: {
              borderLeftColor: theme('colors.slate.700'),
              color: theme('colors.slate.300'),
            },
            'h2,h3,h4': {
              color: theme('colors.slate.100'),
              'scroll-margin-top': defaultTheme.spacing[32],
            },
            hr: { borderColor: theme('colors.slate.700') },
            ol: {
              li: {
                '&:before': { color: theme('colors.slate.500') },
              },
            },
            ul: {
              li: {
                '&:before': { backgroundColor: theme('colors.slate.500') },
              },
            },
            strong: { color: theme('colors.slate.100') },
            thead: {
              th: {
                color: theme('colors.slate.100'),
              },
              borderBottomColor: theme('colors.slate.600'),
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.slate.700'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
