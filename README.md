# Vue Movies app

> My first Vue app!
Search Movies and Series. 

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Structure of the project](#structure-of-the-project)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [License](#license)

## Overview

Created entirely from scratch.

- Search for movies and TV series to watch
- Sort by different criteria
- Save the best in localStorage
- See details of movies saved
- Dark / light mode
- API data

### Screenshot

![Vue Movies app](https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/0f8401134138835.61d43ddbaa2d8.png)

### Links

- Live Site URL: [denielden.github.io/vue-movies-app](https://denielden.github.io/vue-movies-app/)
- XD project: [Behance](https://www.behance.net/gallery/134138835/Movies-App-with-darklight-mode)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- Vanilla Javascript ES6
- [Vue](https://vuejs.org/) - JS library
- Fetch API
- [RapidAPI](https://rapidapi.com/apidojo/api/imdb8/) - API data
- localStorage

### Structure of the project

Responsive design is handled with **Vanilla javascript**:
- below `800px` the sidebar is moved inside the navbar button
- when you go down `100px` in the film container, the scrool to Top button appears

**Vue** manages:
- dark-light mode change
- data recovery via `fetch`
- sorting of data according to different criteria
- the opening of the `modal` of the details of the film
- saving or removing saved movies
- various other helper methods

If `fetch` returns error **429**, fake test data will be shown, otherwise it will show the data of the call made, sorted by default in chronological order. The 50 most popular films of the moment are initially recovered.

The saving takes place on `localStorage` and through the page of the saved movies you can see the details of each movie by opening a modal and an `API` call made through the movie `id`.

I used the `callAPI` method for calling any **endpoint** and then handling the various cases via `switch`. The idea was to create a single helper with input parameters without repeating code for the different calls. 

Source data from `API` of [imdb8](https://rapidapi.com/apidojo/api/imdb8/) - RapidAPI. 


### What I learned

I improved my skills with `flexbox` and` overflow` and learned how to insert the icon into the search input via the `background` property.

I also learned how to move **DOM nodes** when the screen size changes:
```js
function mobileChange() {
  if (window.matchMedia('(max-width: 800px)').matches) {
    toMove.forEach(ele => newTarget.insertAdjacentElement('beforeend', ele));
  }
}
mobileChange();
window.addEventListener('resize', mobileChange);
```

I learned how to create dark-light mode and how to handle various **endpoints** in `fetch` calls.  
In particular, I was able to understand the **data** management process.  
I've been practicing search queries, using helper methods, and manipulating `objects`.

### Useful resources

- [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - Best Guide
- [RapidAPI](https://rapidapi.com/apidojo/api/imdb8/) - Source data movies

## Author

[Website](https://denielden.github.io/)  
[Github Profile](https://github.com/denielden/)

## License 
[MIT license](https://github.com/denielden/ToDo-app/blob/main/LICENSE)  
Vue is [MIT license](https://github.com/vuejs/vue/blob/dev/LICENSE)  
RapidAPI has different [pricing plans](https://rapidapi.com/apidojo/api/imdb8/pricing)