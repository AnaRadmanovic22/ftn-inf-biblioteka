'use strict'

class Book{
    constructor(id,title,date,url,description,popularity){
        this.id = id;
        this.title=title;
        this.date=date;
        this.url=url;
        this.description=description;
        this.popularity=popularity;
    }
}

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

function initializeBooks(){
    let books = []
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