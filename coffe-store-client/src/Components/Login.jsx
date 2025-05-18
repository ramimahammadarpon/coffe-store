import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {

  const {loginUser} = useContext(AuthContext);
    const handleLoginForm = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        loginUser(email, password).then(result=> {
          console.log(result)
          const signInInfo = {
            email,
            lastSignInTime: result.user?.metadata?.lastSignInTime,
          }
          console.log(signInInfo);
          fetch('http://localhost:3000/users',{
            method: "PATCH",
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify(signInInfo)
          }).then(res=>res.json()).then(data=> {
            console.log(data);
          })
        }).catch(error=> console.log(error));
    }

  return (
    <div className="hero min-h-screen">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleLoginForm} className="fieldset">
              <label className="label">Email</label>
              <input type="email" name="email" className="input" placeholder="Email" />
              <label className="label">Password</label>
              <input type="password" name="password" className="input" placeholder="Password" />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
            </form>
          </div>
        </div>
    </div>
  );
};

export default Login;
