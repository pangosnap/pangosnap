import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@chromatic-com/storybook', '@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],

  //  Добавляем обработку .svg
  webpackFinal: async (config, { configType }) => {
    // Удаляем стандартное правило для .svg
    const fileLoaderRule = config.module?.rules?.find(
      rule =>
        typeof rule === 'object' &&
        rule !== null &&
        'test' in rule &&
        rule.test instanceof RegExp &&
        rule.test.test('.svg')
    ) as { exclude?: RegExp[] }

    if (fileLoaderRule) {
      fileLoaderRule.exclude = [/\.svg$/]
    }

    // Добавляем обработку svg через svgr
    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

export default config
