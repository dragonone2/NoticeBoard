import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

    // Firebase 설정
    const firebaseConfig = {
      apiKey: "AIzaSyBzMk-tFPzjkxTNRqBCmHBi8CKZpT8-VBk",
      authDomain: "noticetest-f3142.firebaseapp.com",
      projectId: "noticetest-f3142",
      storageBucket: "noticetest-f3142.appspot.com",
      messagingSenderId: "797062143332",
      appId: "1:797062143332:web:dcec5ff8441640529bae71"
    };

    // Firebase 초기화
    const app = initializeApp(firebaseConfig);

    // Firebase Realtime Database 참조 생성
    const db = getDatabase();
    const assignmentRef = ref(db, 'assignment');
    const noticeRef = ref(db, 'notice');
    const anonymousRef = ref(db, 'anonymous');

    // DB 입력 폼
    document.getElementById('anonymousForm').addEventListener('submit', function (event) {
      event.preventDefault();

      const title = document.getElementById('anonymousTitle').value;
      const content = document.getElementById('anonymousContent').value;

      const newAnonymous = {
        title: title,
        content: content
      };

      // Firebase에 데이터 추가
      push(anonymousRef, newAnonymous)
        .then(() => {
          alert('과제가 성공적으로 등록되었습니다.');
          // 폼 초기화
          document.getElementById('anonymousForm').reset();
        })
        .catch((error) => {
          console.error('과제 등록 중 오류 발생: ', error);
        });
    });

    // 함수를 사용하여 데이터를 표에 추가
    function addDataToTable(data, tableId) {
      const dataContainer = document.getElementById(tableId);
      dataContainer.innerHTML = ''; // 기존 내용 지우기

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const rowData = data[key];
          const row = document.createElement('tr');
          if (tableId === 'anonymousData') {
            row.innerHTML = `
                          <td>${rowData.title}</td>
                          <td>${rowData.content}</td>
                      `;
          } else {
            row.innerHTML = `
                          <td>${rowData.title}</td>
                          <td>${rowData.author}</td>
                          <td>${rowData.datetime}</td>
                          <td>${rowData.content}</td>
                      `;
          }
          dataContainer.appendChild(row);

          if (tableId === 'assignmentData') {
            // 공지사항 제목을 assignmentTitle 요소에 설정
            document.getElementById('assignmentTitle').textContent = rowData.title;
          }
        }
      }
    }

    onValue(assignmentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        addDataToTable(data, 'assignmentData');
      } else {
        console.log('Assignment 데이터가 없습니다.');
      }
    });

    onValue(noticeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        addDataToTable(data, 'noticeData');
      } else {
        console.log('Notice 데이터가 없습니다.');
      }
    });

    onValue(anonymousRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        addDataToTable(data, 'anonymousData');
      } else {
        console.log('anonymous 데이터가 없습니다.');
      }
    });

    document.getElementById('openAnonymousModal').addEventListener('click', function () {
      // 모달 열기
      const modal = new bootstrap.Modal(document.getElementById('anonymous1'));
      modal.show();
    });