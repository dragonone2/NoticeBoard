// Date 객체 생성
let date = new Date();

const renderCalendar = () => {
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();
  // year-month 채우기
  document.querySelector(".year-month").textContent = `${viewYear}년 ${
    viewMonth + 1
  }월`;

  // 지난 달 마지막 Date, 이번 달 마지막 Date
  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0);

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

  // Dates 기본 배열들
  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];

  // prevDates 계산
  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }

  // nextDates 계산
  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  // Dates 합치기
  const dates = prevDates.concat(thisDates, nextDates);

  // Dates 정리
  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(TLDate);
  dates.forEach((date, i) => {
    const condition =
      i >= firstDateIndex && i < lastDateIndex + 1 ? "this" : "other";

    dates[
      i
    ] = `<div class="date"><span class="${condition}">${date}</span></div>`;
  });

  // Dates 그리기
  document.querySelector(".dates").innerHTML = dates.join("");

  // 오늘 날짜 그리기
  const today = new Date();
  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (let date of document.querySelectorAll(".this")) {
      if (+date.innerText === today.getDate()) {
        date.classList.add("today");
        break;
      }
    }
  }
};

renderCalendar();

const prevMonth = () => {
  date.setDate(1);
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
};

const nextMonth = () => {
  date.setDate(1);
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
};

const goToday = () => {
  date = new Date();
  renderCalendar();
};

// Modal

const datesElement = document.querySelector(".dates");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");
const cancelBtn = document.getElementById("cancel");
let selectedDate;

// When the user clicks on a date, open the modal and populate the date field
datesElement.addEventListener("click", (e) => {
  if (e.target.classList.contains("date")) {
    selectedDate = e.target.textContent.trim();
    const eventDateField = document.getElementById("event-date");
    eventDateField.value = `${viewYear}/${viewMonth + 1}/${selectedDate}`;
    modal.style.display = "block";
  }
});

// When the user clicks on x, close the modal
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks on cancel button, close the modal
cancelBtn.onclick = function () {
  modal.style.display = "none";
};

// Save Event Information Here (You can replace this with your own logic)
document.getElementById("event-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const eventDescription = document.getElementById("event-description").value;
  console.log(`Date: ${selectedDate}, Event: ${eventDescription}`);
});
