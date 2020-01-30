import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

import AllMemento from './components/AllMemento'
import EditMemento from './components/EditMemento'
import NewMemento from './components/NewMemento'

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <nav className="navbar App-header" role="navigation" aria-label="main navigation">
                        <div className="navbar-brand">
                            <Link to="/" className="navbar-item">Memento</Link>
                        </div>

                        <div className="navbar-end">
                            <Link to="/" className="navbar-item">Your Memento</Link>
                            <Link to="/newmemento" className="navbar-item">
                                New Memento
                            </Link>
                          <a className={"button"} href={`http://test-sheku.com:3000/login/?redirect=${encodeURIComponent(window.location)}`}>Login</a>
                        </div>

                    </nav>
                    <Route exact path="/" component={AllMemento}/>
                    <Route path="/newmemento" component={NewMemento}/>
                    <Route path="/memento/:id" component={EditMemento}/>

                </div>
            </Router>
        )
    }
}

export default App;