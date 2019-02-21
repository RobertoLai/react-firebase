import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const devConfig = {
  apiKey: process.env.REACT_APP_API_KEY_DEV,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN_DEV,
  databaseURL: process.env.REACT_APP_DATABASE_URL_DEV,
  projectId: process.env.REACT_APP_PROJECT_ID_DEV,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET_DEV,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_DEV,
  emailRedirect: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT
};
const prodConfig = {
  apiKey: process.env.REACT_APP_API_KEY_PROD,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN_PROD,
  databaseURL: process.env.REACT_APP_DATABASE_URL_PROD,
  projectId: process.env.REACT_APP_PROJECT_ID_PROD,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET_PROD,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_PROD,
  emailRedirect: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.db = app.database();
    this.auth = app.auth();
    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => this.auth.signOut();
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
  // User API
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref("users");

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: config.emailRedirect
    });

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = [];
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });
}

export default Firebase;
