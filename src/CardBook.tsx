import style from "./CardBook.module.css";
import {Book} from "./Type";

type TypeCardBook = {
    id: number,
    book: Book,
    clickEditButton: (id: number) => void,  
    clickDeleteButton: (id: number) => void
}

function CardBook({ id, book, clickEditButton, clickDeleteButton }: TypeCardBook) {
    return (
      <div key={id} className={style.box}>
        <img key={`$img-${id}`} src={book.src} />
            <div key={`$info-${id}`} className={style.div}>
                <div key={`$name-${id}`}>
                    {book.name}
                </div>
                <div key={`$author-${id}`} className={style.author}>
                    {book.author}
                </div>
            </div>
            <button key={`$edit-${id}`} onClick={() => clickEditButton(id)}>
                Изменить
            </button>
            <button key={`$delete-${id}`} onClick={() => clickDeleteButton(id)}>
                Удалить
            </button>
      </div>
    );
  }
  
  export default CardBook;

