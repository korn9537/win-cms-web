"use client";

import theme from "@/configs/theme.config";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import "dayjs/locale/th";
import PanelToastMessage from "./PanelToastMessage";
import AppBackdrop from "./layouts/AppBackdrop";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
});

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </LocalizationProvider>
        <PanelToastMessage />
        <AppBackdrop />
      </ThemeProvider>
    </>
  );
}
