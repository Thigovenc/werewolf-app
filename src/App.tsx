import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routes from "./routes/Routes";
import { AuthProvider } from "./context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
