import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import States from '../Pages/States';
import USA from '../Pages/USA';

const Navigation = () => {
    return ( 
        <Router>
          <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">USA</Link>
                    </li>
                    <li>
                        <Link to="/states">State Trends</Link>
                    </li>
                </ul>
            </nav>
          </header>

            <Switch>
                <Route exact path="/">
                    <USA />
                </Route>
                <Route path="/states">
                    <States />
                </Route>
            </Switch>

        </Router>
      
     );
}
 
export default Navigation;