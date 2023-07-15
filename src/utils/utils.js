import { SHORTS_DURATION } from './constants';

export function filterDuration(movies) {
  return movies.filter((movie) => movie.duration < SHORTS_DURATION);
}

export function filterMovies(movies, query) {
  const filteredMovies = movies.filter((movie) => {
    const userQuery = query.toLowerCase().trim();
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    return movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1;
  });
  return filteredMovies;
}

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  console.log(res);
  return Promise.reject(`Error: ${res.status}`);
};


