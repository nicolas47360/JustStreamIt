const baseUrl = "http://localhost:8000/api/v1/titles/"


fetch(baseUrl + '?sort_by=-imdb_score' )
    .then(response => response.json())
    .then(data => {
        const bestFilmData = data.results[0];
        const id = bestFilmData.id
        fetch(baseUrl + id)
        .then (response => response.json())
        .then(dataMovie => {
        const titleBest = document.getElementById("best-title");
        const bestDescription = document.getElementById("best-description");
        const imageBest = document.getElementById("best-image");
        titleBest.innerHTML = dataMovie.title;
        bestDescription.innerHTML = dataMovie.long_description;
        imageBest.src = dataMovie.image_url;
        })})

function getBestMovies(){
     const bestMovie = document.getElementById('best-score')
     fetch(baseUrl + '?sort_by=-imdb_score')
    .then(response => response.json())
    .then(data => {
        const movies = data.results;
        for( movie of movies){
        const image = document.createElement('img');
        image.src = movie.image_url;
        bestMovie.appendChild(image)
        image.setAttribute("data-filmid", movie.id)
        image.addEventListener('click', openModal)
        bestMovie.appendChild(image)
        }
        })}

function getFilmsForCategory(genre, page) {
     const films = document.getElementById(genre)
     films.replaceChildren()
     fetch(baseUrl + '?&genre=' + genre + '&sort_by=-imdb_score&page=' + page)
    .then(response => response.json())
    .then(data => {
        const movies = data.results;
        for( movie of movies){
        const image = document.createElement('img');
        image.src = movie.image_url;
        image.setAttribute("data-filmid", movie.id)
        image.addEventListener('click', openModal)
        films.appendChild(image)
        }
        })}

function filmInformation(id){
 fetch(baseUrl + id)
    .then(response => response.json())
    .then(data => {
         const information = document.getElementById('information')
         information.innerHTML = `
            <img class="js-modal" src="${data.image_url}" alt="affiche de film" />
            <p>Titre: ${data.title}</p>
            <p>Genre: ${data.genres}</p>
            <p>Date de sortie: ${data.date_published}</p>
            <p>Rated: ${data.rated}</p>
            <p>Imdb score: ${data.imdb_score}</p>
            <p>Réalisateur : ${data.directors}</p>
            <p>Acteurs: ${data.actors}</p>
            <p>Durée: ${data.duration} min</p>
            <p>Pays: ${data.countries}</p>
            <p>Box office: ${data.worldwide_gross_income}</p>
            <p>Synopsis: ${data.long_description}</p>
        `;
        })
}
/* creation de la modale */
let modal = null;
const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector("#modal");
    const id = e.target.dataset.filmid
    target.style.display = "block";
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');

    filmInformation(id)

    modal = target;
    modal.addEventListener('click', closeModal);
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-stop').addEventListener('click', stopPropagation);
    }

const closeModal = function(e){
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal', 'true');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.modal-close').removeEventListener('click', closeModal);
    modal = null;
}

const stopPropagation = function(e) {
    e.stopPropagation();
    }


getBestMovies();
getFilmsForCategory('animation', "1");
getFilmsForCategory('thriller', "1");
getFilmsForCategory('action', "1");

document.querySelectorAll('.js-modal img').forEach(a => {
    a.addEventListener('click', openModal)
})
