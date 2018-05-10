import * as firebase from 'firebase';
require('firebase/functions')
const config = {
    apiKey: "AIzaSyD2CYHdwEbcQG73bqtDqa3i9MPR_0kDnBc",
    authDomain: "metutu-juspay.firebaseapp.com",
    databaseURL: "https://metutu-juspay.firebaseio.com",
    projectId: "metutu-juspay",
    storageBucket: "metutu-juspay.appspot.com",
    messagingSenderId: "839785194862"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}


export default firebase;

