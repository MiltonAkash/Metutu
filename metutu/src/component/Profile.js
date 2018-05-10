import React, {Component} from 'react';
import {Link} from "react-router-dom";
import firebase from '../firebase';
import Titlebar from "./Titlebar";
// import FontAwesome from '@fortawesome/react-fontawesome'
class Profile extends Component {
    constructor() {
        super();
        this.state = {
            skillset:[],
            location:{}
        };
        firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.setState({user});
                    console.log(user);
                }
                else{
                    alert("No user");
                }
            }
        )
    }

    componentDidMount() {
        firebase.database().ref('/users/'+this.props.user.uid).on('value',snapshot=>{
            let user = snapshot.val();
            this.setState({location:user.location,skillset:user.skillset})
        })
    }

    render() {
        return (
            <div>
                <Titlebar/>
                {/*<div className='titlebar row space-around'>*/}
                    {/*<h1 className='flex-1 8m-8m'>Metutu</h1>*/}
                    {/*<div className={'row space-between'}>*/}
                        {/*<Link className='8p-8p' to={'/'}>*/}
                            {/*<i className='fas fa-plus fa-2x'></i>*/}
                        {/*</Link>*/}
                        {/*<Link className='8p-8p' to={'/'}>*/}
                            {/*<i className='fas fa-search fa-2x'></i>*/}

                        {/*</Link>*/}
                    {/*</div>*/}
                {/*</div>*/}
                <div>
                    {this.state.user &&

                    <div className={'col centerify 8p-16p'}>
                        <img className='proimage' src={this.state.user.photoURL}/>
                        <h1>{this.state.user.displayName}</h1>
                        <h3 className='Grey'>{this.state.user.email}</h3>
                        <div className={'text-center'}>{this.state.skillset.map(sk => <div className="profile-skill text-center">{sk}</div>)}</div>
                        <Link to={'add-skill'} className={'bg-theme White 24p-16p'}>
                            <i className={'fas fa-edit'}></i> Edit Skills
                        </Link>
                        <p>{this.state.location.latitude},{this.state.location.longitude}</p>
                    </div>}
                    {/*<img src={}*/}
                </div>
            </div>
    );
    }
    }


    export default Profile;
