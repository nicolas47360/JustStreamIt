

const baseUrl = "http://localhost:8000/api/v1/titles/"


fetch(baseUrl + '?sort_by=-imdb_score' )
    .then(response => response.json())
    .then(data => {
        const bestFilmData = data.results[0];
        const id = bestFilmData.id

        fetch(baseUrl + id)
        .then (response => response.json())
        .then(dataMovie => {
        const titleBest = document.getElementById("title-best");
        const bestDescription = document.getElementById("best-description");
        const imageBest = document.getElementById("image-best");

        titleBest.innerHTML = dataMovie.title;
        bestDescription.innerHTML = dataMovie.long_description;
        imageBest.src = dataMovie.image_url;
        })})

function getBestMovies(){
     fetch(baseUrl + '?sort_by=-imdb_score')
    .then(response => response.json())
    .then(data => {
        const movies = data.results;
        for( movie of movies){
        const image = document.createElement('img');
        image.src = movie.image_url;
        const bestMovie = document.getElementById('best-score')
        bestMovie.appendChild(image)
        }
        })}

function getId(){
    fetch(baseUrl)
    .then(response => response.json())
    .then(data => {
        const movies = data.results;
        for( movie of movies){
        const id = movie.id;
        console.log(id)
        return id
        }})
    }

function getFilmsForCategory(genre) {
     fetch(baseUrl + '?&genre=' + genre + '&sort_by=-imdb_score')
    .then(response => response.json())
    .then(data => {
        const movies = data.results;
        for( movie of movies){
        const image = document.createElement('img');
        image.src = movie.image_url;
        const actionMovie = document.getElementById(genre)
        actionMovie.appendChild(image)
        }
        })}

function filmInformation(){
 fetch(baseUrl + '1508669')
    .then(response => response.json())
    .then(data => {
         const information = document.getElementById('information')
         information.innerHTML = `
            <img class="modal-img" src="${data.image_url}" alt="" />
            <p>title: ${data.title}</p>
            <p>genre: ${data.genres}</p>
            <p>released: ${data.date_published}</p>
            <p>vote: ${data.avg_vote}</p>
            <p>imdb score: ${data.imdb_score}</p>
            <p>director: ${data.directors}</p>
            <p>actors: ${data.actors}</p>
            <p>duration: ${data.duration} min</p>
            <p>country: ${data.countries}</p>
            <p>gross income: ${data.worldwide_gross_income}</p>
            <p>plot: ${data.long_description}</p>
        `;
        })
}


/* creation de la modale */
let modal = null;
const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    target.style.display = "block";
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');

    filmInformation()
    modal = target;
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
    }

const closeModal = function(e){
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal', 'true');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal = null;
}

const stopPropagation = function(e) {
    e.stopPropagation();
    }

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})

/* creation carroussel*/

getBestMovies();
getFilmsForCategory('animation');
getFilmsForCategory('thriller');
getFilmsForCategory('action');