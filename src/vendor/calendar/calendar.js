let date = new Date(); // 현재 날짜와 시간을 가져옴
let viewYear = date.getFullYear(); // 현재 연도를 가져옴
let viewMonth = date.getMonth(); // 현재 월을 가져옴

const renderCalendar = () => {
  document.querySelector(".year-month").textContent = `${viewYear}년 ${
    viewMonth + 1
  }월`; // HTML 요소의 텍스트를 현재 연도와 월로 설정

  const prevLast = new Date(viewYear, viewMonth, 0); // 이전 달의 마지막 날짜를 가져옴
  const thisLast = new Date(viewYear, viewMonth + 1, 0); // 현재 달의 마지막 날짜를 가져옴

  const PLDate = prevLast.getDate(); // 이전 달의 마지막 날짜
  const PLDay = prevLast.getDay(); // 이전 달의 마지막 날짜의 요일

  const TLDate = thisLast.getDate(); // 현재 달의 마지막 날짜
  const TLDay = thisLast.getDay(); // 현재 달의 마지막 날짜의 요일

  const prevDates = []; // 이전 달의 날짜들을 저장할 배열
  const thisDates = [...Array(TLDate + 1).keys()].slice(1); // 현재 달의 날짜들을 저장할 배열
  const nextDates = []; // 다음 달의 날짜들을 저장할 배열

  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i); // 이전 달의 날짜들을 배열에 추가 (역순으로)
    }
  }

  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i); // 다음 달의 날짜들을 배열에 추가
  }

  const dates = prevDates.concat(thisDates, nextDates); // 이전 달, 현재 달, 다음 달의 날짜들을 합친 배열

  const firstDateIndex = dates.indexOf(1); // 첫 번째 날짜의 인덱스
  const lastDateIndex = dates.lastIndexOf(TLDate); // 마지막 날짜의 인덱스
  dates.forEach((date, i) => {
    const condition =
      i >= firstDateIndex && i < lastDateIndex + 1 ? "this" : "other"; // 현재 달의 날짜인지, 다른 달의 날짜인지 확인
    dates[
      i
    ] = `<div class="date"><span class="${condition}">${date}</span></div>`; // HTML 요소로 변환하여 배열에 저장
  });

  document.querySelector(".dates").innerHTML = dates.join(""); // HTML 요소로 변환된 날짜들을 출력

  const today = new Date(); // 오늘 날짜와 시간을 가져옴
  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (let date of document.querySelectorAll(".this")) {
      if (+date.innerText === today.getDate()) {
        date.classList.add("today"); // 오늘 날짜에 "today" 클래스 추가
        break;
      }
    }
  }
};

renderCalendar(); // 캘린더 렌더링 함수 호출

const prevMonth = () => {
  date.setDate(1); // 날짜를 1일로 설정
  date.setMonth(date.getMonth() - 1); // 이전 달로 설정
  viewYear = date.getFullYear(); // 연도 업데이트
  viewMonth = date.getMonth(); // 월 업데이트
  renderCalendar(); // 캘린더 렌더링 함수 호출
};

const nextMonth = () => {
  date.setDate(1); // 날짜를 1일로 설정
  date.setMonth(date.getMonth() + 1); // 다음 달로 설정
  viewYear = date.getFullYear(); // 연도 업데이트
  viewMonth = date.getMonth(); // 월 업데이트
  renderCalendar(); // 캘린더 렌더링 함수 호출
};

const goToday = () => {
  const today = new Date(); // 오늘 날짜와 시간을 가져옴
  date.setFullYear(today.getFullYear()); // 연도를 오늘 연도로 설정
  date.setMonth(today.getMonth()); // 월을 오늘 월로 설정
  date.setDate(today.getDate()); // 날짜를 오늘 날짜로 설정
  viewYear = today.getFullYear(); // 연도 업데이트
  viewMonth = today.getMonth(); // 월 업데이트
  renderCalendar(); // 캘린더 렌더링 함수 호출
};

const datesElement = document.querySelector(".dates"); // 날짜 요소를 선택
const modal = document.getElementById("modal"); // 모달 요소를 선택
const closeBtn = document.getElementById("close"); // 닫기 버튼 요소를 선택
const cancelBtn = document.getElementById("cancelBtn"); // 취소 버튼 요소를 선택
let selectedDate; // 선택된 날짜를 저장할 변수

datesElement.addEventListener("click", (e) => {
  if (e.target.classList.contains("date")) {
    selectedDate = e.target.textContent.trim(); // 선택된 날짜를 변수에 저장
    const eventDateField = document.getElementById("event-date"); // 이벤트 날짜 입력 필드를 선택
    eventDateField.value = `${viewYear}/${viewMonth + 1}/${selectedDate}`; // 이벤트 날짜 입력 필드에 선택된 날짜를 설정
    modal.style.display = "block"; // 모달 창을 보이도록 설정
  }
});

document
  .getElementById("event-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // 폼 제출에 따른 페이지 새로고침 방지

    var userInput = document.getElementById("event-description").value; // 사용자 입력값을 가져옴
    userInput = "ㆍ**" + userInput;

    // 사용자가 무언가를 입력했는지 확인
    if (userInput.trim() === "") {
      alert("입력 필드가 비어있습니다."); // 입력 필드가 비어있을 경우 알림 표시
      return;
    }
    // 사용자 입력값 콘솔에 출력
    console.log("calendar" + userInput);

    var scheduleList = document.getElementById("schedule-list"); // 스케줄 목록 요소 선택하기

    var scheduleItem = document.createElement("div"); // 새 div 요소 생성하기

       // 스케줄 항목에 줄바꿈과 들여쓰기 추가
    scheduleItem.innerHTML = `- ${viewYear}/${
      viewMonth + 1 
    }/${selectedDate}<br><div class="event-description">${userInput}</div>`; // div의 내용 설정하기

    // 스타일 클래스를 추가합니다.
    scheduleItem.classList.add("schedule-item");

    scheduleList.appendChild(scheduleItem); // 스케줄 목록에 새 아이템 추가하기

    modal.style.display = "none"; // 모달 창 닫기
    document.getElementById("event-description").value = ""; // 폼 제출 후 입력 필드 비우기
  });

cancelBtn.addEventListener("click", function (event) {
  modal.style.display = "none"; // 모달 창 닫기
  console.log(document.getElementById("cancelBtn").value);
  document.getElementById("event-description").value = ""; // 폼 제출 후 입력 필드 비우기
});












