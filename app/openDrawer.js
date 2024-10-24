import {DrawerActions} from '@react-navigation/native';
import {Button, Text, View} from "react-native";
import {useNavigation} from "expo-router";

const OpenDrawer = () => {
  const navigation = useNavigation();

  const onToggle = () => {
    navigation.dispatch(DrawerActions.openDrawer)
  }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Open Drawer" onPress={onToggle}/>
    </View>
  )
}

export default OpenDrawer;