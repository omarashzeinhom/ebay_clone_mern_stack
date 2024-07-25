
import FacebookLogin from 'react-facebook-login';


export default function FaceBookSSO() {

    const responseFacebook = (response: any) => {
        console.log("FB Response--->>>",response);
    }

    const APP_ID = `${process.env.REACT_APP_FACEBOOK_APP_ID}`;

    return (
        <FacebookLogin
            appId={APP_ID}
            autoLoad={true}
            fields="name,email,picture"
            cssClass="app__signin-Btn"
            //onClick={componentClicked}
            callback={responseFacebook}
            icon="fa-facebook"
        />

    )
}