import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { useUserAuth } from "../../../../context";
import { userAuthService } from "../../../../services";

export default function FaceBookSSO() {
  const { login } = useUserAuth();

  const responseFacebook = async (response: any) => {
    console.log("FB Response--->>>", response);

    if (response.accessToken) {
      try {
        // Assuming you have an endpoint to handle Facebook login on your server
        const { userToken, userData } = await userAuthService.facebookLogin(response.accessToken);

        // Log in the user with the received token and data
        login(userToken, userData);
        console.log("User logged in with Facebook successfully");
      } catch (error) {
        console.error("Facebook login error:", error);
      }
    } else {
      console.error("Facebook login failed:", response);
    }
  };

  const APP_ID = `${process.env.REACT_APP_FACEBOOK_APP_ID}`;

  return (
    <FacebookLogin
      appId={APP_ID}
      autoLoad={true}
      fields="name,email,picture"
      cssClass="app__signin-Btn"
      callback={responseFacebook}
      icon="fa-facebook"
    />
  );
}
