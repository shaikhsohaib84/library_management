import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import { adminLogin } from "../axios/commonMethod";

import "../../src/App.css";
import { failedAlert, successAlert } from '../toast/alert';
import { ListAllComponent } from './ListAllComponent';



export const LoginComponent = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("");
    const [emailMessage, setEmailMessage] = useState(false);
    const [isLoginState, setIsLoginState] = useState(false);
    const [isSuccess, setIsSuccess] = useState(0);
    

    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    

    const handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        
        if (name == 'email') {
            setEmail(value);
        } else{
            setPassword(value);
        }
    };

    const login = async () => {
        
        if (regEmail.test(email)){
            setEmailMessage(false);
            const res = await adminLogin({ 'email': email, 'password': password });
            
            if(res.status == 200){
              // redirect to the book all list component
              sessionStorage.setItem("isLogin", true);
              setIsLoginState(true);
              setIsSuccess(1);
              
              sessionStorage.setItem(
                "loginAdminId",
                res?.data?.session?.loginAdminId
              );
              sessionStorage.setItem(
                "loginAdminName",
                res?.data?.session?.loginAdminName
              );
              sessionStorage.setItem(
                "loginAdminEmail",
                res?.data?.session?.loginAdminEmail
              );
              
            } else{
              setIsSuccess(2);
            }
            

        }else{
            setEmailMessage(true);
        }
    };

    

    return (
      <>
        {isLoginState && <Redirect to="/listallbook" />}
        <section className="vh-100 signup-color">
          <div>
            {isSuccess == 1
              ? successAlert("Book deleted successfully")
              : isSuccess == 2 && failedAlert("Incorrect email/password")}
          </div>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black border-radius">
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Login
                        </p>

                        <div className="mx-1 mx-md-4">
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
                            {emailMessage && (
                              <div class="alert alert-danger" role="alert">
                                Incorrect Email
                              </div>
                            )}
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

                          <button
                            className="btn btn-primary ml-2 text-center"
                            onClick={() => login()}
                          >
                            LogIn
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
