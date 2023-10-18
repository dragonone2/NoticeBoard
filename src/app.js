import { getDatabase, ref, get, onValue } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
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

const db = getDatabase();

// Firebase Realtime Database에서 모든 데이터 가져오기
const noticesRef = ref(db, 'notices'); // 'notices'는 데이터베이스 경로입니다

onValue(noticesRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        for (const uid in data) {
            const noticeData = data[uid];
            const { title, author, datetime, content } = noticeData;

            // 가져온 데이터를 HTML에 표시
            const noticeList = document.getElementById('noticeList');
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${title}</td>
                <td>${author}</td>
                <td>${datetime}</td>
                <td>${content}</td>
            `;
            noticeList.appendChild(row);
        }
    } else {
        console.error('데이터를 찾을 수 없습니다.');
    }
});
