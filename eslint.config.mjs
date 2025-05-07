// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  // Your custom configs here
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx,vue}'],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'semi': ['error', 'never'],
      'quotes': ['error', 'single']
    }
  }
])
