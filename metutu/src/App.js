import React, {Component} from 'react';
import firebase from './firebase';
import './res/style.css'
import './res/tesla-min.css'
import {BrowserRouter, Route} from 'react-router-dom';
import AddSkills from "./component/AddSkills";
import Profile from "./component/Profile";
import Signup from "./component/Signup";
import Home from "./component/Home";
import Chat from "./component/Chat";
import 'react-chat-elements/dist/main.css';
import Search from "./component/Search";
import Loader from "./component/Loader";


class App extends Component {
    constructor() {
        super();
        this.state = {

            user: null//localStorage.user && JSON.parse(localStorage.user) || null
        };
        firebase.auth().onAuthStateChanged(user => {
            // localStorage.user = JSON.stringify(user);
            if (user) {
                this.setState({user, authstate: 1})
                console.log(user);

            }
            else this.setState({authstate: 1, user: null}, () => {

            });
        });


    }

    render() {
        return (
            <div>
                {/*{(!this.state.authstate) && <Loader/>}*/}
                <BrowserRouter>
                    <div>
                        <Route exact path={'/'} render={props => {
                            if (this.state.authstate && this.state.user) {
                                return <Home user={this.state.user} {...props}/>
                            }
                            else if(this.state.authstate) {
                                return <Signup {...props}/>
                            }
                            else{
                                return <div className={'full'}><Loader/></div>;
                            }
                        }}/>

                        {this.state.user &&
                        <div>
                            {/*<Route exact path={'/signup'} component={Signup}/>*/}

                            <Route exact path={'/add-skill'}
                                   render={props => <AddSkills user={this.state.user} {...props}/>}/>
                            <Route exact path={'/profile'}
                                   render={props => <Profile user={this.state.user} {...props}/>}/>
                            <Route exact path={'/search'}
                                   render={props => <Search user={this.state.user} {...props}/>}/>
                            {/*<Route exact path={'/map'} render= {props => <Gmap user={this.state.user} {...props}/>}/>*/}
                            <Route exact path={'/chat/:uid'} render={props => <div>
                                <Chat {...props} user={this.state.user}/>
                            </div>}/>


                        </div>
                        }
                        {/*{(this.state.authstate && !this.state.user) && <Signup/>}*/}
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
