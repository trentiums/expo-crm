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
            "@redux/*": ["./redux/*"],
            "@utils/*": ["./utils/*"],
            "@type/*": ["./type/*"],
            "@api/*": ["./api/*"],
            "@atoms/*": ["./components/atoms/*"],
            "@molecules/*": ["./components/molecules/*"],
            "@organisms/*": ["./components/organisms/*"],
            "@constants/*": ["./constants/*"],
            "@templates": ["./components/templates"],
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
