import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './index.css';
import App from './App';
import AppRead from './AppRead';
import AppWrite from './AppWrite';
import NotFound from './NotFound';
import * as serviceWorker from './serviceWorker';

const Root = () => {
	return (
		<Router>
                    <div> 
                        <Switch>
                            <Route exact path='/' component={App} /> )} />
							<Route exact path='/Read' component={AppRead} /> )} />
							<Route exact path='/Write' component={AppWrite} /> )} />
                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                </Router>
		)
}

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
