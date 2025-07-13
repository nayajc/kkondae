// 꼰대 테스트 앱 메인 로직
class KkondaeTest {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.nickname = '';
        this.answers = [];
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateProgress();
    }

    bindEvents() {
        // 시작 화면 이벤트
        const nicknameInput = document.getElementById('nickname');
        const startBtn = document.getElementById('startBtn');

        nicknameInput.addEventListener('input', (e) => {
            this.nickname = e.target.value.trim();
            startBtn.disabled = this.nickname.length === 0;
        });

        startBtn.addEventListener('click', () => {
            if (this.nickname) {
                this.startTest();
            }
        });

        // 테스트 화면 이벤트
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const score = parseInt(e.target.closest('.option-btn').dataset.score);
                this.selectAnswer(score, e);
            });
        });

        // 결과 화면 이벤트
        document.getElementById('shareBtn').addEventListener('click', () => {
            this.shareToKakao();
        });

        document.getElementById('rankingBtn').addEventListener('click', () => {
            this.showRankings();
        });

        document.getElementById('retryBtn').addEventListener('click', () => {
            this.resetTest();
        });

        // 랭킹 화면 이벤트
        document.getElementById('backToResultBtn').addEventListener('click', () => {
            this.showScreen('resultScreen');
        });

        // Enter 키로 테스트 시작
        nicknameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && this.nickname) {
                this.startTest();
            }
        });
    }

    startTest() {
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        this.showScreen('testScreen');
        this.loadQuestion();
    }

    loadQuestion() {
        console.log('현재 질문:', this.currentQuestion, '총 질문 수:', QUESTIONS.length);
        
        if (this.currentQuestion >= QUESTIONS.length) {
            console.log('모든 질문 완료, 결과 화면으로 이동');
            this.showResult();
            return;
        }

        const question = QUESTIONS[this.currentQuestion];
        document.querySelector('.question-text').textContent = question.question;
        
        const options = document.querySelectorAll('.option-btn');
        options.forEach((option, index) => {
            option.querySelector('.option-text').textContent = question.options[index].text;
            option.dataset.score = question.options[index].score;
            option.classList.remove('selected');
        });

        this.updateProgress();
    }

    selectAnswer(score, event) {
        console.log('답변 선택:', score, '현재 점수:', this.score);
        
        this.score += score;
        this.answers.push({
            questionId: this.currentQuestion + 1,
            score: score
        });

        // 선택된 버튼 시각적 피드백
        const selectedBtn = event.target.closest('.option-btn');
        selectedBtn.classList.add('selected');

        // 잠시 후 다음 질문으로
        setTimeout(() => {
            this.currentQuestion++;
            console.log('다음 질문으로 이동:', this.currentQuestion);
            this.loadQuestion();
        }, 500);
    }

    updateProgress() {
        const progress = (this.currentQuestion / QUESTIONS.length) * 100;
        document.querySelector('.progress-fill').style.width = `${progress}%`;
        document.querySelector('.progress-text').textContent = `${this.currentQuestion + 1} / ${QUESTIONS.length}`;
    }

    async showResult() {
        const resultType = getResultType(this.score);
        
        // 결과 화면 업데이트
        document.querySelector('.result-title').textContent = resultType.name;
        document.querySelector('.result-emoji').textContent = resultType.emoji;
        document.querySelector('.score-value').textContent = this.score;
        document.querySelector('.result-description').textContent = resultType.description;

        // Firebase에 결과 저장 (실패 시 로컬 스토리지로 폴백)
        try {
            const saveResult = await saveResultWithFallback(this.nickname, this.score, resultType.name);
            if (!saveResult.success) {
                console.warn('결과 저장 실패:', saveResult.error);
            } else {
                console.log('결과 저장 성공:', saveResult.id);
            }
        } catch (error) {
            console.error('결과 저장 중 오류:', error);
        }

        this.showScreen('resultScreen');
    }

    async showRankings() {
        this.showScreen('rankingScreen');
        
        const rankingList = document.querySelector('.ranking-list');
        rankingList.innerHTML = '<div class="loading">랭킹을 불러오는 중...</div>';

        try {
            const result = await getRankingsWithFallback();
            if (result.success) {
                this.displayRankings(result.rankings);
            } else {
                rankingList.innerHTML = '<div class="error">랭킹을 불러올 수 없습니다. 다시 시도해주세요.</div>';
            }
        } catch (error) {
            console.error('랭킹 조회 오류:', error);
            rankingList.innerHTML = '<div class="error">랭킹을 불러올 수 없습니다. 다시 시도해주세요.</div>';
        }
    }

    displayRankings(rankings) {
        const rankingList = document.querySelector('.ranking-list');
        
        if (rankings.length === 0) {
            rankingList.innerHTML = '<div class="no-data">아직 테스트를 완료한 사람이 없습니다.</div>';
            return;
        }

        let html = '';
        let currentRank = 1;
        let currentScore = rankings[0].score;

        rankings.forEach((item, index) => {
            // 같은 점수면 같은 순위
            if (index > 0 && item.score < currentScore) {
                currentRank = index + 1;
                currentScore = item.score;
            }

            const isTop3 = currentRank <= 3;
            const rankClass = isTop3 ? 'ranking-item top3' : 'ranking-item';
            
            html += `
                <div class="${rankClass}">
                    <div class="rank-number">${currentRank}</div>
                    <div class="rank-info">
                        <div class="rank-nickname">${item.nickname}</div>
                        <div class="rank-score">${item.resultType} (${item.score}점)</div>
                    </div>
                </div>
            `;
        });

        rankingList.innerHTML = html;
    }

    shareToKakao() {
        const resultType = getResultType(this.score);
        const shareText = `🧐 꼰대 테스트 결과\n\n${this.nickname}님은 "${resultType.name}"입니다!\n꼰대 점수: ${this.score}/15점\n\n나도 테스트해보세요! 😄\n\n${window.location.href}`;
        
        // 카카오톡 인앱 브라우저 감지
        const isKakaoInApp = /KAKAOTALK/i.test(navigator.userAgent);
        const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isKakaoInApp) {
            // 카카오톡 인앱 브라우저에서는 클립보드 복사 후 안내
            this.copyToClipboard(shareText);
            alert('공유 텍스트가 복사되었습니다!\n카카오톡 채팅창에 붙여넣기 해주세요.');
        } else if (isMobile) {
            // 일반 모바일 브라우저: 카카오톡 앱으로 전송 시도
            const encodedText = encodeURIComponent(shareText);
            
            // 카카오톡 앱 실행 시도
            window.location.href = `kakaotalk://send?text=${encodedText}`;
            
            // 3초 후 앱이 실행되지 않으면 클립보드 복사로 폴백
            setTimeout(() => {
                this.copyToClipboard(shareText);
                alert('카카오톡 앱이 실행되지 않았습니다.\n공유 텍스트가 복사되었으니 카카오톡에서 붙여넣기 해주세요.');
            }, 3000);
        } else {
            // 데스크톱: 클립보드에 복사
            this.copyToClipboard(shareText);
            alert('카카오톡 공유 텍스트가 클립보드에 복사되었습니다!\n카카오톡에서 친구에게 붙여넣기 해주세요.');
        }
    }
    
    copyToClipboard(text) {
        // 모던 브라우저용 클립보드 API
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).catch(() => {
                this.fallbackCopyToClipboard(text);
            });
        } else {
            // 폴백 방식
            this.fallbackCopyToClipboard(text);
        }
    }
    
    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('클립보드 복사 실패:', err);
        }
        
        document.body.removeChild(textArea);
    }

    resetTest() {
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        this.nickname = '';
        
        document.getElementById('nickname').value = '';
        document.getElementById('startBtn').disabled = true;
        
        this.showScreen('startScreen');
    }

    showScreen(screenId) {
        // 모든 화면 숨기기
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // 선택된 화면 보이기
        document.getElementById(screenId).classList.add('active');
        
        // 화면 전환 애니메이션
        const activeScreen = document.getElementById(screenId);
        activeScreen.classList.add('fade-in');
        
        setTimeout(() => {
            activeScreen.classList.remove('fade-in');
        }, 500);
    }
}

// 앱 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 로딩 애니메이션
    const loadingScreen = document.createElement('div');
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        font-family: 'Noto Sans KR', sans-serif;
        color: white;
        font-size: 1.2rem;
    `;
    loadingScreen.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 20px;">🧐</div>
            <div>꼰대 테스트 로딩 중...</div>
        </div>
    `;
    
    document.body.appendChild(loadingScreen);
    
    // 2초 후 로딩 화면 제거하고 앱 시작
    setTimeout(() => {
        loadingScreen.remove();
        new KkondaeTest();
    }, 2000);
});

// PWA 지원을 위한 서비스 워커 등록 (선택사항)
if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW 등록 성공:', registration);
            })
            .catch(registrationError => {
                console.log('SW 등록 실패:', registrationError);
            });
    });
} 