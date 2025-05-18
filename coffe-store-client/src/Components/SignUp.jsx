import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const SignUp = () => {
  const { signUpWithEmail } = useContext(AuthContext);

  const handleSignUpForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const { email, password, ...rest } = Object.fromEntries(formData.entries());

    // console.log(email, password, rest, userProfile);
    signUpWithEmail(email, password)
      .then((result) => {
        const userProfile = {
          email,
          ...rest,
          creationTime: result.user?.metadata?.creationTime,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
        };
        console.log(result);
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data after updating database", data);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Signed Up sucessfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            e.target.reset();
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="hero min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSignUpForm} className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Name"
            />
            <label className="label">Address</label>
            <input
              type="text"
              name="address"
              className="input"
              placeholder="Address"
            />
            <label className="label">Phone</label>
            <input
              type="text"
              name="phone"
              className="input"
              placeholder="Phone Number"
            />
            <label className="label">Photo Url</label>
            <input
              type="text"
              name="photoUrl"
              className="input"
              placeholder="Photo Url"
            />
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
            />
            <button className="btn btn-neutral mt-4">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
