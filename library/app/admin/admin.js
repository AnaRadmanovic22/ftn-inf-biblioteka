'use strict'
//obrisao sam u konstruktoru parametar id, nema potrebe za tim
class Book{
    constructor(title,date,url,description,popularity){
        this.title=title;
        this.date=date;
        this.url=url;
        this.description=description;
        this.popularity=popularity;
    }
}

//dodao sam ovu varijablu globalnu u koje cu puniti nove knjige
let books = [];


// 1.1 Prikaz i brisanje knjiga

function addTableRows(books){
    let table = document.querySelector('#books-body')
    table.innerHTML = ''

    for(let i = 0; i < books.length; i++){

        let tr = document.createElement('tr')

        let num = document.createElement('td')
        num.textContent = i + 1;

        let name = document.createElement('td')
        name.textContent = books[i].title

        let td = document.createElement('td')
        let deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Obrisi'
        
        deleteBtn.addEventListener('click', function(){
            books.splice(i,1)
            localStorage.setItem('books', JSON.stringify(books));
            addTableRows(books);
        })
        
        td.appendChild(deleteBtn)
        
        tr.appendChild(num)
        tr.appendChild(name)
        tr.appendChild(td)

        table.appendChild(tr)
    }
    
}
//A2- dodao sam funckiju za dodavanje nove knjige
function handleForSubmisson(book){
    book.preventDefault();

    const form = document.querySelector("#newBookForm");
    const formData = new FormData(form);

    const name = formData.get("title");
    // const id = formData.get("id");
    //ovde sam naisao na gresku jer se u zadatku trazi datum stampanja a ne tip, prepravio sam to i u html-u
    const date = formData.get("date");
    const image = formData.get("pic");
    const description = formData.get("description");
    const popularity = formData.get("popular");

    const newBook = new Book(name, date, image, description, popularity);
    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));
    addTableRows(books);
    form.reset();

}
//dodao sam dogadjaj kada se stisne sumbit forme
document.querySelector("#newBookForm").addEventListener("submit", handleForSubmisson)

function initializeBooks(){
    let savedBooks = localStorage.getItem('books')
    if(savedBooks){
        books = JSON.parse(savedBooks);
    } else {
        books = [
            { id: "B1234", title: "Knjiga 1", date: "2022", url: "assets/images/book1.jpg", description: "Opis knjige 1", popularity: 4 },
            { id: "B5678", title: "Knjiga 2", date: "2021", url: "assets/images/book2.jpg", description: "Opis knjige 2", popularity: 5 },
            { id: "B9101", title: "Knjiga 3", date: "2020", url: "assets/images/book3.jpg", description: "Opis knjige 3", popularity: 3 },
            { id: "B1121", title: "Knjiga 4", date: "2019", url: "assets/images/book4.jpg", description: "Opis knjige 4", popularity: 2 },
            { id: "B3141", title: "Knjiga 5", date: "2018", url: "assets/images/book5.jpg", description: "Opis knjige 5", popularity: 5 }
        ];
        localStorage.setItem('books', JSON.stringify(books));
    }

    addTableRows(books)
}

document.addEventListener('DOMContentLoaded',initializeBooks)