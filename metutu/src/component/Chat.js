import React, {Component} from 'react';
import firebase from '../firebase';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Avatar, Button, Input, MessageList} from 'react-chat-elements';
import * as conifg from "../config";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {

            messages: {},
            typing: ''
        }
        let himid = props.match.params.uid;
        this.himid = himid;
        let uid = props.user.uid;
        this.channelId = uid > himid ? uid + himid : himid + uid;
        console.log(this.channelId)


        this.send = () => {
            firebase.database().ref(`chats/${this.channelId}`).push({
                text: this.state.typing,
                timestamp: new Date().getTime(),
                by: this.props.user.uid,
            });
            this.setState({typing:''});
        }

    }

    componentDidMount() {
        firebase.database().ref(`chats/${this.channelId}/`).on('value', snapshot => {
            console.log(snapshot.val())
            snapshot.val() && this.setState({messages: snapshot.val()});
        });

        axios.get(conifg.api + 'chatter?uid=' + this.himid)
            .then(x => this.setState({chatter: x.data}));
    }


    render() {
        return (
            <div className='col full'>
                <div className={'chat-header row y-center space-between'}>
                    <div className={'row y-center'}>
                        <img className={'8m-8m'} src={this.state.chatter && this.state.chatter.photoURL}/>
                        <h1 className={'8m-8m'}>{this.state.chatter && this.state.chatter.displayName}</h1>
                    </div>
                    <Link className='8p-8p' to={'/'}>
                        <i className={'fas fa-times fa-2x'}></i>
                    </Link>
                </div>
                <MessageList
                    className='message-list flex-1'
                    lockable={true}
                    toBottomHeight={'100%'}
                    dataSource={Object.keys(this.state.messages).map(x => ({
                        position: this.state.messages[x].by == this.props.user.uid ? 'right' : 'left',
                        type: 'text',//x.text,
                        text: this.state.messages[x].text,
                        date: new Date(this.state.messages[x].timestamp)
                    }))}
                />
                <div className={'chat-input row y-center'}>
                    <input  value={this.state.typing} placeholder={'type here...'} onChange={e => {
                        this.setState({typing: e.target.value})
                    }}/>
                    <div onClick={this.send} className={'8p-8p'}>
                        <i className={'fas fa-paper-plane fa-2x'}/>
                    </div>
                </div>

            </div>
        );
    }
}


export default Chat;
