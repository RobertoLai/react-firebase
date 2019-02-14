# Skeleton for React Firebase apps
Not finalized yet, but the main features, sign in, sign up, reset etc. are ready

### Installation
1. create a firebase account and your web app setting for this app
2. in the main directory create a .env.production.local file with this
   environment variables:

   ```REACT_APP_API_KEY_PROD=<--your firebase app values-->
   REACT_APP_AUTH_DOMAIN_PROD=<--your firebase app values-->
   REACT_APP_DATABASE_URL_PROD=<--your firebase app values-->
   REACT_APP_PROJECT_ID_PROD=<--your firebase app values-->
   REACT_APP_STORAGE_BUCKET_PROD=<--your firebase app values-->
   REACT_APP_MESSAGING_SENDER_ID_PROD=<--your firebase app values-->```

3. in the main directory create a .env.development.local file with this
   environment variables:

   ```REACT_APP_API_KEY_DEV=<--your firebase app values-->
   REACT_APP_AUTH_DOMAIN_DEV=<--your firebase app values-->
   REACT_APP_DATABASE_URL_DEV=<--your firebase app values-->
   REACT_APP_PROJECT_ID_DEV=<--your firebase app values-->
   REACT_APP_STORAGE_BUCKET_DEV=<--your firebase app values-->
   REACT_APP_MESSAGING_SENDER_ID_DEV=<--your firebase app values-->```

4. in the main directory: `npm install`
5. in the main directory: `npm start`
