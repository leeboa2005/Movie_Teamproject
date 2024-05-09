# Team B.02 | Movie_Project
### * 프로젝트 소개
TMDB를 활용하여 바닐라 JS로 결과물을 온전히 만들며, 팀원들의 프로젝트 중 하나를 선정하여 팀프로젝트로 발전시킵니다. 

<br> 

### * 개발 기간
- 24.05.01 ~ 24.05.08

<br>

### * 기능

- #### 메인 페이지
  - 캐러셀 슬라이드를 클릭시 영화 예고편이 새로운 창에서 재생됩니다.
  - 카드로 나열된 영화 리스트에서 영화제목으로 검색이 가능합니다.
  - 자동으로 재생되어 오른쪽에서 왼쪽으로 이동하는 영화 리스트가 있습니다.
    - 포스터에 마우스를 올리면 재생이 멈추며, 클릭시 영화 상세페이지로 이동합니다.
  - 오늘의 날씨가 어떤지 이미지를 통해 알 수 있습니다.
  - 하단의 광고 배너를 통해 이벤트나 개봉예정일을 알 수 있습니다.
  - 반응형으로 구현되어 작은크기의 화면에서도 일정한 비율이 유지됩니다.
<br>

- #### 상세 페이지
  - 영화 포스터와 개요, 평점, 비슷한 장르의 영화추천 섹션과 리뷰작성 및 작성된 리뷰리스트가 보이는 섹션으로 크게 2가지 구성입니다.
  - 비슷한 장르의 영화가 많을경우 `>` 클릭시 옆으로 이동하여 다음 추천영화를 확인할 수 있습니다.
  - 추천 영화 클릭시 해당 영화의 상세페이지로 이동합니다.
  - 영화 리뷰를 작성할 수 있으며, 수정 및 삭제가 가능합니다.
  - 리뷰 작성시 8글자 이상, 알파벳 대문자를 포함하는 비밀번호에 대한 유효성 검사를 진행합니다.
  - 반응형으로 구현되어 작은크기의 화면에서도 일정한 비율이 유지됩니다.

  <br>
 ---
  ### * 초기 계획한 파일 구조
![result_Mind Map Curved Right (5)](https://github.com/yeseul0809/Movie_Teamproject/assets/71476841/71673b9c-0d75-40f9-bdc5-7497e7673fc0)
![result_Mind Map Curved Right (4)](https://github.com/yeseul0809/Movie_Teamproject/assets/71476841/db6cdfdd-f827-45c1-a213-18920e44594d)

 ---
### * 와이어프레임
- 메인페이지

<img src="https://github.com/yeseul0809/Movie_Teamproject/assets/166012944/4d4d4f7e-825a-4276-9660-afe18ee0cf08" width="30%"><img >
 ---
- 상세페이지
 
<img src="https://github.com/yeseul0809/Movie_Teamproject/assets/166012944/cde9594b-ebff-49cd-89c3-0aa85a814c39" width="30%"><img >

 ---
<br>

### * 폴더구조
```
📦 
├─ .vscode
│  └─ settings.json
├─ README.md
├─ img
│  ├─ favicons
│  │  └─ favicon.png
│  └─ main
│     ├─ AbigailBanner_large.jpg
│     ├─ AbigailBanner_medium.jpg
│     ├─ AbigailBanner_small.jpg
│     ├─ AbigailBanner_xsmall.jpg
│     ├─ cloud_weather.PNG
│     ├─ footer_facebook_icon.png
│     ├─ footer_instagram_icon.png
│     ├─ footer_logo.png
│     ├─ footer_youtube_icon.png
│     ├─ header_logo.png
│     ├─ sunnyday_weather.PNG
│     └─ windy_weather.png
├─ index.html
├─ modules
│  ├─ apiData.js
│  ├─ common.js
│  ├─ display.js
│  ├─ main.js
│  ├─ mainSlide.js
│  ├─ review.js
│  ├─ rolling_slider.js
│  ├─ weather.js
│  └─ youtube.js
├─ review.html
└─ style
   ├─ common.css
   ├─ main.css
   ├─ reset.css
   └─ review.css
```
<br>

### * 함께한 팀원과 역할
- 한예슬 : 조장 / 상세페이지 리뷰작성기능구현 및 CSS
- 강희진 : 메인페이지 캐러셀 예고편 기능구현 및 상세페이지 영화추천 기능구현 / 모듈화
- 이보아 : 메인페이지 슬라이드 기능구현 및 전반적인 레이아웃, 디자인
- 김연희 : 현재날씨에 따른 이미지변화 기능구현, 발표
- 이수진 : git 학습, 초기 HTML 구조
- 이승빈 : HTML, CSS 학습


