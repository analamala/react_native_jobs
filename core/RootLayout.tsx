import {SplashScreen} from "expo-router";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Drawer} from "expo-router/drawer";
import {Ionicons} from "@expo/vector-icons";
import DrawerMenu from "../core/DrawerMenu";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {



  // TODO: TO REMOVE DRAWER MENU UNCOMMENT BELOW LINE AND COMMENT GESTURE RETURN BLOCK
  // return <Stack onLayout={onLayoutRootView()}/>;

  return (
    <GestureHandlerRootView style={{flex: 1}}>
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
            drawerLabel: 'OpenDrawer',
            title: 'OpenDrawer'
          }}
        />*/}
      </Drawer>
    </GestureHandlerRootView>
  );
}

export default RootLayout;