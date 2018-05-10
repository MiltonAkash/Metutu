import React, {Component} from 'react';
import {Widget,addResponseMessage,addUserMessage} from 'react-chat-widget'
import firebase from '../firebase';
class ChatWidget extends Component {
    constructor(){
        super();
        this.state={

        };
        firebase.auth().onAuthStateChanged(user=>{
            this.setState({user});
            firebase.database().ref('users/'+user.uid+'/tutor').once('value',snapshot=>{
                let data = snapshot.val();
                console.log(snapshot.val());
                for(let message in data){
                    console.log(data[message]);
                    addUserMessage(data[message].text);
                }
            })
        })

    }
    componentDidMount() {
        addResponseMessage("Welcome to this awesome chat!");
    }

    handleNewUserMessage = (newMessage) => {
        console.log(`New message incomig! ${newMessage}`);
        let pushref = firebase.database().ref('users/'+this.state.user.uid+'/tutor').push();
        pushref.set({
            text:newMessage,
            time:new Date().getTime(),
            tutor:false
        });
        addResponseMessage("Welcome to this awesome chat!");
        // Now send the message throught the backend API
    }
    render() {
        return (
                <Widget
                    profileAvatar={'https://lh6.googleusercontent.com/-khwM1WEhtbs/AAAAAAAAAAI/AAAAAAAAHgE/FrmLJY2np7U/photo.jpg'}
                    handleNewUserMessage={this.handleNewUserMessage}
                    subtitle={'nice guy'}
                    title={this.props.to}
                />

        );
    }
}


export default ChatWidget;
