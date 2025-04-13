import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import { ActivityIndicator, View } from "react-native";

const Stack = createNativeStackNavigator();

const Routes = () => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Routes;
