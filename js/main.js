/* **************************************************
*	Name: Vue Movies app
*	Author: Deniel Den
*	Author URI: https://www.linkedin.com/in/denielden
*	Source API: https://rapidapi.com/apidojo/api/imdb8/
*	Version: 1.0.0
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
		query: '',
		data: {
			noApi: [
				{
					id: '/title/ff4123432/',
					image: { url:'https://m.media-amazon.com/images/M/MV5BOTNjNWRjZDUtYjU1OC00NGFmLWE2ZDktMzhhYmIwOTU4YjVmXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg' },
					title: 'Fantastic Beasts: The Secrets of Dumbledore',
					titleType: 'movie',
					year: 2022
				},
				{
					id: '/title/ff10838180/',
					image: { url:'https://m.media-amazon.com/images/M/MV5BMGJkNDJlZWUtOGM1Ny00YjNkLThiM2QtY2ZjMzQxMTIxNWNmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg' },
					title: 'The Matrix Resurrections',
					titleType: 'movie',
					year: 2021
				},
				{
					id: '/title/ff1160419/',
					image: { url:'https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg' },
					title: 'Dune',
					titleType: 'movie',
					year: 2021
				},
				{
					id: '/title/ff11083552/',
					image: { url:'https://m.media-amazon.com/images/M/MV5BNGVkOTlhOTktNjZiNS00NDg3LWIxMDAtZTY5Y2E0YjllN2IxXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg' },
					title: 'Wrath of Man',
					titleType: 'movie',
					year: 2021
				},
				{
					id: '/title/ff5180504/',
					image: { url:'https://m.media-amazon.com/images/M/MV5BN2FiOWU4YzYtMzZiOS00MzcyLTlkOGEtOTgwZmEwMzAxMzA3XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg' },
					title: 'The Witcher',
					titleType: 'tvSeries',
					year: 2019
				},
				{
					id: '/title/ff7949218/',
					image: { url:'https://m.media-amazon.com/images/M/MV5BM2JkM2Y5NTEtZWIwZS00ZTliLTk3MDMtNzY4MDNkNjg0NTkwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg' },
					title: 'See',
					titleType: 'tvSeries',
					year: 2019
				}
			],
			movies: [],
			initList: [],
			details: undefined
		},
		orderBy: 'date90',
		saved: 0 //save in local storage obj with id and name
	},
	methods: {
		toggleMode() {
			document.body.classList.toggle('light');
		},
		// title/get-video-playback
		// title/get-more-like-this
		fetchHelper(param, endPoint = 'find?q=') {
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
						stringId = stringId.concat(app.data.initList.map(ele => '&ids=tt'+ele.replace(/\D/g, '')));
						stringId = stringId.replaceAll(',', '').substring(1);

						this.fetchHelper(stringId, 'get-meta-data?');
						break;
					case 'get-meta-data?':
						let filteredData = [];
						Object.keys(data).forEach(k => filteredData.push(data[k].title) );
						filteredData = filteredData.filter(el => el.title != undefined && el.image && el.image.url != undefined)

						app.data.initList = filteredData;
						app.data.movies = filteredData;
						break;
					case 'get-overview-details?tconst=':
						app.data.details = data;
						break;
					default:
						let clearData = data.results.filter(ele => ele.title != undefined && ele.image && ele.image.url != undefined);
						this.sortDecrescent(clearData);
						app.data.movies = clearData;
						break;
				}
			});
		},

		init() {
			this.query = '';
			this.orderBy = 'date90';
			this.fetchHelper('', 'get-most-popular-movies?homeCountry=IT&purchaseCountry=IT&currentCountry=IT');
		},

		runQuery() {
			this.orderBy = 'date90';
			this.fetchHelper(this.query);
			this.scrollTopHelper();
		},

		startMovie(){
			this.orderBy = 'date90';
			app.data.movies = app.data.initList;
			document.querySelector('#toggleNav').classList.remove('active');
			this.scrollTopHelper();
		},

		getDetails(e) {
			let idMovie = e.target.id;
			this.fetchHelper('tt'+idMovie, 'get-overview-details?tconst=');
			// open page or pop up
			// and see details from app.data.details
		},
		
		saveMovie(e) {
			e.target.textContent = '❤️ Saved';
			e.target.disabled = true;

			const savedMove = document.querySelector('#saved'),
					nameMovie = e.target.value,
					idMovie = e.target.id,
					li = document.createElement('li'),
					span = document.createElement('span'),
					text = document.createTextNode(nameMovie);

			span.setAttribute('id', idMovie);
			span.onclick = this.removeSavedMovie;
			li.appendChild(span);
			li.appendChild(text);
			savedMove.appendChild(li);

			this.saved = this.saved + 1;
			// app.data.movies[id].saved = 1
		},
		
		removeSavedMovie(e) {
			e.target.parentNode.remove();

			const btnMovie = document.getElementById(e.target.id);
			btnMovie.removeAttribute('disabled');
			btnMovie.textContent = 'Save Movie';

			this.saved = this.saved - 1;
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

		sortDecrescent(ele) {
			return ele.sort((a, b) => b.year - a.year);
		},
		scrollTopHelper() {
			document.querySelector('.container').scrollTo({ top: 0, behavior: 'smooth' });
		}
	}
});

app.init();