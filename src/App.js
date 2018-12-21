import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./header/Header";
import Main from "./main/Main";
import Movie from "./movie/Movie";
import NotFound from "./not-found/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Main} />
          <Route path="/movie/:movieId" component={Movie} />
          <Route component={NotFound} /> {/* no path = match all other routes */}
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;