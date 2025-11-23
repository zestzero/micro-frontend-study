const { withNativeFederation, shareAll } = require('@softarc/native-federation/build');

module.exports = withNativeFederation({
  name: 'host',
  remotes: {
    remote: 'http://localhost:5001/remoteEntry.json',
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
