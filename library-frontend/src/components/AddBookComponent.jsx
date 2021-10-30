import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import Select from "react-select";
import { addNewBookAPI } from "../axios/commonMethod";
import { options } from "../static/constant";
import { failedAlert, successAlert } from "../toast/alert";

export const AddBookComponent = () => {

    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [bookName, setBookName] = useState('');
    const [bookAuthorName, setBookAuthorName] = useState("");
    const [bookPrice, setBookPrice] = useState(0);
    const [adminId, setAdminId] = useState(null);
    const [isSuccess, setIsSuccess] = useState(0);

    useEffect(() => {
        setAdminId(sessionStorage.getItem("loginAdminId"))
    }, [])

    const handleInputChange  = (e) => {
        let fieldName = e?.target?.name
        let fieldValue = e?.target?.value;

        if(fieldName == 'name'){
            setBookName(fieldValue);
        }
        if (fieldName == "authorName") {
            setBookAuthorName(fieldValue);
        }
        if (fieldName == "price") {
            setBookPrice(fieldValue);
        }
    };

    const addBook = async () => {
        if(!adminId){
            return
        }
        let formObject = {
          book_name: bookName,
          book_author_name: bookAuthorName,
          book_price: bookPrice,
          book_type: selectedOption?.value,
          admin: adminId,
        };
        const res = await addNewBookAPI(formObject);
        
        if(res.status == 200){
            setIsSuccess(1)
        } else{
            setIsSuccess(2);
        }
    };

    return (
      <>
        <Link to="/listallbook">
          <button class="btn btn-secondary m-2" role="alert">
            {`< Back`}
          </button>
        </Link>
        <body className="component-middle">
          <div>
            {isSuccess == 1
              ? successAlert("Book added successfully")
              : isSuccess == 2 &&
                failedAlert("Something went unexpected wrong")}
          </div>

          <h2>Add Book</h2>

          <div className="p-3">
            <div className="row">
              <div class="col-sm p-3">
                <h3>Name</h3>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  placeholder="Enter Book Name"
                  required={true}
                  name="name"
                  onChange={handleInputChange}
                ></input>
              </div>
              <div class="col-sm p-3">
                <h3>Author Name</h3>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  placeholder="Enter Authour Name"
                  required={true}
                  name="authorName"
                  onChange={handleInputChange}
                ></input>
              </div>
            </div>

            <div className="row">
              <div class="col-sm p-3">
                <h3>Price</h3>
                <input
                  type="number"
                  className="form-control"
                  id="inputName"
                  placeholder="Enter Price"
                  required={true}
                  name="price"
                  onChange={handleInputChange}
                ></input>
              </div>
              <div class="col-sm p-3">
                <h3>Type</h3>
                <Select
                  defaultValue={options[0]}
                  onChange={setSelectedOption}
                  options={options}
                />
              </div>
            </div>
            <button
              type="button"
              class="btn text-center btn-success"
              onClick={() => addBook()}
            >
              Success
            </button>
          </div>
        </body>
      </>
    );
}
