import React from 'react'
import { Link } from "react-router-dom";
import '../../src/App.css'

export const HomeComponent = () => {    
    return (
      <>
        <header>
          <div id="intro" className="bg-image shadow-2-strong">
            <div className="mask mask-background">
              <div className="container d-flex align-items-center justify-content-center text-center h-100">
                <div className="text-dark text-center component-middle">
                  <h1 className="mb-3">Book Management</h1>
                  <h5 className="mb-4">
                    Best & free guide of responsive web design
                  </h5>
                  <Link to="/login">
                    <a
                      className="btn btn-outline-light btn-lg m-2"
                      type="button"
                    >
                      Login
                    </a>
                  </Link>
                  <Link to="signup">
                    <a
                      className="btn btn-outline-light btn-lg m-2"
                      type="button"
                    >
                      Sign-up
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    );
}
