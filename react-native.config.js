module.exports = {
    project: {
      ios: {},
      android: {},
    },
    assets: ['../Assets/fonts'],

    // Leave the auto-linking enabled by removing the platforms block for react-native-device-info
    dependencies: {
      'react-native-device-info': {
        platforms: {
          ios: {},  
          android: {}, 
        },
      },
    },
  };