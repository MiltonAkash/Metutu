import React, {Component} from 'react';
import firebase from "../firebase";

class Signup extends Component {
    constructor(props) {
        super(props);

        const login = (provider)=>{
            firebase.auth().signInWithPopup(provider).then(result => {
                console.log(result);
                if(result.user){
                    if(result.additionalUserInfo.isNewUser) {
                        window.navigator.geolocation.getCurrentPosition((position) => {
                            console.log(position);
                            firebase.database().ref(`users/${result.user.uid}/location`).set({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            });
                            this.props.history.push('/add-skill');
                        });
                    }
                    else{

                    }
                }
            });
        };



        this.gLogin = () => {
            let provider = new firebase.auth.GoogleAuthProvider();
            login(provider);
        };

        this.fbLogin = () => {
            let provider = new firebase.auth.FacebookAuthProvider();
            login(provider);
        }
    }

    render() {
        return (
            <div className='col centerify full'>
                <div onClick={this.gLogin} className={'login google'}>
                    <span>
                    <i className='fab fa-google'></i>
                    </span>
                    <span>Sign in with Google</span>
                </div>
                <div onClick={this.fbLogin} className={'login fb'}>
                    <span>
                    <i className='fab fa-facebook-f'></i>
                    </span>
                    <span>Sign In with Facebook</span>
                </div>
            </div>
        );
    }
}


export default Signup;
