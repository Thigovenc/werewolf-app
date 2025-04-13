import React, { useState, useContext } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/Types";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const mutation = useMutation({
    mutationFn: () =>
      registerUser({ username: username, password: password, email: email }),
    onSuccess: (data) => login(data.token),
    onError: () => alert("Erro ao cadastrar"),
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
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
        title="Cadastrar"
        onPress={() => mutation.mutate()}
        disabled={mutation.isPending}
      />
      <Button
        title="Voltar para Login"
        onPress={() => navigation.navigate("Login")}
      />

      {mutation.isPending && <Text>Carregando...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, gap: 10, flex: 1, justifyContent: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10 },
});

export default Register;
