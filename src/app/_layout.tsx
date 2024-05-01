import "../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";

const client = new QueryClient();

export default function Layout() {
  return(
    <QueryClientProvider client={client}>
      <Slot/>
    </QueryClientProvider>
  );
}
