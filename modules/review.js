import fetchMoviesData from "./apiData.js";

const url = new URLSearchParams(window.location.search);
const movieId = url.get("id");

async function getData() {
  try {
    const data = await fetchMoviesData(movieId);

    makeDesc(data);
  } catch (error) {
    console.error(error);
  }
}
async function getMoviesData() {
  try {
    const data = await fetchMoviesData("top_rated");

    let filterMovies = getFilteredMoviesData(data);
    makeRelatedMovies(filterMovies);
  } catch (error) {
    console.error(error);
  }
}
getData();
getMoviesData();

function makeDesc(data) {
  document.querySelector(
    "#movie-poster"
  ).style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${data.poster_path})`;
  document.getElementById("movie-title").textContent = data.title;
  document.getElementById("movie-description").textContent = data.overview;
  document.getElementById(
    "movie-rating"
  ).textContent = `Rating : ${data.vote_average}`;
}

function getFilteredMoviesData(data) {
  let relatedMovies = [];

  const currentMovie = data.results.filter(
    (item) => item.id === Number(movieId)
  )[0];

  let genreIdsArr = data.results.map((movie) => {
    return movie.genre_ids;
  });

  genreIdsArr.forEach((movie, index) => {
    let count = 0;
    currentMovie.genre_ids.forEach((item) => {
      movie.includes(item) ? count++ : null;
    });
    count >= 2 && relatedMovies.push(data.results[index]);
  });

  let filterMovies = relatedMovies.filter(
    (item) => item.id !== currentMovie.id
  );

  return filterMovies;
}

const noRelatedWarning = document.querySelector(".noRelatedWarning");

function makeRelatedMovies(filterMovies) {
  if (filterMovies.length === 0) {
    noRelatedWarning.classList.remove("hidden");
  }
  const recommendList = document.querySelector("#recommend-list");
  filterMovies.forEach((movie) => {
    const list = document.createElement("li");
    list.classList.add("relatedList");
    list.innerHTML = `<img src="https://image.tmdb.org/t/p/w200/${movie.poster_path}" alt="${movie.title}">`;
    recommendList.appendChild(list);

    list.addEventListener("click", () => {
      window.location.href = `review.html?id=${movie.id}`;
    });
  });
}

// 리뷰 관련 기능
const reviewForm = document.getElementById("review-form");
const reviewList = document.getElementById("review-list");

// 로컬 스토리지에서 리뷰 데이터 가져오기
let reviews = JSON.parse(localStorage.getItem("reviews")) || {};
reviews[movieId] = reviews[movieId] || []; //리뷰데이터 초기화

displayReviews(movieId);

// 리뷰 작성 및 저장
reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const reviewText = document.getElementById("review-text").value.trim(); //공백 제거 후 입력값 할당.
  const reviewPassword = document
    .getElementById("review-password")
    .value.trim();

  // 비밀번호 입력 확인
  if (!reviewPassword) {
    Swal.fire({
      text: "비밀번호를 영어 대문자를 포함하여 8자 이상 작성해주세요.",
      icon: "warning",
      confirmButtonColor: "gray",
    });
    return;
  }

  // 비밀번호 유효성 검사
  if (reviewPassword.length < 8 || !/[A-Z]/.test(reviewPassword)) {
    Swal.fire({
      text: "비밀번호는 영어 대문자를 포함하여 8자 이상 작성해야합니다.",
      icon: "warning",
      confirmButtonColor: "gray",
    });
    return;
  }

  // 리뷰와 비밀번호 둘다 작성한경우
  if (reviewText && reviewPassword) {
    const newReview = {
      text: reviewText,
      timestamp: new Date().toLocaleString(),
      password: reviewPassword,
    };
    reviews[movieId].push(newReview); //ID별 새로운 리뷰데이터 추가
    localStorage.setItem("reviews", JSON.stringify(reviews));

    document.getElementById("review-text").value = "";
    document.getElementById("review-password").value = "";
    displayReviews(movieId);
  }
});

// 리뷰 목록 표시
function displayReviews(movieId) {
  reviewList.innerHTML = "";
  reviews[movieId].forEach((review, index) => {
    const reviewItem = document.createElement("li");
    reviewItem.classList.add("review_wrap");
    reviewItem.innerHTML = `<div>${review.text} (${review.timestamp})</div>`;
    reviewList.appendChild(reviewItem);

    const buttonWrap = document.createElement("div");
    buttonWrap.classList.add("review_btn_wrap");
    reviewItem.appendChild(buttonWrap);

    //수정 버튼 추가
    const editButton = document.createElement("button");
    editButton.textContent = "Modify";
    editButton.addEventListener("click", () => editReview(movieId, index)); // 클릭시 리뷰 수정 함수 호출
    buttonWrap.appendChild(editButton);

    //삭제 버튼 추가
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteReview(movieId, index)); // 클릭시 리뷰 삭제 함수 호출
    buttonWrap.appendChild(deleteButton);

    reviewList.appendChild(reviewItem);
  });
}

// 리뷰 수정
function editReview(movieId, index) {
  Swal.fire({
    title: "비밀번호를 입력하세요",
    input: "password",
    showCancelButton: true,
    confirmButtonText: "확인",
    cancelButtonText: "취소",
    cancelButtonColor: "gray",

    //확인 버튼 클릭시 실행
    preConfirm: (password) => {
      if (password === reviews[movieId][index].password) {
        return Swal.fire({
          title: "수정할 리뷰를 입력하세요",
          input: "textarea",
          inputValue: reviews[movieId][index].text,
          showCancelButton: true,
          confirmButtonText: "저장",
          cancelButtonText: "취소",
          preConfirm: (newText) => {
            if (newText != null) {
              reviews[movieId][index].text = newText;
              localStorage.setItem("reviews", JSON.stringify(reviews));
              displayReviews(movieId);
              Swal.fire("수정완료", "리뷰가 수정되었습니다.", "success");
            }
          },
        });
      } else {
        Swal.fire({
          text: "비밀번호가 일치하지 않습니다.",
          icon: "error",
          confirmButtonColor: "gray",
        });
      }
    },
  });
}

// 리뷰 삭제
function deleteReview(movieId, index) {
  Swal.fire({
    title: "비밀번호를 입력하세요",
    input: "password",
    showCancelButton: true,
    confirmButtonColor: "red",
    cancelButtonColor: "gray",
    cancelButtonText: "취소",
    confirmButtonText: "확인",
    preConfirm: (password) => {
      if (password === reviews[movieId][index].password) {
        reviews[movieId].splice(index, 1);
        localStorage.setItem("reviews", JSON.stringify(reviews));
        displayReviews(movieId);
        Swal.fire("삭제완료", "리뷰가 삭제되었습니다.", "success");
      } else {
        Swal.fire({
          text: "비밀번호가 일치하지 않습니다.",
          icon: "error",
          confirmButtonColor: "gray",
        });
      }
    },
  });
}

const prevRelateBtn = document.querySelector(".relatePrevBtn");
const nextRelateBtn = document.querySelector(".relateNextBtn");
const relateWrap = document.querySelector("#recommend-list");

let current = 0;

function moveRelateSlide(direction) {
  const relateSlide = document.querySelector(".relatedList");
  const slideWidth = relateSlide?.offsetWidth;
  let newLeft = current;

  if (direction === 1) {
    newLeft -= slideWidth + 5;
  } else if (direction === -1) {
    newLeft += slideWidth + 5;
  }

  const maxLeft = 0;
  const minLeft = -(relateWrap.children.length - 1) * slideWidth;
  if (newLeft > maxLeft) {
    newLeft = maxLeft;
  } else if (newLeft < minLeft) {
    newLeft = minLeft;
  }

  relateWrap.style.transition = "300ms";
  relateWrap.style.left = `${newLeft}px`;

  current = newLeft;
}

prevRelateBtn.addEventListener("click", () => moveRelateSlide(-1));
nextRelateBtn.addEventListener("click", () => moveRelateSlide(1));
