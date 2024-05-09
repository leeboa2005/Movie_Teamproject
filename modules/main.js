import { displayMatchingMovies, displayMovies } from './display.js';
import fetchMoviesData from './apiData.js';

async function getData() {
  try {
    const data = await fetchMoviesData('top_rated');
    const moviesData = data.results;

    displayMovies(moviesData); // 영화 목록을 먼저 보여주는 함수 호출

    let searchButton = document.getElementById('searchButton'); // 검색 버튼
    searchButton.addEventListener('click', () => {
      let searchInput = document
        .getElementById('movieSearch')
        .value.toLowerCase(); // 사용자 입력값 알파벳 소문자순으로
      displayMatchingMovies(moviesData, searchInput); // 입력값과 일치하는 영화만 보여주는 함수 호출

      // form 요소에 keypress 이벤트 리스너 추가
      let searchForm = document.getElementById('searchForm');
      searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let searchInput = document
          .getElementById('movieSearch')
          .value.toLowerCase();
        displayMatchingMovies(moviesData, searchInput);
      });
    });
  } catch (error) {
    console.error(error);
  }
}
getData();

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.noticeItem');
  let index = 0;

  if (items.length > 0) {
    items[index].classList.add('noticeVisible');
  }

  const showNextItem = () => {
    items[index].classList.remove('noticeVisible');

    index = (index + 1) % items.length;

    items[index].classList.add('noticeVisible');
  };

  setInterval(showNextItem, 5000);
});
