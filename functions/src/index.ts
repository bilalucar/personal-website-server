import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";

const certificate = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(certificate),
    databaseURL: "https://blog-269208.firebaseio.com"
});

const app = express();
const main = express();

main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

const db = admin.firestore();

export const blog = functions.https.onRequest(main);

const postCollection = 'posts';

//get all users
app.get('/posts', async (req, res) => {
    try {
        const postQuerySnapshot = await db.collection(postCollection).get();
        const posts: any[] = [];
        postQuerySnapshot.forEach(
            (doc)=>{
                posts.push({
                    id: doc.id,
                    ...doc.data()
                });
            }
        );
        res.set('Access-Control-Allow-Origin', '*')
            .status(200).json(posts);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/posts', async (req, res) => {
    try {
        const post: PostModel = {
            title: req.body.title,
            timestamp: req.body.timestamp,
            content: req.body.content,
            author: req.body.author,
            imageUrl: req.body.imageUrl,
            url: req.body.url,
            summary: req.body.summary
        };

        await db.collection(postCollection).add(post).then(() => res.status(201).send(`Created a new post`));

    } catch (error) {
        res.status(400).send(`Error: ${error}`);
    }
});
