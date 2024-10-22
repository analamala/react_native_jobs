import "react-native-gesture-handler"
import {useCallback} from "react";
import {useFonts} from "expo-font";
import {SplashScreen} from "expo-router";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Drawer} from "expo-router/drawer";
import {Ionicons} from "@expo/vector-icons";
import DrawerMenu from "../components/core/DrawerMenu";

SplashScreen.preventAutoHideAsync();

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

  // TODO: TO REMOVE DRAWER MENU UNCOMMENT BELOW LINE AND COMMENT GESTURE RETURN BLOCK
  // return <Stack onLayout={onLayoutRootView()}/>;

  return (
    <GestureHandlerRootView style={{flex: 1}} onLayout={onLayoutRootView}>
      <Drawer drawerContent={DrawerMenu}
              screenOptions={{
                // drawerHideStatusBarOnOpen: true,
                // drawerLabelStyle: {marginLeft: -20}
              }}>
        {/* NOTE: below <Drawer.Screen... implementations can be eliminated if 'DrawerMenu' (custom)
         suppresses the expo drawer built menu (based on expo router */}
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title: 'Dashboard',
            drawerIcon: ({size, color}) => (
              <Ionicons name="home-outline" size={size} color={color}/>
            )
          }}
        />
        <Drawer.Screen
          name="job-details/[id]" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Job Details',
            title: 'Job details',
          }}
        />
        <Drawer.Screen
          name="search/[id]" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Search Results',
            title: 'Search results page',
          }}
        />
        {/*<Drawer.Screen
          name="logout" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Logout',
            title: 'Logout'
          }}
        />*/}
      </Drawer>
    </GestureHandlerRootView>
  );
}

export default Layout;