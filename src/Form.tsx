import {useState} from "react";
import style from "./Form.module.css";
import {Book} from "./Type";

type TypeForm = {
    book?: Book,
    nameButton: string,
    changeBook: (book: Book) => void,
}

function Form({ book = {name: "", author: "", src: ""},  nameButton, changeBook } : TypeForm) {
    const [name, setName] = useState(book.name);
    const [author, setAuthor] = useState(book.author);
    const [src, setSrc] = useState(book.src);
    const [errorName, setErrorName] = useState(false);
    const [errorAuthor, setErrorAuthor] = useState(false);
    const [errorSrc, setErrorSrc] = useState(false);

    const onChangeScr = (event: React.ChangeEvent<HTMLInputElement>) =>{
        if(event.target.files && event.target.files.length > 0){
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                let imgBase: string = typeof reader.result === "string" ? reader.result : "";
                const image = new Image();
                image.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = 145;
                    canvas.height = 205;
                    var ctx = canvas.getContext("2d");
                    ctx?.drawImage(image, 0, 0, 145, 205);
                    setSrc(canvas.toDataURL(file.type)); 
                }
                image.src = imgBase;
            });
            reader.readAsDataURL(file);
        }
    }

    const onChange = () => {
        setErrorName(name === "");
        setErrorAuthor(author === "");
        setErrorSrc(src === "");
        if(name !== "" && author !== "" && src !== ""){
            changeBook({name, author, src});
        }
    }

    return (
      <div className={style.box}>
        <div>{errorName ? "Пустое поле" : "Название"}</div>
        <input type="text" value={name} onChange={(event)=> setName(event.target.value)} />
        <div>{errorAuthor ? "Пустое поле" : "Автор"}</div>
        <input type="text" value={author} onChange={(event)=> setAuthor(event.target.value)} />
        <div>{errorSrc ? "Отсутсвует изображение" : "Изображение"}</div>
        <img src={src} />
        <br />
        <input type="file" accept="image/*" onChange={onChangeScr} className={style.input} />
        <br />
        <br />
        <button onClick={onChange}>{nameButton}</button>
      </div>
    );
  }
  
  export default Form;