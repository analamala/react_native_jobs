import "react-native-gesture-handler"
import {AuthProvider} from "./context/AuthContext";
import RootLayout from "./rootLayout";

const Layout = () => {
  return (
    // <AuthProvider>
      <RootLayout></RootLayout>
    // </AuthProvider>
  );
}

export default Layout;