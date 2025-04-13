import React, { useState, useContext } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/Types";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const mutation = useMutation({
    mutationFn: () => loginUser({ username, password }),
    onSuccess: (data) => login(data.token),
    onError: () => alert("Erro ao fazer login"),
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome do usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <Button
        title="Entrar"
        onPress={() => mutation.mutate()}
        disabled={mutation.isPending}
      />

      <Button
        title="Criar conta"
        onPress={() => navigation.navigate("Register")}
      />

      {mutation.isPending && <Text>Carregando...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, gap: 10, flex: 1, justifyContent: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10 },
});

export default Login;
