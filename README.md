# crm

crm developed using React-native expo

> This project is using yarn's [workspace](https://classic.yarnpkg.com/en/docs/workspaces/)

Requirements
To use Expo, you need to have the following tools installed on your machine:

NodeJs LTS release - Only Node.js LTS releases (even-numbered) are recommended.

Git for source control.

Watchman (for Linux or macOS users).

## List of commands

- Install dependancy
  `yarn`

- run android app
  `yarn run android`
- run ios app
  `yarn run ios`
- run web app
  `yarn run web`
- remove all `node_modules` in workspace
  `yarn run rm:nm`

### Prebuild

Before a native app can be compiled, the native source code must be generated. Expo CLI provides a unique and powerful system called prebuild, which generates the native code for your project based on four factors:

1. The `app config` file (app.json, app.config.js).

2. Arguments passed to the `npx expo prebuild` command.

3. Version of `expo` that's installed in the project and its corresponding prebuild template.

4. Autolinking, for linking native modules found in the `package.json`.

### Usage Prebuild

### `Prebuild can be used by running`

```
npx expo prebuild
```

### Account Required

- [ ] Google Console
- [ ] Meta Developer ( facebook )
- [ ] Apple Developer
- [ ] Google Firebase

### Login With Social Account Need

`Testing Account should be added in developer testing account list`

### to make CICD pipe line and EAS upload

`1)install eas cli threw npm install -g eas-cli`
`2)make an account in expo dev`
`3)login in expo dev and account settings and make access token`
`4)git hub repo -> security -> actions ->make repo secret and pass access token during creating repo secret`
`5)make .github -> workflows ->(name).yml file (ref -> https://atlas.dev/blog/building-a-ci-cd-pipeline-for-your-expo-app-using-eas)`
`6)login eas threw terminal and run command for eas file -> eas build:configure`
