const functions = require('firebase-functions');
const express = require('express');
var admin = require("firebase-admin");

var router = express.Router();
const app = express();

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});
const db = admin.firestore();

app.post('/createUser', (request, response) => {

  const data = {
    id: request.body.id,
    name: request.body.name,
    phone:request.body.phone,
    password:request.body.password,
    age: request.body.age
  }

  db.collection('Users').doc(data.id).set(data);
  response.send(data);

});

app.get('/getUser', (request, response) => {
  const data = {};
  db.collection('Users').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      data[doc.id] = doc.data();

    });
    response.send(data);
  })
});

exports.app = functions.https.onRequest(app);