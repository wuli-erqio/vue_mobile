module.exports = {
  presets: [
    '@vue/app'
  ],
  // 配置自动按需引入组件
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
