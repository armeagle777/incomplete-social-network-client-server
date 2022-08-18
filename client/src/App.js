import './App.css';
import {Component} from "react";
import Header from "./components/header/Header";
import Profile from "./components/profile/Profile";
import Dialogs from "./components/dialogs/Dialogs";
import {HashRouter, Route} from "react-router-dom";
import Home from "./components/home/Home";
import News from "./components/news/News";
import Music from "./components/music/Music";
import Settings from "./components/settings/Settings";

class App extends Component {
    render() {
        return (
            <HashRouter>
                <div className="app-wrapper">
                    <Header />
                    <div className="appContainer">
                        <div className="app-wrapper-content">
                            <Route exact path = '/home' render = { ()=> <Home /> } />
                            <Route exact path='/dialogs' render={() => <Dialogs dialogs={this.props.state.dialogs}
                                                                                dispatch={this.props.dispatch}/>}/>
                            <Route path='/profile' render={() => <Profile allPosts={this.props.state.profile}
                                                                          dispatch={this.props.dispatch}/>}/>
                            <Route path='/news' render={ () =>  <News />  } />
                            <Route path='/music' render = { () => <Music /> } />
                            <Route path= '/settings' render={ () => <Settings /> } />
                        </div>
                    </div>
                </div>
            </HashRouter>
        );
    }

}

export default App;

