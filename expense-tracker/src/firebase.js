import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCwhhBOmgDeDl1nMJwySTO_KAm81BgwhOM",
  authDomain: "exspend-557ac.firebaseapp.com",
  projectId:  "exspend-557ac",
  storageBucket: "exspend-557ac.appspot.com",
  messagingSenderId: "882747166987",
  appId: "1:882747166987:web:31dcf46566cf9ba4e7920e"
}
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth()
export default app
