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
			movies: [
				{
					id: '/title/tt11311302/',
					image: { url:'https://m.media-amazon.com/images/M/MV5BZmYwZDA0ODEtYTc3Mi00ZTkxLWE1MzItYjc2NTNkZGY3ODc3XkEyXkFqcGdeQXVyNjUxMjc1OTM@._V1_.jpg' },
					title: 'Vikings: Valhalla',
					titleType: 'tvSeries',
					year: 2022
				},
				{
					id: '/title/tt6015100/',
					image: { url:'https://m.media-amazon.com/images/M/MV5BYjFhZjk5MjQtYWU1Ny00OGU2LWIwNWEtYjQ2ZGEwODNhMmJlL2ltYWdlXkEyXkFqcGdeQXVyNzIxMDI2NzM@._V1_.jpg' },
					title: 'Vikings Season 3: Heavy Is the Head -the Politics of King Ragnar\'s Rule',
					titleType: 'video',
					year: 2015
				},
				{
					id: '/title/tt4620502/',
					image: { url:'https://m.media-amazon.com/images/M/MV5BOWQ5N2Q2MWUtZTlmMC00YjI5LTgyOWQtNTA4NmY5MGQzM2EwL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTUwMTIyODg@._V1_.jpg' },
					title: 'Vikings: The Viking Sagas',
					titleType: 'video',
					year: 2014
				},
				{
					id: '/title/tt2306299/',
					image: { url:'https://m.media-amazon.com/images/M/MV5BODk4ZjU0NDUtYjdlOS00OTljLTgwZTUtYjkyZjk1NzExZGIzXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg' },
					title: 'Vikings',
					titleType: 'video',
					year: 2013
				}
			],
			initList: [],
			details: undefined
		},
		orderBy: 'date90',		
		saved: 0
	},
	methods: {
		toggleMode() {
			document.body.classList.toggle('light');
		},
		// title/get-video-playback
		// title/list-popular-genrestitle
		// title/get-more-like-this
		fetchHelper(ele, param = 'find?q=') {
			fetch("https://imdb8.p.rapidapi.com/title/"+param+ele, {
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "imdb8.p.rapidapi.com",
					// "x-rapidapi-key": "44619a653emsh4ddb6f918472355p1504d4jsn23552fba51b7"
					"x-rapidapi-key": "0905135359msh51384c9a3ea8141p160b7bjsnd25333f44851"
				}
			})
			.then(response => {
				response.json();				
				if (response.status === 429) {
					alert('Failed to recover data:\nAPI call limit exceeded.\n\nPlease try again at the end of the month!\nSorry for the inconvenience.');
				}
			})
			.catch(e => console.error(e))
			.then(data => {
				switch (param) {
					case 'get-most-popular-movies?homeCountry=IT&purchaseCountry=IT&currentCountry=IT':
						app.data.initList = data.slice(0, 45);
						break;
					case 'get-meta-data?':
						//console.log(data)
						app.data.movies = data
						//.sort((a, b) => b.year - a.year);
						break;
					case 'get-overview-details?tconst=':
						app.data.details = data;
						break;
					default:
						app.data.movies = data.results
							.filter(ele => ele.title != undefined && ele.image && ele.image.url != undefined)
							.sort((a, b) => b.year - a.year);
						break;
				}
			});
		},

		init() {
			this.query = '';
			this.fetchHelper('', 'get-most-popular-movies?homeCountry=IT&purchaseCountry=IT&currentCountry=IT');

			let initIdList = [];
			if(this.data.initList.length !== 0)
			this.data.initList.map(ele => {
				let id = 'tt' + ele.replace(/\D/g, '');
				return initList.concat('&ids='+id);
			})
			.join('')
			.substring(1);
			
			// this.fetchHelper(initIdList, 'get-meta-data?');
		},

		runQuery() {
			this.fetchHelper(this.query);
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
					nameMovie = e.target.id,
					li = document.createElement('li'),
					text = document.createTextNode(nameMovie);

			li.appendChild(text);
			savedMove.appendChild(li);

			this.saved = this.saved + 1;
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
					this.data.movies.sort((a, b) => b.year - a.year);
					break;
			}
		}
	}
});

//app.init();