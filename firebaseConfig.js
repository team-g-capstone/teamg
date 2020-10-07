import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAjZJtekQpDpB6_i0ZZRdPxPMckkfLrReA',
  authDomain: 'teamg-83785.firebaseapp.com',
  databaseURL: 'https://teamg-83785.firebaseio.com',
  projectId: 'teamg-83785',
  storageBucket: 'teamg-83785.appspot.com',
  messagingSenderId: '726216484923',
  appId: '1:726216484923:web:c34518350acefe833a141e',
  measurementId: 'G-F1EY4WJE9P',
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
export const users = db.collection('users');
export { firebase };
