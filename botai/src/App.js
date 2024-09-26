import React from "react";
import { ThemeProvider } from "@emotion/react";
import { Theme } from "./Theme";
import { DarkmodeProvider, useDarkmode } from "./context/Darkmode";
// import Navigation from "./pages/Navigation";
import ResponsiveDrawer from "./pages/Navigation"; // Make sure this import is correct
import { BrowserRouter } from "react-router-dom";

function ThemedApp() {
  const { darkMode } = useDarkmode();

  return (
    <ThemeProvider theme={Theme(darkMode)}>
     <BrowserRouter>
          <ResponsiveDrawer />
        </BrowserRouter>
    </ThemeProvider>
  );
}

function App() {
  return (
    <DarkmodeProvider>
      <ThemedApp />
    </DarkmodeProvider>
  );
}

export default App;
