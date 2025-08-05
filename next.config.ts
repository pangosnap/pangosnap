import type { NextConfig } from 'next'
import type { Configuration } from 'webpack'

const nextConfig: NextConfig = {
  webpack(config: Configuration) {
    // Удаляем стандартную обработку .svg (иначе конфликт)
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

    // Добавляем обработчик для .svg через svgr
    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

export default nextConfig
