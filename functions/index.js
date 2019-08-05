const functions = require("firebase-functions");
const admin = require("firebase-admin");

const LINKS_PER_PAGE = 5;

// admin.initializeApp(functions.config().firebase);
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://vue-hq-12eb5.firebaseio.com"
});

const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// https://firebase.google.com/docs/functions/linksPagination?offset=20
exports.linksPagination = functions.https.onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  const linksRef = db.collection("links");
  const offset = Number(request.query.offset);
  const docsSnapshot = await linksRef
    .orderBy("created", "desc")
    .limit(LINKS_PER_PAGE)
    .offset(offset)
    .get();

  if (docsSnapshot.empty) {
    // console.log("No matching documents.");
    response.json({ links: [] });
    return;
  }
  const links = docsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // return a new object with the added id
  response.json({ links });
});
