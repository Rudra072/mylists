import React from "react";
import Logo from "../Common/Logo";
import SignupForm from "../Forms/SignupForm";

function Signup() {

  return (
    <section
      className="flex justify-center items-center min-h-[100vh]"
    >
      <div className="flex flex-col justify-center gap-[1.5rem] max-w-md w-9/12">
        <Logo />
        <h1 className="text-1000 text-headingH2 font-bold leading-heading tracking-H2">
          Welcome to My List! Let's get you Signed up.
        </h1>
        <SignupForm />
      </div>
    </section>
  );
}

export default Signup;
