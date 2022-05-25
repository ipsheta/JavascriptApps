const APIURL = 'https://api.tvmaze.com/shows';
const SEARCHAPIURL = 'https://api.tvmaze.com/search/shows?q=';
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

//Get all movies while loading
getMovies(APIURL);

async function getMovies(URL) {
    const resp = await fetch(URL);
    const respData = await resp.json();
    //const randomMovie = respData[0].name;

    //console.log("--"+randomMovie);

    respData.forEach(movie => {
        const movieEl = document.createElement('div');

        movieEl.classList.add('movie');
        movieEl.innerHTML = `
                <img src="${movie.image.medium}" alt="${movie.name}">
                <div class="movie-info">
                <h3>${movie.name}</h3>
                <span class="${getClassByRate(movie.rating.average)}">${movie.rating.average}</span>
                </div>

                <div class="overview">
                <h4>Overview</h4>
                ${movie.summary}
                </div>
        `;

        main.appendChild(movieEl);
    });

    return respData;
}

function getClassByRate(vote) {
    if (vote >= 7.8) {
        return 'green';
    } else if (vote >= 7.4) {
        return 'orange';
    } else {
        return 'red';
    }
}

async function getSearchedMovies(URL) {
    //clear main
    main.innerHTML = '';

    const resp = await fetch(URL);
    const respData = await resp.json();
    console.log("--" + URL)

    try {
        //TODO load movie if image not null
        respData.forEach(movie => {
            const movieEl = document.createElement('div');

            movieEl.classList.add('movie');
            movieEl.innerHTML = `
            <img src="${movie.show.image.medium}" alt="${movie.show.name}">
            <div class="movie-info">
            <h3>${movie.show.name}</h3>
            <span class="${getClassByRate(movie.show.rating.average)}">${movie.show.rating.average}</span>
            </div>

            <div class="overview">
            <h4>Overview</h4>
                ${movie.show.summary}
            </div>
        `;
            main.appendChild(movieEl);
        });

    } catch (error) {
        console.log(error);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;

    if (searchTerm) {
        getSearchedMovies(SEARCHAPIURL + searchTerm);
        search.value = '';
    }

});

