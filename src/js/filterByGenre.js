const getAllUniqueMoviesGenres = (movies) => {
  let allGenresList = movies
    .reduce((allGenres, movie) => {
        allGenres.push(...movie.genres);
        return allGenres;
    }, [])
    
    let uniqueGenresList = new Set(allGenresList);
    return Array.from(uniqueGenresList).sort();
};

export default getAllUniqueMoviesGenres;
