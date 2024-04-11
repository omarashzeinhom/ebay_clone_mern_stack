require("dotenv").config({ path: "../config.env" });
const Realm = require("realm");
const { google } = require("googleapis");

// Configure and instantiate Google OAuth2.0 client
 const BASE_URL = "https://ebay-clone-mern-stack.vercel.app/"

export const oauthConfig = {
    client_id: process.env.GOOGLE_API_CLIENTID,
    project_id: process.env.GOOGLE_API_PROJECTID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_secret: process.env.GOOGLE_API_CLIENSECRET,
    redirect_uris: [`${BASE_URL}/auth/google/callback`],
    JWTsecret: "secret",
    scopes: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "openid",
      // any other scopes you might require. View all here - https://developers.google.com/identity/protocols/oauth2/scopes
    ],
  };
const OAuth2 = google.auth.OAuth2;
  export const oauth2Client = new OAuth2(
    oauthConfig.client_id,
    oauthConfig.client_secret,
    oauthConfig.redirect_uris[0]
  );
  
  // Instantiate Realm app
  export const realmApp = new Realm.App({
    id: REALM_APP_ID,
  });
  