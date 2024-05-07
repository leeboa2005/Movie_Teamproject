const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjVhY2I0YWI1YjY1MzRlYjlhMTY5MmI5MWFlNjQ5MiIsInN1YiI6IjY2Mjc1N2Q3MTk3ZGU0MDE3ZDJkNTU0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._21B2bQFep_OOlQFiZX23F8LcMguJbtnrZLuaRRFMbc",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {
    // 영화 데이터 처리
    displayMoviePosters(data.results);
    clone();
  });

const rollingMovieSlides = document.querySelector(".rolling_movie_slides");

// 포스터 생성
function displayMoviePosters(movies) {
  movies.forEach((movie) => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    rollingMovieSlides.insertAdjacentHTML(
      "beforeend",
      `<li>
  <a href="review.html?id=${movie.id}" target="_blank" aria-label="${movie.title} 리뷰 보기">
    <img src="${moviePosterUrl}" alt="${movie.title} 포스터">
    <h4 class="rolling_movie_slides-content">
      <span class="rolling_movie_slides_cta">리뷰 보기</span>
    </h4>
  </a>
</li>`
    );
  });
}

const rmPlayBtn = document.querySelector(".rm_stop_btn");
const rmStopBtn = document.querySelector(".rm_play_btn");
const rollingMovieWrap = document.querySelector(
  ".rolling_movie_slides_wrapper"
);

// rolling_movie_slides를 복사하는 기능
function clone() {
  const clone = rollingMovieSlides.cloneNode(true);
  rollingMovieWrap.appendChild(clone);

  rollingMovieSlides.offsetWidth + "px";

  rollingMovieSlides.classList.add("original");
  clone.classList.add("clone");
}

// 애니메이션 재생 기능
function animationRunning(run) {
  // 변수 추가해서 넣기
  const rmOriginal = document.querySelector(".rolling_movie_slides.original");
  const rmClone = document.querySelector(".rolling_movie_slides.clone");
  rmOriginal.style.WebkitAnimationPlayState = `${run}`;
  rmClone.style.WebkitAnimationPlayState = `${run}`;
}

// 애니메이션 정지 기능
function animationPaused(stp) {
  const rmOriginal = document.querySelector(".rolling_movie_slides.original");
  const rmClone = document.querySelector(".rolling_movie_slides.clone");
  rmOriginal.style.WebkitAnimationPlayState = `${stp}`;
  rmClone.style.WebkitAnimationPlayState = `${stp}`;
}

//클릭했을때 재생, 정지 이벤트
rmStopBtn.addEventListener("click", (e) => {
  e.preventDefault();
  animationRunning("running");
  rmStopBtn.classList.remove("active");
  rmPlayBtn.classList.add("active");
});

rmPlayBtn.addEventListener("click", (e) => {
  e.preventDefault();
  animationPaused("paused");
  rmPlayBtn.classList.remove("active");
  rmStopBtn.classList.add("active");
});

//마우스 오버했을때 재생, 정지 이벤트
rollingMovieWrap.addEventListener("mouseenter", () => {
  animationPaused("paused");
});

rollingMovieWrap.addEventListener("mouseleave", () => {
  if (rmPlayBtn.classList.contains("active")) {
    animationRunning("running");
  }
});
