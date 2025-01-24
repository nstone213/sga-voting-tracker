import React, { useState } from "react";
import SignIn from "../../components/signin/SignIn";
import './SignInPage.css'

function SignInPage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="signinpage-container">
      <SignIn setUser={setUser} setName={setName} setSubmitted={setSubmitted} />
    </div>
  );
}

export default SignInPage;