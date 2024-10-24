import {
  ActivityIndicator,
  Button,
  Image,
  Pressable,
  SafeAreaView, ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {Stack} from "expo-router";
import {useState} from "react";
import {useAuth} from "./AuthContext";
import {COLORS, SIZES} from "../constants";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {onLogin, onRegister} = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setIsLoading(true);
    const result = await onLogin!(email, password);
    setIsLoading(false);
    if (result && result.error) {
      alert(result.msg);
    }
  }

  // We automatically call the login after a successful registration
  const register = async () => {
    setIsLoading(true);
    const result = await onRegister!(email, password);
    setIsLoading(false);
    if (result && result.error) {
      alert(result.msg);
    } else {
      login();
    }
  }

  const styles = StyleSheet.create({
    button: {
      backgroundColor: COLORS.primary,
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: COLORS.white,
      fontSize: 16,
      textAlign: 'center',
    },
    image: {
      width: '50%',
      height: '50%',
      resizeMode: 'contain'
    },
    form: {
      gap: 10,
      width: '60%',
    },
    input: {
      height: 44,
      borderWidth: 1,
      borderRadius: 4,
      padding: 10,
      backgroundColor: COLORS.white
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    }
  })

  return (
    <View style={styles.container}>

      {/*<Image source={{uri: 'https://galaxies.dev/img/logos/logo--blue.png'}} style={styles.image}/>*/}
      {
        isLoading ? (<ActivityIndicator size="large" color={COLORS.primary}/>) : ""
      }
      <View>
        <Text style={{paddingBottom: 20, fontSize: SIZES.large}}>Alternate Login</Text>
      </View>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Email"
                   onChangeText={(text: string) => setEmail(text)} value={email}/>
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true}
                   onChangeText={(text: string) => setPassword(text)} value={password}/>
        <Pressable onPress={login} style={styles.button}>
          <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>
        <Pressable onPress={register} style={styles.button}>
          <Text style={styles.buttonText}>Create Account</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Login;