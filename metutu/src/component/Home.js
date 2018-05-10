import React, {Component} from 'react';
import firebase from '../firebase';
import axios from 'axios'
import {ChatList} from 'react-chat-elements'
import {Link} from "react-router-dom";
import * as config from "../config";
import Titlebar from "./Titlebar";
import Loader from "./Loader";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingChats:true,
            chatList: []
        };

    }

    componentDidMount() {
        axios.get(config.api+'chatlist?uid=' + this.props.user.uid)
            .then(data => {
                this.setState({chatList: data.data,loadingChats:false});
                console.log(data.data);
        });
    }

    render() {
        return (
            <div className={'relative'}>
                <Titlebar/>
                {this.state.loadingChats && <Loader/>}
                {!this.state.loadingChats && !this.state.chatList.length &&
                <div className={'Grey text-center'}>
                    <div className={'text-center'}> You have not made any conversation. Find and make one.</div>
                    <Link to={'/search'}>
                        <div className='search-shortcut bg-theme White'>
                            <i className={'fas fa-search fa-2x'}/>
                        </div>
                    </Link>
                </div>

                }
                <ChatList
                    onClick={(x) => {
                        this.props.history.push('/chat/' + x.uid);
                        console.log("cliclked", x);

                    }}
                    className='chat-list'
                    dataSource={this.state.chatList.map(x => ({
                        avatar: x.photoURL,
                        alt: 'Reactjs',
                        title: x.displayName,
                        subtitle: x.lastMessage,
                        date: new Date(x.lastSeen),
                        unread: 0,
                        uid: x.uid
                    }))}

                />
            </div>
        );
    }
}


export default Home;
