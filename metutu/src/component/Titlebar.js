import React, {Component} from 'react';
import {Link, Route} from "react-router-dom";
import firebase from "../firebase";
const signout = () => {
    firebase.auth().signOut().then(() => {
        console.log("signed out");
        // props.signout();
    });
};
const Titlebar = ()=>
            <div className='titlebar fluid row space-around y-center'>
                <Link className='flex-1 8m-8m 8p-8p row y-center' to={'/'}>
                    <Route path={'/:x'} render={()=><i className={'fas fa-arrow-left fa-2x'}></i>}/>
                    <h1>Metutu</h1>
                </Link>
                <div className={'row space-between'}>
                    <Link className='8p-8p' to={'/profile'}>
                        <i className='fas fa-user fa-2x'></i>
                    </Link>
                    <Link className='8p-8p' to={'/search'}>
                        <i className='fas fa-search fa-2x'></i>

                    </Link>
                    <div onClick={signout} className='8p-8p'>
                        <i className='fas fa-sign-out-alt fa-2x'></i>

                    </div>
                </div>
            </div>


export default Titlebar;
