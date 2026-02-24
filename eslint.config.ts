import pluginVue from 'eslint-plugin-vue'
import skipFormatting from 'eslint-config-prettier/flat'
import { globalIgnores } from 'eslint/config'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  ...pluginVue.configs['flat/essential'],

  {
    rules: {
      'vue/block-lang': 'off',
      'vue/multi-word-component-names': 'off', 
    },
  },

  skipFormatting,
]