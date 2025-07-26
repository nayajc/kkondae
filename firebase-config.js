// Firebase 설정 및 데이터베이스 연동
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyASDBlguSA9ucKzqg9NvZGwWGFs6wvtNQo",
    authDomain: "kkondae-73d39.firebaseapp.com",
    databaseURL: "https://kkondae-73d39-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kkondae-73d39",
    storageBucket: "kkondae-73d39.firebasestorage.app",
    messagingSenderId: "812673506222",
    appId: "1:812673506222:web:bcf71a5f414e1e2ad9463f",
    measurementId: "G-VR84THCS2Z"
};

// Firebase 초기화
let db = null;

// Firebase 초기화 함수
function initializeFirebase() {
    try {
        // Firebase가 이미 초기화되었는지 확인
        if (!firebase.apps.length) {
            firebase.initializeApp(FIREBASE_CONFIG);
        }
        
        // Realtime Database 인스턴스 생성
        db = firebase.database();
        
        console.log('Firebase Realtime Database 초기화 성공');
        return true;
    } catch (error) {
        console.error('Firebase 초기화 실패:', error);
        db = null;
        return false;
    }
}

// 페이지 로드 시 Firebase 초기화
document.addEventListener('DOMContentLoaded', function() {
    // Firebase SDK가 로드되었는지 확인
    if (typeof firebase !== 'undefined') {
        initializeFirebase();
    } else {
        console.warn('Firebase SDK가 로드되지 않았습니다.');
    }
});

// 결과 저장 함수 (Realtime Database)
async function saveResultToFirebase(nickname, score, resultType) {
    try {
        if (!db) {
            console.warn('Firebase가 초기화되지 않아 결과를 저장할 수 없습니다.');
            return { success: false, error: 'Firebase가 초기화되지 않았습니다.' };
        }

        const resultData = {
            nickname: nickname,
            score: score,
            resultType: resultType,
            timestamp: new Date().toISOString(),
            date: new Date().toISOString().split('T')[0]
        };

        // Realtime Database에 데이터 저장
        const newResultRef = db.ref('기록').push();
        await newResultRef.set(resultData);
        
        console.log('Firebase Realtime Database 결과 저장 성공:', newResultRef.key);
        return { success: true, id: newResultRef.key };
    } catch (error) {
        console.error('Firebase 결과 저장 실패:', error);
        return { success: false, error: error.message };
    }
}

// 랭킹 조회 함수 (Realtime Database)
async function getRankingsFromFirebase() {
    try {
        if (!db) {
            console.warn('Firebase가 초기화되지 않아 랭킹을 불러올 수 없습니다.');
            return { success: false, error: 'Firebase가 초기화되지 않았습니다.' };
        }

        // Realtime Database에서 데이터 조회
        const snapshot = await db.ref('기록').once('value');
        const data = snapshot.val();

        if (!data) {
            console.log('Firebase Realtime Database에 데이터가 없습니다.');
            return { success: true, rankings: [] };
        }

        // 최근 2주간의 데이터만 필터링
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14); // 14일 전부터
        const twoWeeksAgoStr = twoWeeksAgo.toISOString();

        // 데이터를 배열로 변환하고 최근 2주간 필터링
        const rankings = [];
        Object.keys(data).forEach(key => {
            const timestamp = data[key].timestamp;
            if (timestamp && new Date(timestamp) >= twoWeeksAgo) {
                rankings.push({
                    id: key,
                    nickname: data[key].nickname,
                    score: data[key].score,
                    resultType: data[key].resultType,
                    timestamp: data[key].timestamp,
                    date: data[key].date
                });
            }
        });

        // 꼰대일수록 높은 순위로 정렬 (같은 점수면 최신순)
        rankings.sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            return new Date(b.timestamp) - new Date(a.timestamp);
        });

        // 최근 15명만 반환
        const topRankings = rankings.slice(0, 15);

        console.log('Firebase Realtime Database 랭킹 조회 성공 (최근 2주간, 상위 15명):', topRankings.length + '개');
        return { success: true, rankings: topRankings };
    } catch (error) {
        console.error('Firebase 랭킹 조회 실패:', error);
        return { success: false, error: error.message };
    }
}

// 실시간 랭킹 업데이트 (선택사항)
function subscribeToRankings(callback) {
    if (!db) {
        console.error('Firebase가 초기화되지 않았습니다.');
        return null;
    }

    // 최근 2주간의 데이터만 필터링
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14); // 14일 전부터

    return db.collection('기록')
        .where('timestamp', '>=', twoWeeksAgo.toISOString())
        .orderBy('score', 'desc')
        .orderBy('timestamp', 'desc')
        .limit(15)
        .onSnapshot(snapshot => {
            const rankings = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                rankings.push({
                    id: doc.id,
                    nickname: data.nickname,
                    score: data.score,
                    resultType: data.resultType,
                    timestamp: data.timestamp,
                    date: data.date
                });
            });
            callback(rankings);
        }, error => {
            console.error('실시간 랭킹 구독 실패:', error);
        });
}

// Firebase 연결 상태 확인 (Realtime Database)
function checkFirebaseConnection() {
    if (!db) {
        console.warn('Firebase가 초기화되지 않았습니다.');
        return false;
    }
    
    // 간단한 연결 테스트
    return db.ref('기록').limitToFirst(1).once('value')
        .then((snapshot) => {
            console.log('Firebase Realtime Database 연결 성공');
            return true;
        })
        .catch((error) => {
            console.error('Firebase 연결 실패:', error.message);
            // 오프라인 모드로 계속 작동
            console.log('오프라인 모드로 계속 작동합니다.');
            return false;
        });
}

// 오프라인 지원 설정 (초기화 시 이미 처리됨)
function enableOfflineSupport() {
    console.log('오프라인 지원은 이미 초기화 시 활성화되었습니다.');
}

// 앱 시작 시 Firebase 설정
document.addEventListener('DOMContentLoaded', function() {
    // Firebase 초기화 후 연결 테스트
    setTimeout(() => {
        if (db) {
            checkFirebaseConnection();
        }
    }, 1000);
});