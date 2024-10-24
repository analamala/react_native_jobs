import {useAuth} from "./AuthContext";
import RootLayout from "./RootLayout";
import Login from "./Login";

const AuthGuard = () => {
  const {authState, onLogout} = useAuth();
  return (
    authState?.authenticated ? <RootLayout/> : <Login/>
  )
}

export default AuthGuard;