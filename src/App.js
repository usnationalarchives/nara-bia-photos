import React, { Fragment, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import * as theme from "./config/theme";
import Header from "./components/chrome/Header";
import Footer from "./components/chrome/Footer";
import PageLoader from "./components/shared/PageLoader";

// Lazy load (via code splitting) the top level page components
const Home = lazy(() => import("./components/pages/Home/Home"));
const About = lazy(() => import("./components/pages/About/About"));
const Search = lazy(() => import("./components/pages/Search/Search"));
const Prototype = lazy(() => import("./components/pages/Prototype/Prototype"));

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Fragment>
          <Header />

          <Suspense fallback={<PageLoader />}>
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/search" component={Search} />
              <Route path="/prototype" component={Prototype} />
              <Route path="/" component={Home} />
            </Switch>
          </Suspense>

          <Footer />
        </Fragment>
      </Router>
    </ThemeProvider>
  );
};

export default App;
