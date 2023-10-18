document
  .getElementById("event-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // 폼 제출에 따른 페이지 새로고침 방지

    var eventDescription = document.getElementById("event-description").value; // 일정 내용 가져오기

    console.log("schedule"+eventDescription)

    if (eventDescription.trim() === "") {
      alert("일정 내용을 입력하세요."); // 알림 메시지 표시
      return; // 함수 실행 종료
    }

    modal.style.display = "none"; // 모달 창 닫기

    var newScheduleItem = document.createElement("div");
    newScheduleItem.className = "scheduleItem";

    var dateElement = document.createElement("div");
    dateElement.className = "date";
    dateElement.textContent = `날짜: ${selectedDate}`;

    var descriptionElement = document.createElement("div");
    descriptionElement.className = "description";
    descriptionElement.textContent = `일정 내용: ${eventDescription}`;

    newScheduleItem.appendChild(dateElement);
    newScheduleItem.appendChild(descriptionElement);

    var scheduleCalendar = document.getElementById("scheduleCalendar");
    scheduleCalendar.appendChild(newScheduleItem);

    // Clear the input field after form submission
    document.getElementById("event-description").value = "";
  });
