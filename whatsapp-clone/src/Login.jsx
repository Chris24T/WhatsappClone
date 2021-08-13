import React, { useContext } from "react";
import { auth, provider } from "./firebase";
import { Button } from "@material-ui/core";
import UserContext from "./contexts/userContext";

import "./Login.css";
function Login() {
  const { user, setUser } = useContext(UserContext);

  function signIn__Google() {
    console.log("ggl sign in attempt");

    auth
      .signInWithPopup(provider)
      .then((result) => {
        setUser(result);
      })
      .catch((e) => {
        window.alert(e);
      });
  }

  return (
    <div className="login">
      <div className="login__container">
        <img
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png"
          }
          alt=""
        ></img>
        <div className="login__text">
          <h2>Sign in to WhatsApp</h2>
        </div>
        <div className="login__buttonContainer">
          <Button
            style={{ "background-color": "green" }}
            onClick={() => signIn__Google()}
          >
            Sign In With Google
          </Button>
          <Button
            style={{ "background-color": "blue" }}
            onClick={() => signIn__Google()}
          >
            Sign In With FaceBook
          </Button>
          <Button
            style={{ "background-color": "red" }}
            onClick={() => signIn__Google()}
          >
            Sign In With Phone
          </Button>
        </div>
      </div>
      {/* <div>Anonymous</div> */}
    </div>
  );
}

export default Login;
