// 로컬 스토리지를 사용한 데이터 저장 (Firebase 대안)
class LocalStorageManager {
    constructor() {
        this.storageKey = 'kkondae_test_results';
        this.rankingsKey = 'kkondae_rankings';
    }

    // 결과 저장
    async saveResult(nickname, score, resultType) {
        try {
            const resultData = {
                id: Date.now().toString(),
                nickname: nickname,
                score: score,
                resultType: resultType,
                timestamp: new Date().toISOString(),
                date: new Date().toISOString().split('T')[0]
            };

            // 기존 결과 가져오기
            const existingResults = this.getResults();
            existingResults.push(resultData);

            // 로컬 스토리지에 저장
            localStorage.setItem(this.storageKey, JSON.stringify(existingResults));
            
            console.log('로컬 스토리지에 결과 저장 성공:', resultData.id);
            return { success: true, id: resultData.id };
        } catch (error) {
            console.error('로컬 스토리지 저장 실패:', error);
            return { success: false, error: error.message };
        }
    }

    // 랭킹 조회
    async getRankings() {
        try {
            const results = this.getResults();
            
            // 최근 2주간의 데이터만 필터링
            const twoWeeksAgo = new Date();
            twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14); // 14일 전부터
            
            const recentResults = results.filter(result => {
                const timestamp = result.timestamp;
                return timestamp && new Date(timestamp) >= twoWeeksAgo;
            });
            
            // 점수순으로 정렬 (꼰대일수록 높은 순위)
            const sortedResults = recentResults.sort((a, b) => {
                if (b.score !== a.score) {
                    return b.score - a.score;
                }
                // 같은 점수면 최신순
                return new Date(b.timestamp) - new Date(a.timestamp);
            });

            // 최근 15명만 반환
            const topResults = sortedResults.slice(0, 15);
            
            console.log('로컬 스토리지에서 랭킹 조회 성공 (최근 2주간, 상위 15명):', topResults.length + '개');
            return { success: true, rankings: topResults };
        } catch (error) {
            console.error('로컬 스토리지 랭킹 조회 실패:', error);
            return { success: false, error: error.message };
        }
    }

    // 모든 결과 가져오기
    getResults() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('로컬 스토리지 읽기 실패:', error);
            return [];
        }
    }

    // 결과 삭제 (테스트용)
    clearResults() {
        try {
            localStorage.removeItem(this.storageKey);
            console.log('로컬 스토리지 결과 삭제 완료');
            return { success: true };
        } catch (error) {
            console.error('로컬 스토리지 삭제 실패:', error);
            return { success: false, error: error.message };
        }
    }

    // 스토리지 사용량 확인
    getStorageUsage() {
        try {
            const results = this.getResults();
            const dataSize = JSON.stringify(results).length;
            const maxSize = 5 * 1024 * 1024; // 5MB 제한
            
            return {
                currentSize: dataSize,
                maxSize: maxSize,
                usagePercent: (dataSize / maxSize) * 100
            };
        } catch (error) {
            console.error('스토리지 사용량 확인 실패:', error);
            return null;
        }
    }
}

// 전역 인스턴스 생성
const localStorageManager = new LocalStorageManager();

// Firebase 함수와 호환되는 래퍼 함수들
async function saveResultToLocalStorage(nickname, score, resultType) {
    return await localStorageManager.saveResult(nickname, score, resultType);
}

async function getRankingsFromLocalStorage() {
    return await localStorageManager.getRankings();
}

// Firebase 우선 사용, 실패 시에만 로컬 스토리지 사용
async function saveResultWithFallback(nickname, score, resultType) {
    // Firebase 우선 시도
    if (db) {
        try {
            console.log('Firebase에 결과 저장 시도 중...');
            const result = await saveResultToFirebase(nickname, score, resultType);
            if (result.success) {
                console.log('Firebase 저장 성공');
                return result;
            } else {
                console.warn('Firebase 저장 실패:', result.error);
            }
        } catch (error) {
            console.warn('Firebase 저장 중 오류, 로컬 스토리지로 폴백:', error.message);
        }
    } else {
        console.warn('Firebase가 초기화되지 않음, 로컬 스토리지 사용');
    }
    
    // Firebase 실패 시에만 로컬 스토리지 사용
    console.log('로컬 스토리지에 결과 저장 중...');
    return await saveResultToLocalStorage(nickname, score, resultType);
}

async function getRankingsWithFallback() {
    // Firebase 우선 시도
    if (db) {
        try {
            console.log('Firebase에서 랭킹 조회 시도 중...');
            const result = await getRankingsFromFirebase();
            if (result.success) {
                console.log('Firebase 랭킹 조회 성공');
                return result;
            } else {
                console.warn('Firebase 랭킹 조회 실패:', result.error);
            }
        } catch (error) {
            console.warn('Firebase 랭킹 조회 중 오류, 로컬 스토리지로 폴백:', error.message);
        }
    } else {
        console.warn('Firebase가 초기화되지 않음, 로컬 스토리지 사용');
    }
    
    // Firebase 실패 시에만 로컬 스토리지 사용
    console.log('로컬 스토리지에서 랭킹 조회 중...');
    return await getRankingsFromLocalStorage();
} 