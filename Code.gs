// 꼰대 테스트 앱 - Apps Script 메인 코드
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('꼰대 테스트 🧐')
    .setFaviconUrl('https://cdn-icons-png.flaticon.com/512/3135/3135715.png');
}

// Firebase 설정
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyASDBlguSA9ucKzqg9NvZGwWGFs6wvtNQo",
  authDomain: "kkondae-73d39.firebaseapp.com",
  projectId: "kkondae-73d39",
  storageBucket: "kkondae-73d39.firebasestorage.app",
  messagingSenderId: "812673506222",
  appId: "1:812673506222:web:bcf71a5f414e1e2ad9463f",
  measurementId: "G-VR84THCS2Z"
};

// 결과 저장 함수
function saveResult(nickname, score, resultType) {
  try {
    const timestamp = new Date().toISOString();
    const data = {
      nickname: nickname,
      score: score,
      resultType: resultType,
      timestamp: timestamp
    };
    
    // Firebase에 데이터 저장 (클라이언트 사이드에서 처리)
    return { success: true, data: data };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// 랭킹 조회 함수
function getRankings() {
  try {
    // Firebase에서 랭킹 데이터 조회 (클라이언트 사이드에서 처리)
    return { success: true };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
} 