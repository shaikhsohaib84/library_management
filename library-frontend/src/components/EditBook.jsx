import React,{useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import Select from "react-select";
import { editBookAPI } from '../axios/commonMethod';
import { options } from "../static/constant";
import { failedAlert, successAlert } from '../toast/alert';

export const EditBook = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [bookId, setBookId] = useState(sessionStorage.getItem('bookId'))
  const [oldBookName, setOldBookName] = useState(sessionStorage.getItem("bookName"));
  const [bookName, setBookName] = useState("");
  const [bookAuthorName, setBookAuthorName] = useState("");
  const [bookPrice, setBookPrice] = useState(0);
  const [isSuccess, setIsSuccess] = useState(0);

  const handleInputChange = (e) => {
    let fieldName = e?.target?.name;
    let fieldValue = e?.target?.value;

    if (fieldName == "name") {
      setBookName(fieldValue);
    }
    if (fieldName == "authorName") {
      setBookAuthorName(fieldValue);
    }
    if (fieldName == "price") {
      setBookPrice(fieldValue);
    }
  }

  const editBook = async () =>{
    let formObject = {
      book_name: bookName,
      book_author_name: bookAuthorName,
      book_price: bookPrice,
      book_type: selectedOption?.value,
    };

    const res = await editBookAPI(bookId, formObject);

    if (res.status == 200) {
      setIsSuccess(1);
    } else {
      setIsSuccess(2);
    }
  }

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
            ? successAlert(`${oldBookName} book updated successfully`)
            : isSuccess == 2 && failedAlert("Something went unexpected wrong")}
        </div>
        <h2>{`You are editing book: ${oldBookName}.`}</h2>

        <div className="p-3">
          <div className="row">
            <div class="col-sm p-3">
              <h3>Name</h3>
              <input
                type="text"
                className="form-control"
                id="inputName"
                placeholder="Update Book Name"
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
                placeholder="Update Authour Name"
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
                placeholder="Update Price"
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
            onClick={() => editBook()}
          >
            Update
          </button>
        </div>
      </body>
    </>
  );
};
