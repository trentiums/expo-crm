module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "babel-plugin-styled-components",
      [
        "module-resolver",
        {
          alias: {
            "@redux/*": ["./lib/redux/*"],
            "@utils/*": ["./lib/utils/*"],
            "@type/*": ["./lib/type/*"],
            "@api/*": ["./lib/api/*"],
            "@atoms/*": ["./components/atoms/*"],
            "@molecules/*": ["./components/molecules/*"],
            "@organisms/*": ["./components/organisms/*"],
            "@constants/*": ["./constants/*"],
            "@templates/*": ["./components/templates/*"],
            "@assets/*": ["./assets/*"],
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
