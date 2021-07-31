/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      InfoScreen: "info",
      ReadScreen: "read",
      SearchScreen: "search",
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: "home",
            },
          },
          Genre: {
            screens: {
              GenreScreen: "genre",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
