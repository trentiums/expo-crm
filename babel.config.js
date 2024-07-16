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
            "@redux/*": ["./src/redux/*"],
            "@utils/*": ["./src/utils/*"],
            "@type/*": ["./src/type/*"],
            "@api/*": ["./src/api/*"],
            "@atoms/*": ["./src/components/atoms/*"],
            "@molecules/*": ["./src/components/molecules/*"],
            "@organisms/*": ["./src/components/organisms/*"],
            "@constants/*": ["./src/constants/*"],
            "@templates": ["./src/components/templates"],
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
