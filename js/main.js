/* **************************************************
*	Name: Vue Movies app
*	Author: Deniel Den
*	Author URI: https://www.linkedin.com/in/denielden
*	Source API: https://rapidapi.com/apidojo/api/imdb8/
*	Version: 1.0.1
************************************************** */
window.onload = () => {
	const navBtn = document.querySelector('nav'),
			newTarget = document.querySelectorAll('header, #toggleNav'),
			toMove = document.querySelectorAll('.login, .sidebar'),
			cardContainer = document.querySelector('.container'),
			goTop = document.querySelector('#goTop');
	
	cardContainer.onscroll = () => {
		cardContainer.scrollTop > 100 ?
			goTop.style.display = 'block' :
			goTop.style.display = 'none';
	}

	navBtn.addEventListener('click', e => e.target.nodeName === 'NAV' ? e.target.firstChild.classList.toggle('active') : null );

	function mobileChange() {
		if (window.matchMedia('(max-width: 800px)').matches) {
			toMove.forEach(ele => newTarget[1].insertAdjacentElement('beforeend', ele));
		} else {
			newTarget[0].insertAdjacentElement('afterend', toMove[1]);
			newTarget[0].insertAdjacentElement('beforeend', toMove[0]);
		}
	}
	mobileChange();
	window.addEventListener('resize', mobileChange);
}

// Vue
var app = new Vue({
	el: '#vue-container',
	data: {
		title: 'Popular Movies',
		query: '',
		data: {
			noApi: [
				{
					id: '/title/tt11138512/',
					image: { url:'https://m.media-amazon.com/images/M/MV5BMDNkMTVlODUtNjBlMi00ZTUyLWI5OTItZTFjMjVlMTA5MTkzXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg' },
					title: 'The Northman',
					titleType: 'movie',
					year: 2022
				},
				{
					id: '/title/tt11198330/',
					image: { url:'https://m.media-amazon.com/images/M/MV5BMTFmZjZjOWItOWY0NC00ZDA1LWFhN2ItMDI1ZGNmNGE2NGJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg' },
					title: 'House of the Dragon',
					titleType: 'tvSeries',
					year: 2022
				},
				{
					id: '/title/tt13320622/',
					image: { url:'https://m.media-amazon.com/images/M/MV5BYzdkOWYwOTEtMDFiYS00MzYzLWI0MmMtNjE1ODcyNDJjMTFiXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg' },
					title: 'The Lost City',
					titleType: 'movie',
					year: 2022
				},
				{
					id: '/title/tt10919420/',
					image: { url:'https://m.media-amazon.com/images/M/MV5BYWE3MDVkN2EtNjQ5MS00ZDQ4LTliNzYtMjc2YWMzMDEwMTA3XkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_.jpg' },
					title: 'Squid Game',
					titleType: 'tvSeries',
					year: 2021
				},
				{
					id: '/title/tt10838180/',
					image: { url:'https://m.media-amazon.com/images/M/MV5BMGJkNDJlZWUtOGM1Ny00YjNkLThiM2QtY2ZjMzQxMTIxNWNmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg' },
					title: 'The Matrix Resurrections',
					titleType: 'movie',
					year: 2021
				},
				{
					id: '/title/tt1160419/',
					image: { url:'https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg' },
					title: 'Dune',
					titleType: 'movie',
					year: 2021
				},
				{
					id: '/title/tt11083552/',
					image: { url:'https://m.media-amazon.com/images/M/MV5BNGVkOTlhOTktNjZiNS00NDg3LWIxMDAtZTY5Y2E0YjllN2IxXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg' },
					title: 'Wrath of Man',
					titleType: 'movie',
					year: 2021
				},
				{
					id: '/title/tt5180504/',
					image: { url:'https://m.media-amazon.com/images/M/MV5BN2FiOWU4YzYtMzZiOS00MzcyLTlkOGEtOTgwZmEwMzAxMzA3XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg' },
					title: 'The Witcher',
					titleType: 'tvSeries',
					year: 2019
				},
				{
					id: '/title/tt7949218/',
					image: { url:'https://m.media-amazon.com/images/M/MV5BM2JkM2Y5NTEtZWIwZS00ZTliLTk3MDMtNzY4MDNkNjg0NTkwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg' },
					title: 'See',
					titleType: 'tvSeries',
					year: 2019
				},
				{
					id: '/title/tt2306299/',
					image: { url:'https://m.media-amazon.com/images/M/MV5BODk4ZjU0NDUtYjdlOS00OTljLTgwZTUtYjkyZjk1NzExZGIzXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg' },
					title: 'Vikings',
					titleType: 'tvSeries',
					year: 2013
				}
			],
			movies: [],
			initList: [],
			details: null,
			saved: JSON.parse(window.localStorage.getItem('savedMovies')) || []
		},
		orderBy: 'date90',
		showModal: false
	},
	methods: {
		toggleMode: () => document.body.classList.toggle('light'),
		// title/get-video-playback
		// title/get-more-like-this
		callAPI(param, endPoint = 'find?q=') {
			fetch("https://imdb8.p.rapidapi.com/title/"+endPoint+param, {
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "imdb8.p.rapidapi.com",
					// "x-rapidapi-key": "44619a653emsh4ddb6f918472355p1504d4jsn23552fba51b7"
					"x-rapidapi-key": "0905135359msh51384c9a3ea8141p160b7bjsnd25333f44851"
				}
			})
			.then(response => {
				if (response.status === 429) {
					alert('Failed to recover data:\nAPI call limit exceeded.\n\nPlease try again at the end of the month!\nSorry for the inconvenience.');
					app.data.movies = app.data.noApi;
					app.data.initList = app.data.noApi;
				}
				return response.json();
			})
			.catch(e => console.error(e))
			.then(data => {
				switch (endPoint) {
					case 'get-most-popular-movies?homeCountry=IT&purchaseCountry=IT&currentCountry=IT':
						app.data.initList = data.slice(0, 50);

						let stringId = '';
						stringId += app.data.initList.map(ele => '&ids=tt'+app.clearIdMovie(ele));
						stringId = stringId.replaceAll(',', '').substring(1);
						app.callAPI(stringId, 'get-meta-data?');
						break;

					case 'get-meta-data?':
						let filteredData = [];
						Object.keys(data).forEach(k => filteredData.push(data[k].title));
						app.filterUndefined(filteredData);
						app.sortDecrescent(filteredData);

						app.data.initList = filteredData;
						app.data.movies = filteredData;
						break;

					case 'get-overview-details?tconst=':
						app.data.details = data;
						break;

					default:
						if(data.results === undefined) {
							alert('No results found for: '+app.query);
							app.startMovie();
						} else {
							let clearData = app.filterUndefined(data.results);
							app.sortDecrescent(clearData);
							app.data.movies = clearData;
						}
						break;
				}
			});
		},

		init() {
			this.callAPI('', 'get-most-popular-movies?homeCountry=IT&purchaseCountry=IT&currentCountry=IT');
		},

		runQuery() {
			this.title = this.query;
			this.orderBy = 'date90';
			this.callAPI(this.query);
			this.scrollTopOn();
			this.query = '';
		},

		startMovie(){
			this.title = 'Popular Movies';
			this.query = '';
			this.orderBy = 'date90';
			this.data.movies = this.data.initList;
			document.querySelector('#toggleNav').classList.remove('active');
			this.scrollTopOn();
		},

		getDetails(e) {
			let idMovie = e.target.id;
			this.callAPI('tt'+idMovie, 'get-overview-details?tconst=');			
			this.showModal = true;
		},

		orderByVal(e) {
			switch(e.target.value) {
				case 'nameAZ':
					this.data.movies.sort((a, b) => a.title.localeCompare(b.title));
					break;
				case 'nameZA':
					this.data.movies.sort((a, b) => b.title.localeCompare(a.title));
					break;
				case 'date09':
					this.data.movies.sort((a, b) => a.year - b.year);
					break;
				default:
					this.sortDecrescent(this.data.movies);
					break;
			}
		},
		
		saveMovie(e) {
			const idMovie = e.target.id,
					newSaved = this.data.movies.filter(movie => movie.id === '/title/tt'+idMovie+'/');
			this.scrollTopOn(e, 'ul#saved');
			this.data.saved = [ ...newSaved, ...this.data.saved ]
										.filter((val, i, arr) => i === arr.findIndex(t => t.id === val.id));
			this.saveMoviesToLocalStorage();

			e.target.textContent = '❤️ Saved';
			e.target.disabled = true;
		},
		
		removeSavedMovie(e) {
			const idMovie = e.target.dataset.id;
			this.data.saved = this.data.saved.filter(movie => movie.id !== '/title/tt'+idMovie+'/');
			this.saveMoviesToLocalStorage();
			
			const btnMovie = document.getElementById(idMovie);
			if(btnMovie && this.title !== 'Saved Movies') {
				btnMovie.removeAttribute('disabled');
				btnMovie.textContent = 'Save Movie';
			}
		},

		saveMoviesToLocalStorage() {
			localStorage.setItem('savedMovies', JSON.stringify(this.data.saved));
		},

		seeAllSaved() {
			this.title = 'Saved Movies';
			this.query = '';
			this.orderBy = 'date90';
			this.data.movies = this.sortDecrescent(this.data.saved);
			document.querySelector('#toggleNav').classList.remove('active');
			this.scrollTopOn();
		},

		filterUndefined: obj => obj.filter(ele => ele.title != undefined && ele.image && ele.image.url != undefined),
		sortDecrescent: obj => obj.sort((a, b) => b.year - a.year),
		clearIdMovie: rawId => rawId.replace(/\D/g, ''),
		reverseDate: date => date.split('-').reverse().join('-'),
		scrollTopOn: (e, c='.container') => document.querySelector(c).scrollTo({ top: 0, behavior: 'smooth' })
	}
});

app.init();