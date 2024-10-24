import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import {useRouter} from "expo-router";
import {Image, Text, View} from "react-native";
import {images} from "../constants";
import {useAuth} from "./AuthContext";

const DrawerMenu = (props) => {
  const {authState, onLogout} = useAuth();
  const router = useRouter();

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}>
        <View>
          <Image
            source={images.profile}
            style={{width: 50, height: 50, alignSelf: 'center'}}
          />
          <Text
            style={{
              alignSelf: 'center',
              fontWeight: 200,
              fontSize: 18,
              paddingTop: 10,
              color: '#5363df'
            }}
          >
            Ajay
          </Text>
        </View>

        <View style={{paddingTop: 10}}>
          {/* NOTE: comment the below line if you want to hide the menu that
        expo drawer automatically builds based on the expo router content and
         what is defined in the '_layout.js' file*/}
          <DrawerItemList {...props} />
          <DrawerItem style={{alignItems: 'flex-start'}}
                      label={'Inventory'} onPress={() => router.push('/')}/>
        </View>

      </DrawerContentScrollView>

      <View
        style={{
          borderTopColor: '#dde3fe',
          borderTopWidth: 1,
          padding: 20,
          paddingBottom: 20
        }}
      >
        <Text onPress={onLogout}>Logout</Text>
      </View>
    </View>
  )
}

export default DrawerMenu;