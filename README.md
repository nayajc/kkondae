# 🧐 꼰대 테스트 앱

회사의 꼰대 문화를 척결하기 위한 재미있는 테스트 앱입니다! 당신이 얼마나 꼰대인지 스스로 돌아볼 수 있는 기회를 마련해드려요.

## ✨ 주요 기능

- **12문항 꼰대 테스트**: 재미있는 질문으로 꼰대 지수 측정
- **실시간 랭킹 시스템**: 꼰대일수록 1등! (같은 점수면 동급)
- **카카오톡 공유**: 결과를 친구들과 공유
- **Firebase 연동**: 결과 데이터 저장 및 랭킹 관리
- **모바일 반응형**: 모든 디바이스에서 최적화된 경험
- **세련된 UI/UX**: 파란색 계통의 모던한 디자인

## 🎯 결과 유형

### 🟢 순둥한 선배 (0-3점)
존중과 배려가 몸에 밴 진정한 워라밸 마스터!

### 🟡 간간이 꼰대 (4-8점)
아직은 괜찮지만, 가끔 꼰대 바이러스가 올라오네요!

### 🔴 전통의 꼰대왕 (9-12점)
당신 안에는 7080 감성이 살아 숨 쉬고 있어요...!

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Google Apps Script
- **Database**: Firebase Firestore
- **UI Framework**: 순수 CSS (모던 그리드 시스템)
- **아이콘**: Font Awesome 6.0
- **폰트**: Noto Sans KR

## 📱 설치 및 실행

### 1. Google Apps Script 설정

1. [Google Apps Script](https://script.google.com/)에 접속
2. 새 프로젝트 생성
3. 제공된 파일들을 각각 복사하여 붙여넣기:
   - `Code.gs` → Apps Script 편집기
   - `index.html` → HTML 파일로 생성
   - `styles.css` → CSS 파일로 생성
   - `questions.js` → JavaScript 파일로 생성
   - `firebase-config.js` → JavaScript 파일로 생성
   - `app.js` → JavaScript 파일로 생성

### 2. Firebase 설정

1. [Firebase Console](https://console.firebase.google.com/)에서 프로젝트 생성
2. Firestore Database 활성화
3. 보안 규칙 설정 (테스트 모드로 시작)
4. 웹 앱 등록 및 설정 정보 복사

### 3. 배포

1. Apps Script에서 "배포" → "새 배포"
2. 유형: "웹 앱"
3. 실행: "나"
4. 액세스 권한: "모든 사용자"
5. 배포 후 URL 복사

## 📊 Firebase 데이터 구조

```javascript
// 컬렉션: "기록"
{
  nickname: "사용자별명",
  score: 5, // 꼰대 점수 (0-12)
  resultType: "간간이 꼰대", // 결과 유형
  timestamp: "2024-01-01T00:00:00.000Z", // 서버 타임스탬프
  date: "2024-01-01" // YYYY-MM-DD 형식
}
```

## 🎨 디자인 특징

- **색상**: 파란색 계통 그라데이션 (#667eea → #764ba2)
- **애니메이션**: 부드러운 화면 전환 및 호버 효과
- **반응형**: 모바일 우선 디자인
- **접근성**: 키보드 네비게이션 지원
- **성능**: 최적화된 CSS 및 JavaScript

## 🔧 커스터마이징

### 질문 수정
`questions.js` 파일에서 질문과 답변을 수정할 수 있습니다.

### 결과 기준 변경
`RESULT_TYPES` 객체에서 점수 범위와 설명을 수정할 수 있습니다.

### 스타일 변경
`styles.css` 파일에서 색상, 폰트, 레이아웃을 수정할 수 있습니다.

## 📈 성능 최적화

- **이미지 최적화**: WebP 포맷 사용
- **폰트 최적화**: Google Fonts CDN 활용
- **캐싱**: Firebase 오프라인 지원
- **코드 분할**: 모듈화된 JavaScript 구조

## 🔒 보안 고려사항

- Firebase 보안 규칙 설정
- 입력값 검증 및 sanitization
- XSS 방지
- CSRF 토큰 사용 (필요시)

## 🚨 Firebase 오류 해결 방법

### 현재 상태: Firebase Realtime Database 모드
Firebase Realtime Database를 사용하는 **실시간 모드**로 실행됩니다:
- ✅ Firebase Realtime Database 우선 사용
- ✅ 실시간 랭킹 동기화
- ✅ Firebase 실패 시에만 로컬 스토리지 폴백
- ✅ 웹 배포 준비 완료

### Firebase 설정 완료
- ✅ Firebase Realtime Database URL 추가
- ✅ Realtime Database 연결
- ✅ 보안 규칙 설정 (간소화)
- ✅ 자동 폴백 시스템

### 중요: Firebase Realtime Database 설정 필요
1. [Firebase Console](https://console.firebase.google.com/)에서 프로젝트 선택
2. **Realtime Database** → **데이터베이스 만들기** 클릭
3. **테스트 모드에서 시작** 선택
4. **보안 규칙** 탭에서 `database.rules.json` 내용 적용
5. **게시** 버튼 클릭

### 로컬 스토리지 특징
- **데이터 영속성**: 브라우저에 저장되어 페이지 새로고침 후에도 유지
- **용량 제한**: 약 5MB까지 저장 가능
- **개인화**: 각 브라우저/기기별로 독립적인 데이터
- **오프라인 지원**: 인터넷 연결 없이도 작동

### 일반적인 오류 해결
- **400 Bad Request**: Firebase 프로젝트 설정 확인
- **403 Forbidden**: Firestore 보안 규칙 확인
- **네트워크 오류**: 인터넷 연결 확인

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.

---

**재미있게 테스트해보세요! 😄** 