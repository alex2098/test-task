import {useState} from "react";
import "./App.css";
import Form from "./Form";
import CardBook from "./CardBook";
import {Book} from "./Type";

function App() {
  let arr: Book[] = [];
  for(let i=0; i<localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key || "");
    let item: Book = JSON.parse(value || "");
    arr.push(item);
  }
  const [books, setBooks] = useState(arr);
  const [index, setIndex] = useState(-1);

  const addBook = (book: Book) => {
    setBooks([...books, book]);
    localStorage.setItem(localStorage.length.toString(), JSON.stringify(book));
  }

  const editBook = (book: Book, id: number) =>{
    let copy_book = [...books];
    copy_book[id] = book;
    setBooks(copy_book);
    setIndex(-1);
    localStorage.setItem(id.toString(), JSON.stringify(book));
  }

  const deleteBook = (id: number) =>{
    let copy_book = [...books]; 
    copy_book.splice(id, 1);
    setBooks(copy_book);
    localStorage.removeItem(id.toString());
  }

  const clickEditButton = (id: number) => setIndex(id);

  return (
    <div className="app">
      <div className="header">
        <div className="header-text">
          Тестовое задание
        </div>
      </div>
      <div className="left-main">
        <Form nameButton="Добавить" changeBook={addBook}/>
      </div>
      <div className="main">
        {books.map((item, id) => (
          <CardBook key={id} id={id} book={item} clickEditButton={clickEditButton} clickDeleteButton={deleteBook} />
        ))}
      </div>
      {index === -1 || <div className="modal" onClick={() => setIndex(-1)}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-text">
            Редактирование
          </div>
          <Form book={books[index]} nameButton="Изменить" changeBook={(book: Book) => editBook(book, index)}/>
        </div>
      </div>}
    </div>
  );
}

export default App;
