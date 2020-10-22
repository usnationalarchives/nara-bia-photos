import React, { Fragment, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import * as theme from '#styles/theme';
import BaseStyles from '#styles/base';
import Header from '#components/chrome/Header/Header';
import Footer from '#components/chrome/Footer/Footer';
import PageLoader from '#components/shared/PageLoader';
import ScrollToTop from '#components/shared/ScrollToTop';

import About from '#components/pages/About/About';
import Search from '#components/pages/Search/Search';
import Record from '#components/pages/Record/Record';
import StateLanding from '#components/pages/Landing/StateLanding';
import TopicLanding from '#components/pages/Landing/TopicLanding';
import TribeLanding from '#components/pages/Landing/TribeLanding';
import StateListing from '#components/pages/Listing/StateListing';
import TopicListing from '#components/pages/Listing/TopicListing';
import TribeListing from '#components/pages/Listing/TribeListing';
import Prototype from '#components/pages/Prototype/Prototype';

// Lazy load the home page to improve time to first paint on the most popular entry point
const Home = lazy(() => import('./components/pages/Home/Home'));

console.log(process.env.PUBLIC_URL);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BaseStyles />
      <div className="skip-links">
        <ul>
          <li>
            <a href="#nav">Skip to navigation</a>
          </li>
          <li>
            <a href="#main">Skip to main content</a>
          </li>
          <li>
            <a href="#footer">Skip to footer</a>
          </li>
        </ul>
      </div>
      <Router basename="/research/native-americans/bia/photos">
        <ScrollToTop />
        <Fragment>
          <Header />

          <div role="main" id="main" aria-live="polite" aria-atomic="true">
            <Suspense fallback={<PageLoader />}>
              <Switch>
                <Route path="/about" component={About} />
                <Route path="/search" component={Search} />
                <Route path="/prototype" component={Prototype} />
                <Route path="/states" exact component={StateLanding} />
                <Route path="/topics" exact component={TopicLanding} />
                <Route path="/tribal-nations" exact component={TribeLanding} />
                <Route path="/states/:slug" exact component={StateListing} />
                <Route path="/topics/:slug" exact component={TopicListing} />
                <Route path="/tribal-nations/:slug" exact component={TribeListing} />
                <Route path="/:slug" component={Record} />
                <Route path="/" component={Home} />
              </Switch>
            </Suspense>
          </div>

          <Footer />
        </Fragment>
      </Router>
    </ThemeProvider>
  );
};

export default App;
