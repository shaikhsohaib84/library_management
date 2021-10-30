import React, {useEffect, useState} from 'react'
import { deleteBookAPI, getAllAdminBookAPI } from '../axios/commonMethod';
import "font-awesome/css/font-awesome.min.css";
import '../../src/App.css'
import { Redirect, Link } from 'react-router-dom';
import { failedAlert, successAlert } from '../toast/alert';
import { EditBook } from "./EditBook";


export const ListAllComponent = () => {
    const [bookList, setBookList] = useState([])
    const [userName, setUserName] = useState('');
    const [isAddNewBook, setIsAddNewBook] = useState(false);
    const [isEditBook, setIsEditBook] = useState(false);
    const [isSuccess, setIsSuccess] = useState(0);
    

    useEffect(() => {
        setUserName(sessionStorage.getItem("loginAdminName"));
        getAllBookList();
    }, [])
    
    const getAllBookList = async () => {
        const res = await getAllAdminBookAPI();
        
        if(res.status == 200){
            let data = res?.data?.data
            setBookList(data);
        }
    }

    const addBook = () => {
        setIsAddNewBook(true);
    }

    const deleteBook = async (selectedBookObjectId) => {
      const res = await deleteBookAPI(selectedBookObjectId);
      if(res.status == 200){
        setIsSuccess(1);
      } else{
        setIsSuccess(2);
      }
    };

    const editBook = (bookId, bookName) => {
      setIsEditBook(true)
      sessionStorage.setItem("bookId", bookId);
      sessionStorage.setItem("bookName", bookName);
    };

    return (
      <>
        <Link to="/logout">
          <button class="btn btn-secondary m-2" role="alert">
            {`logout`}
          </button>
        </Link>
        <div className="container component-middle">
          {isAddNewBook && <Redirect to="/addbook" />}

          {isEditBook && <Redirect to="/editbook" />}

          <div>
            {isSuccess == 1
              ? successAlert("Book deleted successfully")
              : isSuccess == 2 &&
                failedAlert("Something went unexpected wrong")}
          </div>

          <span>
            <h2 className="mb-3 display-inline-flex">{`${userName} Book Detail`}</h2>
            <div className="add-btn">
              <button
                type="button"
                class="btn btn-outline-success"
                onClick={() => addBook()}
              >
                Add Book
              </button>
            </div>
          </span>

          <div className="row p-2">
            <div class="col-sm">
              <h3>Name</h3>
            </div>
            <div class="col-sm">
              <h3>Price</h3>
            </div>
            <div class="col-sm">
              <h3>Type</h3>
            </div>
            <div class="col-sm">
              <h3></h3>
            </div>
            <div class="col-sm">
              <h3></h3>
            </div>
          </div>
          <hr />
          <div className="scroll-bar">
            {bookList
              ? bookList.map((ins) => (
                  <div className="row p-2">
                    <div className="col-sm">
                      <h5>{ins?.book_name}</h5>
                    </div>
                    <div className="col-sm">
                      <h5>{ins?.book_price}</h5>
                    </div>
                    <div className="col-sm">
                      <h5>{ins?.book_type}</h5>
                    </div>
                    <div className="col-sm">
                      <button
                        type="button"
                        class="btn btn-outline-info"
                        onClick={() => editBook(ins?.id, ins?.book_name)}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="col-sm">
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => deleteBook(ins?.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </>
    );
}
