let url = "https://openlibrary.org/search.json?q=";
// Html id ophalen
let booksInfo = document.getElementById("booksInfo");
let zoekBtn = document.getElementById("zoekBtn");
let bookInput = document.getElementById("bookInput");

// Functie om data op te halen
async function haalDataOp() {
    // Waarde van input ophalen
let zoekWoord = bookInput.value;
    try {
        // Fetch naar de API
        let response = await fetch(`${url}${zoekWoord}`);

        // Controle of de fetch lukt
        if (!response.ok) {
            throw new Error(response.status);
        }
        // Data omzetten naar JSON
        let data = await response.json();

         console.log(data);

        // Functie oproepen om data te tonen
        toonData(data);
    }
    catch(error) {
    // Foutmelding tonen
        booksInfo.textContent = "Er was een fout bij het ophalen van de data.";
        booksInfo.style.color = "red";
        console.error(error);
    }
}
// Functie om data op de pagina te tonen
function toonData(bookData) {

    // Vorige inhoud leegmaken
        booksInfo.innerHTML = "";

    // Door alle boeken lopen
    bookData.docs.forEach(element => {

        let card = document.createElement("div");

        let titleEl = document.createElement("p");
        let authorEl = document.createElement("p");
        let yearEl = document.createElement("p");

        // Data invullen
        titleEl.textContent = "Titel: " + element.title;

        // als boeken geen auteur hebben
        authorEl.textContent = "Auteur: " +
        (element.author_name ? element.author_name[0] : "Onbekend");

        // als boeken geen jaar hebben
        yearEl.textContent = "Jaar: " +
        (element.first_publish_year || "Onbekend");

        card.appendChild(titleEl);
        card.appendChild(authorEl);
        card.appendChild(yearEl);

        booksInfo.appendChild(card);

    });
}
zoekBtn.addEventListener("click", haalDataOp);