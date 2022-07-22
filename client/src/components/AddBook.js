import React, {useState} from 'react';
import {useRef} from 'react';


function AddBook() {

    const [book, setBook] = useState({});

    let nameInput = useRef(null);
    let authorInput = useRef(null);
    let pagesInput = useRef(null);
  
    const onSubmit = (e) => {
      e.preventDefault();
      
      console.log("testi2");
      fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-type": "application/JSON"
        },
        mode: 'cors',
        body: JSON.stringify(book)
      })
      .then(response => console.log(response))
      .then(data => setBook({}))
  
      nameInput.current.value = "";
      authorInput.current.value = "";
      pagesInput.current.value = "";
    };
  
    const onChange = () => {
      console.log("testi");
      setBook({
        name: nameInput.current.value,
        author: authorInput.current.value,
        pages: pagesInput.current.value
      })
    }
  return (
    <div>
      <form onSubmit={onSubmit} onChange={onChange}>
      <input id="name" type="text" ref={nameInput} placeholder='Name of the book'></input>
      <input id="author" type="text" ref={authorInput} placeholder='Name of the author'></input>
      <input id="pages" type="number" ref={pagesInput} placeholder='Pages of the book'></input>
      <input id="submit" type="submit" value="Add a book"></input>
      </form>
    </div>
  )
}

export default AddBook