import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
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

// 폼 제출 시 Firebase에 데이터 추가
document.getElementById('assignmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const datetime = document.getElementById('datetime').value;
    const content = document.getElementById('content').value;

    const newAssignment = {
        title: title,
        author: author,
        datetime: datetime,
        content: content
    };

    // Firebase에 데이터 추가
    push(assignmentRef, newAssignment)
        .then(() => {
            alert('과제가 성공적으로 등록되었습니다.');
            // 폼 초기화
            document.getElementById('assignmentForm').reset();
        })
        .catch((error) => {
            console.error('과제 등록 중 오류 발생: ', error);
        });
});
