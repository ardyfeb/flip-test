module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ts', '.tsx', '.ttf', '.svg', '.yaml', '.yml'],
        alias: {
          '~': './',
          '@': './src'
        }
      }
    ]
  ]
}
