

const baseUrl = "http://localhost:8000/api/v1/titles/"


fetch(baseUrl + '?sort_by=-imdb_score')
    .then(response => response.json())
    .then(data => {
        const titleBest = document.getElementById("title-best");
        const bestDescription = document.getElementById("best-description");
        const imageBest = document.getElementById("image-best");
        const bestFilmData = data.results[0];

        titleBest.innerHTML = bestFilm.title;
        bestDescription.innerHTML = bestFilm.long_description;
        imageBest.src = bestFilm.image_url;
        })

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
        const id = data.id;
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
 fetch(baseUrl + '9')
    .then(response => response.json())
    .then(data => {
        const info = {
        'Title': data.original_title,
        'Genres': data.genres,
        'Release Date': data.date_published,
        'Rated': data.rated,
        'IMDB Score': data.imdb_score,
        'Directors': data.directors,
        'Actors': data.actors,
        'Duration': data.duration,
        'Countries': data.countries,
        'Box Office': `$ ${data.worldwide_gross_income}`,
        'Description': data.description,
        'Long Description': data.long_description};
        console.log(info);
        const information = document.getElementById('information')
        information.innerHTML = info.information

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