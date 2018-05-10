import React, {Component} from 'react';
import config from '../config'
import axios from 'axios'
import {ChatList} from "react-chat-elements";
import Gmap from "./Gmap";
import Titlebar from "./Titlebar";
import Loader from "./Loader";
class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            mapview:false,
            chatList:[],
            uid:props.user.uid,
            searching:false
        };

        this.search = ()=>{
            this.setState({searching:true});
            let {uid,radius,skill} = this.state;
            axios.get(config.api+'tutors',{
                params:{
                    uid,radius,skill
                }
            }).then(x => {
                console.log(x.data);
                this.setState({chatList:x.data,searching:false});
            });
        }

    }
    render() {

        return (
            <div>
                <Titlebar/>
                <div className={'finder'}>
                    <input type='text' placeholder={'Skill'} onChange={(e)=>{this.setState({skill:e.target.value})}} list='skill'/>
                    <datalist id='skill'>
                        {config.skills.map(x=><option>{x}</option>)}
                    </datalist>

                    <input type='number' placeholder={'Radius in Km'} onChange={(e)=>{this.setState({radius:e.target.value})}}/>
                    <div onClick={this.search}><i className={'fas fa-search'} /></div>
                </div>
                {this.state.searching && <Loader/>}
                {this.state.chatList.length!=0 && <div>
                <div className={'text-center 16p-8p mvbtn'} onClick={()=>{this.setState({mapview:!this.state.mapview})}}>View on {this.state.mapview?'List':
                    'Map'}</div>
                    {!this.state.mapview && <ChatList
                    onClick={(x) => {
                        this.props.history.push('/chat/' + x.uid);
                        console.log("cliclked", x);

                    }}
                    className='chat-list'
                    dataSource={this.state.chatList.map(x => ({
                        avatar: x.photoURL,
                        alt: 'Photo',
                        title: x.displayName,
                        subtitle: x.skillset.join(','),
                        date: new Date(),
                        unread: 0,
                        uid: x.uid
                    }))}
                />}
                {this.state.mapview && <Gmap tutors={this.state.chatList}/>}
                </div>}

            </div>
        );
    }
}

Search.propTypes = {};
Search.defaultProps = {};

export default Search;
