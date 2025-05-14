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

//  funkcija za vraćanje knjige (uklanjanje iz rezervisanih)
function returnBook(bookToReturn) {
    
    let reservedBooks = loadReservedBooks();

    let updatedReserved = [];
    for (let i = 0; i < reservedBooks.length; i++) {
        if (reservedBooks[i].id !== bookToReturn.id) {
            updatedReserved.push(reservedBooks[i]);
        }}

    saveReservedBooks(updatedReserved);
    renderReservedBooksTable();
    renderAvailableBooksTable();
}

//  za prikaz tabele iznajmljenih knjiga
function renderReservedBooksTable() {
    const reservedBooks = loadReservedBooks();

    let table = document.querySelector('#rentedBooks-body')
    table.innerHTML = ''

    for(let i = 0; i < reservedBooks.length; i++){

        let tr = document.createElement('tr')

        let num = document.createElement('td')
        num.textContent = i+1

        let name = document.createElement('td')
        name.textContent = reservedBooks[i].title

        let returnField = document.createElement('td')

        let returnBtn = document.createElement('button')
        returnBtn.textContent = 'Vrati'
        returnBtn.addEventListener('click', function(){
            returnBook(reservedBooks[i])
        })

        returnField.appendChild(returnBtn)

        tr.appendChild(num)
        tr.appendChild(name)
        tr.appendChild(returnField)

        table.appendChild(tr)
    }
}
//funckija koja renderuje dostupne knjige
function renderAvailableBooksTable(){
    const allBooks = loadAllBooks();
    const reservedBooks = loadReservedBooks();

    let availableBooks = [];
//prolazimo kroz sve knjige i proveravamo za svaku da li je rezervisana , ako nije dodajemo je u availableBooks
    for (let i = 0; i< allBooks.length; i++) {
        let book = allBooks[i];
        let isReserved = false;
        
        for (let j = 0; j < reservedBooks.length; j++){
            if (reservedBooks[j].id === book.id) {
                isReserved = true;
                break;
            }
        }
        if(!isReserved){
        availableBooks.push(book);
    }
    }
    //kreiramo tabelu dinamicki
    const table = document.querySelector("#availableBooks-body");
    table.innerHTML = "";

    for (let i = 0; i < availableBooks.length; i++) {
        const tr = document.createElement('tr');
        const num = document.createElement('td');
        num.textContent = i + 1;

        const name = document.createElement('td');
        name.textContent = availableBooks[i].title;

        const rentField = document.createElement('td');
        const rentBtn = document.createElement('button');
        rentBtn.textContent = 'Iznajmi';

        rentBtn.addEventListener('click', function () {
            rentBook(availableBooks[i]);
        });

        rentField.appendChild(rentBtn);

        tr.appendChild(num);
        tr.appendChild(name);
        tr.appendChild(rentField);

        table.appendChild(tr);
    }
}

//dodajemo funckiju za iznajmljivanje Knjige
function rentBook(bookToRent) {
    const reservedBooks = loadReservedBooks();
    reservedBooks.push(bookToRent);
    saveReservedBooks(reservedBooks);

    renderReservedBooksTable();
    renderAvailableBooksTable();
}


//  funkcija za učitavanje svih knjiga iz localStorage (kolekcija "books")
function loadAllBooks() {
    const booksJSON = localStorage.getItem('books');
    if (booksJSON) {
        return JSON.parse(booksJSON);
    } else {
        return []; 
    }
}

//  funkcija za učitavanje iznajmljenih knjiga (kolekcija "reservedBooks")
// ovde sam zalepila prethodne knjige cisto da moze lakse da se vidi sta radimo*
function loadReservedBooks() {
    let reservedJSON = localStorage.getItem('reservedBooks');
    if (reservedJSON) {
        return JSON.parse(reservedJSON);
    } else {
        return reservedJSON = [
            { id: "B1234", title: "Knjiga 1", date: "2022", url: "assets/images/book1.jpg", description: "Opis knjige 1", popularity: 4 },
            { id: "B5678", title: "Knjiga 2", date: "2021", url: "assets/images/book2.jpg", description: "Opis knjige 2", popularity: 5 },
            { id: "B9101", title: "Knjiga 3", date: "2020", url: "assets/images/book3.jpg", description: "Opis knjige 3", popularity: 3 },
            { id: "B1121", title: "Knjiga 4", date: "2019", url: "assets/images/book4.jpg", description: "Opis knjige 4", popularity: 2 },
            { id: "B3141", title: "Knjiga 5", date: "2018", url: "assets/images/book5.jpg", description: "Opis knjige 5", popularity: 5 }
        ];
    }
}

//  Funkcija za snimanje iznajmljenih knjiga nazad u localStorage
function saveReservedBooks(reservedBooks) {
    localStorage.setItem('reservedBooks', JSON.stringify(reservedBooks));
}

document.addEventListener('DOMContentLoaded', () => {
    renderReservedBooksTable();
    renderAvailableBooksTable();
});