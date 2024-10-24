import "react-native-gesture-handler"
import {AuthProvider} from "../core/AuthContext";
import AuthGuard from "../core/AuthGuard";
import {useFonts} from "expo-font";
import {useCallback} from "react";
import {SplashScreen} from "expo-router";

/**
 * This is the entry point into the application. Assets that are required by the
 * application, irrespective of the authentication status, are loaded here.
 */
const Layout = () => {

  const [fontsLoaded] = useFonts({
    DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
    DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('../assets/fonts/DMSans-Regular.ttf')
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded])

  if (!fontsLoaded) return null;

  return (
      <AuthProvider onLayout={onLayoutRootView}>
        <AuthGuard></AuthGuard>
      </AuthProvider>
  );
}

export default Layout;