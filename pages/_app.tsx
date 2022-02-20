import "../styles/globals.css";
import type { AppProps } from "next/app";
import createCache from "@emotion/cache";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import theme from "../theme";
import { Container, CssBaseline } from "@mui/material";
import Header from "../components/header";

const clientSideEmotionCache = createCache({ key: "css" });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Container>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
