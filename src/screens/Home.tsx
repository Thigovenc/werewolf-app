import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { logout } = useContext(AuthContext);

  return (
    <View style={{ padding: 20 }}>
      <Text>Bem-vindo à Home!</Text>
      <Button title="Sair" onPress={logout} />
    </View>
  );
};

export default Home;
