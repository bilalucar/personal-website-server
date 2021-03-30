import * as admin from 'firebase-admin';

export namespace FirebaseAdmin {
  export const firebaseAdmin: admin.app.App = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://blog-269208.firebaseio.com',
  });
}
