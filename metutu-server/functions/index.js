const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
const gps = require('gps-distance');
var serviceAccount = require("./serviceAccountKey.json");
const cors = require('cors');
let testuid = 'S9cIFvYv1ifgbmEJlI8wTi8Z7Cz2';
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://metutu-juspay.firebaseio.com"
});


app.use(cors({origin: true}));
app.get('/chatlist', (req, res) => {
    let {uid} = req.query;

    admin.database().ref('/chats').once('value', (snapshot) => {
        let chats = snapshot.val();
        console.log(chats);
        if(chats == null) {res.status(200).json([]); return 0;};
        let users = Object.keys(snapshot.val()).filter(x => x.includes(uid)).map(x => x.replace(uid, ''));
        console.log(users);

        if(!users.length) {res.status(200).json([]); return 0;}
        let userPromises = users.map(x => admin.auth().getUser(x));

        Promise.all(userPromises).then(value => {
            // console.log(value);
            let cleanedValue = value.map(x => {
                let channelId = x.uid>uid?x.uid+uid:uid+x.uid;
                let lastChatId = Object.keys(chats[channelId]).pop();
                return {
                    uid: x.uid,
                    displayName: x.displayName,
                    photoURL: x.photoURL,
                    lastMessage: chats[channelId][lastChatId].text,
                    lastSeen:chats[channelId][lastChatId].timestamp
                };
            });

            res.status(200).json(cleanedValue);
        });
    });
});

const dist = (student,tutor) =>{
    console.log(student,tutor);
    x= gps(student.latitude,student.longitude,tutor.latitude,tutor.longitude);
    console.log(x);
    return x;

};

app.get('/tutors', (req, res) => {
    let {lat,lng, skill, radius,uid} = req.query;
    console.log(lat,lng,skill,radius);
    let location = {latitude:lat,longitude:lng};
    admin.database().ref('/users').once('value', snapshot => {
        let users = snapshot.val();
        location = users[uid].location;
        console.log(location);
        console.log(users);
        let filteredUsers = Object.keys(users).filter(x => users[x].skillset.includes(skill.toLowerCase()) && (users[x].dist = dist(users[x].location, location, radius))< radius);
        console.log("fitllere",filteredUsers);
        if(!filteredUsers.length) {res.json([]);return 0;}
        let userDetails =filteredUsers.map(x => admin.auth().getUser(x));
        Promise.all(userDetails).then(usersArray => {
            // console.log(value);
            let cleanedValue = usersArray.map(x => ({
                uid: x.uid,
                displayName: x.displayName,
                photoURL: x.photoURL,
                skillset:users[x.uid].skillset,
                distance:users[x.uid].dist,
                location:users[x.uid].location
            }));
            res.send(JSON.stringify(cleanedValue));
        }).catch(err => res.json([]));

    })
});

exports.sendHi = functions.auth.user().onCreate((user)=>{
    let miltonid = 'C0LDkhLS1wTyTw4Ks0zUlDQhK3j2';
    let channelId = miltonid>user.uid?miltonid+user.uid:user.uid+miltonid;
    return admin.database().ref(`/chats/${channelId}`).push({
        text:"Welcome to Metutu. Connect with tutors nearby using it. You can edit your skillset"
        +" anytime. You can also install this on your Android or Ios mobile devices by Options>Add to Home screen . Thi" +
        "will be saved as an PWA(Progressive Web Application). This chat works. Try it",
        timestamp:new Date().getTime(),
        by:miltonid
    });
});




app.get('/chatter',(req,res)=>{
    let {uid} = req.query;
    admin.auth().getUser(uid).then(x=>{
        let cleanedValue ={
            uid:x.uid,
            displayName:x.displayName,
            photoURL:x.photoURL,
        };
        res.json(cleanedValue);
    });
});


app.use((req,res)=>{
    res.send("WRONG ROUTE");
})
exports.api = functions.https.onRequest(app);




