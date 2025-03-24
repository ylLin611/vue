import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'border-main': 'border-$vp-c-divider',
    'bg-main': 'bg-gray-400',
    'bg-base': 'bg-white dark:bg-hex-1a1a1a',
    'flex-center': 'flex items-center justify-center',
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  theme: {
    colors: {
      primary: '#3eaf7c',
    },
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
