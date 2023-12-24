import React, { createContext, useEffect, useState } from 'react';
import "./CloudinaryUploadWidget.scss";
import { User } from '../../../../models/user';
import { useAuth } from '../../../../context/AuthContext';

interface CloudinaryScriptContextProps {
  loaded: boolean;
}

const CloudinaryScriptContext = createContext<CloudinaryScriptContextProps>({
  loaded: false,
});

interface CloudinaryUploadWidgetProps {
  uwConfig: {};
  setPublicId: React.Dispatch<React.SetStateAction<string>>;
  onSuccess: (result: any) => void; // Callback for successful upload
}

function CloudinaryUploadWidget({
  uwConfig,
  setPublicId,
  onSuccess,
}: CloudinaryUploadWidgetProps) {
  const {user,/* business */} = useAuth();
  const [loaded, setLoaded] = useState(false);
  const [avatarLink , setAvatarLink]= useState("");
  const [updatedUser, setUpdatedUser] = useState<User>(
{
  userId: user?.userId || "",
  firstName:  user?.firstName || "",
  lastName:  user?.lastName || "",
  email: user?.email || "",
  password: user?.password|| "",
  avatar: user?.avatar || avatarLink || "",
}

  );


  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById('uw');
      if (!uwScript) {
        const script = document.createElement('script');
        script.setAttribute('async', '');
        script.setAttribute('id', 'uw');
        script.src = 'https://upload-widget.cloudinary.com/global/all.js';
        script.addEventListener('load', () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
    setUpdatedUser(updatedUser);

  }, [loaded, setUpdatedUser]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      var myWidget = (window as any).cloudinary.createUploadWidget(
        uwConfig,
        (error: any, result: any) => {
          if (!error && result && result.event === 'success') {
            console.log('Done! Here is the image info: ', result.info);
            setPublicId(result.info.public_id);
            setAvatarLink(`${result?.info?.secure_url}`)
            console.log(`avatarLink ------> ${result?.info?.secure_url}`)
            onSuccess(result); // Call the success callback
          }
        }
      );

      document.getElementById('upload_widget')?.addEventListener(
        'click',
        function () {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className="cloudinary-btn"
        onClick={initializeCloudinaryWidget}
      >
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
