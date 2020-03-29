import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
import { PostModel, ResponsePostModel } from './model/post-model';
import { UserInfoModel } from './model/user-model';

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

const postsCollection = 'posts';

const usersCollection = 'users';

//get all users
app.get('/posts', async (req, res) => {
    try {
        // get all users
        const userQuerySnapshot = await db.collection(usersCollection).get();

        const users: UserInfoModel[] = [];

        await userQuerySnapshot.forEach((doc: any) => users.push(doc.data()));

        // get all posts
        const postQuerySnapshot = await db.collection(postsCollection).get();

        const posts: ResponsePostModel[] = [];

        const getAuthorInfo = (authorId: string) => {
            const {
                id,
                roles,
                ...args
            } = users.find(user => user.id === authorId)!;

            return {...args };
        };

        await postQuerySnapshot.forEach((doc: any) => {
            const post: PostModel = doc.data();

            if (post.state !== 'PUBLISHED') {
                return;
            }

            posts.push({
                ...post,
                authorInfo: getAuthorInfo(post.authorId)
            })
        });

        res.set('Access-Control-Allow-Origin', '*').status(200).json(posts);
    } catch (error) {
        res.status(500).send(error);
    }
});
