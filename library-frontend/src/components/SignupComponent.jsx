import React, { useState, useEffect } from "react";
import "../../src/App.css";
import { Link, Redirect } from "react-router-dom";
import { failedAlert, successAlert } from "../toast/alert";
import { signUpAPI } from "../axios/commonMethod";

export const SignupComponent = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [isField, setIsField] = useState(0);
    const [alertMessage, setAlertMessage] = useState(0);
    const [isSignState, setIsSignState] = useState(false);
    
    const handleInputChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;

      if (name == "name") {
        setUserName(value);
      } 
      if (name == "email") {
        setEmail(value);
      } 
      if (name == "password") {
        setPassword(value);
      } 
      if (name == "repassword") {
        setRePassword(value);
      }
    };

    

    const signUp = async () => {
        let payload = {}
        let isPasswordMatch = password.toLowerCase() == rePassword.toLowerCase() ? true : false

        if (! userName || !email || !password || !rePassword){
            setAlertMessage("Incorrect email/password");
            setIsField(2)
        }
        if (!isPasswordMatch){
            setAlertMessage("Password mis-match");
            setIsField(2);
        }
        if (userName && email && password && rePassword && isPasswordMatch) {
            payload = {
              name: userName,
              email: email,
              password: password,
            };
            const res = await signUpAPI(payload);
            if(res.status == 200){
                const {id, name, email} = res?.data?.data;
                console.log('id', id)
                console.log("name", name);
                console.log("email", email);

                setIsField(1);
                setIsSignState(true);
                setAlertMessage("SignUp successfully");
                
                sessionStorage.setItem("isLogin", true);
                sessionStorage.setItem("loginAdminId", id);
                sessionStorage.setItem("loginAdminName", name);
                sessionStorage.setItem("loginAdminEmail",email);
            } else{
                setIsField(2);
                setAlertMessage("Something went unexpected wrong!");
            }
        }
    }

    return (
      <>
        {isSignState && <Redirect to="/listallbook" />}
        <section className="vh-100 signup-color">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black border-radius">
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div>
                        {isField == 1
                          ? successAlert(alertMessage)
                          : isField == 2 && failedAlert(alertMessage)}
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Sign up
                        </p>

                        <div className="mx-1 mx-md-4">
                          <div className="d-flex flex-row align-items-center mb-4">
                            <div className="form-outline flex-fill mb-0">
                              <label
                                className="form-label"
                                for="form3Example1c"
                              >
                                Your Name
                              </label>
                              <input
                                type="text"
                                id="form3Example1c"
                                className="form-control"
                                name="name"
                                required={true}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <div className="form-outline flex-fill mb-0">
                              <label
                                className="form-label"
                                for="form3Example3c"
                              >
                                Your Email
                              </label>
                              <input
                                type="email"
                                id="form3Example3c"
                                className="form-control"
                                name="email"
                                required={true}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <div className="form-outline flex-fill mb-0">
                              <label
                                className="form-label"
                                for="form3Example4c"
                              >
                                Password
                              </label>
                              <input
                                type="password"
                                id="form3Example4c"
                                className="form-control"
                                name="password"
                                required={true}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <div className="form-outline flex-fill mb-0">
                              <label
                                className="form-label"
                                for="form3Example4cd"
                              >
                                Repeat your password
                              </label>
                              <input
                                type="password"
                                id="form3Example4cd"
                                className="form-control"
                                name="repassword"
                                required={true}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>

                          <button
                            className="btn btn-primary ml-2 text-center"
                            onClick={() => signUp()}
                          >
                            Sign up
                          </button>
                          <Link to="/">
                            <button class="btn btn-secondary m-2" role="alert">
                              {`Back`}
                            </button>
                          </Link>
                        </div>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                          src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/draw1.png"
                          className="img-fluid"
                          alt="Sample image"
                        ></img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}
