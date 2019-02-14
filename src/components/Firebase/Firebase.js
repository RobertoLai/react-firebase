import app from 'firebase/app';
import 'firebase/auth';


const devConfig = {
	apiKey: process.env.REACT_APP_API_KEY_DEV,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN_DEV,
	databaseURL: process.env.REACT_APP_DATABASE_URL_DEV,
	projectId: process.env.REACT_APP_PROJECT_ID_DEV,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET_DEV,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_DEV
};
const prodConfig = {
	apiKey: process.env.REACT_APP_API_KEY_PROP,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN_PROP,
	databaseURL: process.env.REACT_APP_DATABASE_URL_PROP,
	projectId: process.env.REACT_APP_PROJECT_ID_PROP,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET_PROP,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_PROP
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

class Firebase {
	constructor() {
		app.initializeApp(config);

		this.auth = app.auth();
	}

	doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);
	doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
	doSignOut = () => this.auth.signOut();
	doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);
	doPasswordUpdate = (password) => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
