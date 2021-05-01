import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Create from "./pages/Create";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Layout from "./components/Layout";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Libre Franklin",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    button: {
      textTransform: "none",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact component={Notes} />
            <Route path="/create" component={Create} />
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
