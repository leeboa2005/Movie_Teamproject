export { displayMovies, displayMatchingMovies };

// 영화 목록 먼저 보여주는 함수
function displayMovies(movies) {
  const cardsGroup = document.getElementById("cardsGroup");
  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
            <h2>${movie.title}</h2>
            <p>${movie.overview}</p>
            <p>Rating : ${movie.vote_average}</p>
        `;

    card.addEventListener("click", () => {
      Swal.fire({
        title: `Movie ID : ${movie.id}`,
        text: "ENJOY MOVIE SEARCHING!",
        imageUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        imageAlt: movie.title,
        confirmButtonColor: "rgb(203, 34, 34)",
      });
      window.location.href = `review.html?id=${movie.id}`;
    });

    cardsGroup.appendChild(card);
  });
}

// 입력받은 문자와 영화제목 일치하면 보여주는 함수
function displayMatchingMovies(movies, searchInput) {
  const cardsGroup = document.getElementById("cardsGroup");
  cardsGroup.innerHTML = ""; // 이전에 보여줬던 카드들을 모두 지움
  movies.forEach((movie) => {
    if (movie.title.toLowerCase().includes(searchInput)) {
      // 문자 포함하고있는지 확인
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
                <h2>${movie.title}</h2>
                <p>${movie.overview}</p>
                <p>Rating : ${movie.vote_average}</p>
            `;

      card.addEventListener("click", () => {
        Swal.fire({
          title: `Movie ID : ${movie.id}`,
          text: "ENJOY MOVIE SEARCHING!",
          imageUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
          imageAlt: movie.title,
          confirmButtonColor: "rgb(203, 34, 34)",
        });
        window.location.href = `review.html?id=${movie.id}`;
      });

      cardsGroup.appendChild(card);
    }
  });
}
