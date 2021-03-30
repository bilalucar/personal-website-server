import app from './config/app';
import * as functions from 'firebase-functions';

exports.api = functions.https.onRequest(app);
