import React from "react";
import { Provider } from "react-redux";
import configureStore from "./src/redux/index.js";
import { initialiseApplication } from "./src/redux/reducers/applicationReducer.js";
import Navigation from "./src/navigation/index.js";
import { enableScreens } from "react-native-screens";
import * as SplashScreen from "expo-splash-screen";
import { useState } from "react";
import { AppLoading } from "expo";

enableScreens();

const store = configureStore();
store.dispatch(initialiseApplication());

// SplashScreen.preventAutoHideAsync()
//   .then((result) =>
//     console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
//   )
//   .catch(console.warn); // it's good to explicitly catch and inspect any error

// export default function App() {

//   return (
//     <Provider store={store}>
//       <Navigation />
//     </Provider>
//   );
// }

export default class App extends React.Component {
  state = {
    isReady: false,
  };
  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }

  async _cacheResourcesAsync() {
    const images = [require("./assets/blank-profile-pic.jpeg")];

    // images.map((image) => {
    //   return Asset.fromModule(image).downloadAsync();
    // });
  }
}
