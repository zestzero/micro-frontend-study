const { withNativeFederation, shareAll } = require('@softarc/native-federation/build');

module.exports = withNativeFederation({
  name: 'remote',
  filename: 'remoteEntry.json',
  exposes: {
    './Button': './src/components/Button.tsx',
  },
  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
  },
  skip: [],
});
