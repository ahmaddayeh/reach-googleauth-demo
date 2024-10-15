import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const App = () => {
  const [backendResponse, setBackendResponse] = useState(null);

  const handleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    axios
      .post("http://localhost:5000/auth/google-signin", { token })
      .then((response) => {
        setBackendResponse(response.data);
      })
      .catch((error) => {
        console.error("Error sending token to backend:", error);
      });
  };

  const handleLoginFailure = () => {
    console.error("Google login failed");
  };

  return (
    <GoogleOAuthProvider clientId="662678382199-t3gh90mmsm7k4hdpn51sajtrvo0iv71j.apps.googleusercontent.com">
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>React Google OAuth Demo</h1>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
        {backendResponse && (
          <div>
            <h3>Backend Response:</h3>
            <pre>{JSON.stringify(backendResponse, null, 2)}</pre>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
