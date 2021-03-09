import { FunctionalComponent, h } from "preact";
import { Route, Router } from "preact-router";
import { Provider } from "@urql/preact";

import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import Home from "../routes/home";
import NotFoundPage from "../routes/notfound";
import gqlClient from "../graphql";
import theme from "../theme";

const App: FunctionalComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider value={gqlClient}>
        <CssBaseline />
        <Container component="main">
          <Router>
            <Route path="/" component={Home} />
            <NotFoundPage default />
          </Router>
        </Container>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
