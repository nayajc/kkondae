// 꼰대 테스트 질문 데이터
const QUESTIONS = [
    {
        id: 1,
        question: "후배가 '퇴근 먼저 하겠습니다'라고 말했을 때 당신의 반응은?",
        question_en: "How do you react when a junior says 'I'll leave work first'?",
        options: [
            { text: "그래, 수고했어! 😊", text_en: "Sure, good job! 😊", score: 0 },
            { text: "요즘 애들은 칼퇴가 당연한가? 😤", text_en: "Do youngsters these days think leaving on time is a right? 😤", score: 1 }
        ]
    },
    {
        id: 2,
        question: "신입이 질문을 많이 하면 어떤 생각이 드나요?",
        question_en: "What do you think when a new employee asks many questions?",
        options: [
            { text: "적극적이고 좋다 👍", text_en: "I'm positive and good! 👍", score: 0 },
            { text: "요즘 애들은 스스로 알아보는 능력이 없어 🤦‍♂️", text_en: "Do youngsters these days lack the ability to learn on their own? 🤦‍♂️", score: 1 }
        ]
    },
    {
        id: 3,
        question: "요즘 MZ세대는 회식 참여를 잘 안 해요. 당신의 생각은?",
        question_en: "Do Gen Z these days rarely participate in company outings. What do you think?",
        options: [
            { text: "자율이면 좋지, 강요는 안 해야지 🤝", text_en: "I think it's good to be autonomous, we shouldn't force it. 🤝", score: 0 },
            { text: "회식도 업무의 연장이다 💼", text_en: "Company outings are also extensions of work. 💼", score: 1 }
        ]
    },
    {
        id: 4,
        question: "회사에서 존댓말 쓰는 후배에게 '말 편하게 하라'고 했더니 계속 존댓말을 써요. 어떻게 할까요?",
        question_en: "When you told a junior who speaks politely 'speak freely', but they continued to speak politely. What should you do?",
        options: [
            { text: "불편하면 계속 써도 된다고 말함 😌", text_en: "I told them it's okay to continue if it's inconvenient. 😌", score: 0 },
            { text: "내가 불편하니까 말 편하게 하랬잖아! 😠", text_en: "I told them I wanted them to speak freely! 😠", score: 1 }
        ]
    },
    {
        id: 5,
        question: "'요즘 애들은...'으로 시작하는 말을 자주 하나요?",
        question_en: "Do you often say 'do youngsters these days...' at the beginning of your sentences?",
        options: [
            { text: "아니다 🤔", text_en: "No. 🤔", score: 0 },
            { text: "가끔 한다 (무의식적으로라도) 😅", text_en: "Sometimes, but unconsciously. 😅", score: 1 }
        ]
    },
    {
        id: 6,
        question: "업무 효율을 위해 '카톡 대신 협업툴 사용'을 제안 받았을 때?",
        question_en: "When a junior suggested using a collaboration tool instead of Whatsapp for work efficiency?",
        options: [
            { text: "오, 한번 써보자 🚀", text_en: "Oh, let's try it! 🚀", score: 0 },
            { text: "카톡이 최고지, 뭘 또 배우라고? 😒", text_en: "KakaoTalk is the best, why do I have to learn more? 😒", score: 1 }
        ]
    },
    {
        id: 7,
        question: "후배가 연차를 쓰겠다고 했을 때 제일 먼저 드는 생각은?",
        question_en: "What's the first thought that comes to mind when a junior says they'll take leave?",
        options: [
            { text: "잘 쉬고 와~ 😊", text_en: "Take a good break and come back! 😊", score: 0 },
            { text: "일은 누가 하지? 😰", text_en: "Who will do the work? 😰", score: 1 }
        ]
    },
    {
        id: 8,
        question: "'본인 책상 자리'라는 개념에 민감한 편인가요?",
        question_en: "Are you sensitive to the concept of 'your desk seat'?",
        options: [
            { text: "어디서든 일 잘 하면 됨 💪", text_en: "I can do my work anywhere. 💪", score: 0 },
            { text: "자리 뺏기면 기분 나쁨 😤", text_en: "It's annoying when someone takes my seat. 😤", score: 1 }
        ]
    },
    {
        id: 9,
        question: "'우리 때는 말이야...'라는 말을 종종 하나요?",
        question_en: "Do you often say 'back then, we used to...' in your sentences?",
        options: [
            { text: "잘 안 한다 🤐", text_en: "I don't often say it. 🤐", score: 0 },
            { text: "하게 되더라 😅", text_en: "But it happens sometimes. 😅", score: 1 }
        ]
    },
    {
        id: 10,
        question: "회의 시간에 젊은 직원이 슬리퍼 신고 참여하면?",
        question_en: "When a young employee participates in a meeting wearing slippers?",
        options: [
            { text: "편하니까 좋지 😎", text_en: "It's comfortable, so good. 😎", score: 0 },
            { text: "회의에도 예의는 있어야지 👔", text_en: "You should have manners even in meetings. 👔", score: 1 }
        ]
    },
    {
        id: 11,
        question: "'야근은 미덕'이라는 생각에 동의하나요?",
        question_en: "Do you agree with the idea that overtime is a virtue?",
        options: [
            { text: "아니요, 워라밸 중요함 ⚖️", text_en: "No, work-life balance is more important. ⚖️", score: 0 },
            { text: "젊을 때는 고생해야 💪", text_en: "When I was young, I had to work hard. 💪", score: 1 }
        ]
    },
    {
        id: 12,
        question: "후배가 틀을 깨는 새로운 아이디어를 냈을 때?",
        question_en: "When a junior comes up with a new, innovative idea?",
        options: [
            { text: "좋다, 검토해보자 💡", text_en: "Good, let's review it. 💡", score: 0 },
            { text: "그냥 우리 방식대로 하자 🤷‍♂️", text_en: "Let's just follow our usual way. 🤷‍♂️", score: 1 }
        ]
    },
    {
        id: 13,
        question: "후배가 상사에게 바로 의견을 말했을 때?",
        question_en: "When a junior directly expresses their opinion to their supervisor?",
        options: [
            { text: "좋은 용기라고 생각함 👏", text_en: "I think it's a good act of courage. 👏", score: 0 },
            { text: "위계질서 모르는 건가? 😤", text_en: "Don't you understand hierarchy? 😤", score: 1 }
        ]
    },
    {
        id: 14,
        question: "단체 채팅방에서 'ㅋ', 'ㅎ'의 개수가 신경 쓰이나요?",
        question_en: "Do you pay attention to the number of 'Kkk' and 'lol' in group chats?",
        options: [
            { text: "전혀 🤷‍♀️", text_en: "Not at all. 🤷‍♀️", score: 0 },
            { text: "요즘 애들 왜 이렇게 성의 없지? 😒", text_en: "Why are youngsters these days so careless? 😒", score: 1 }
        ]
    },
    {
        id: 15,
        question: "당신의 좌우명은?",
        question_en: "What's your motto?",
        options: [
            { text: "서로 존중하며 같이 성장하자 🌱", text_en: "Respect each other and grow together. 🌱", score: 0 },
            { text: "옹고지신, 옛 것을 익히고 새로운것을 배우자 👑", text_en: "Respect the past, learn from it, and learn new things. 👑", score: 1 }
        ]
    }
];

// 결과 타입 정의
const RESULT_TYPES = {
    NICE_SENIOR: {
        name: "순둥한 선배",
        name_en: "Nice Senior",
        emoji: "🟢",
        description: "🎉 축하합니다! 당신은 존중과 배려가 몸에 밴 진정한 워라밸 마스터!\n\n계속해서 열린 마음을 유지하고, 후배들의 신선한 아이디어에 귀 기울여주세요. 당신 같은 선배가 있으면 회사가 행복해질 거예요! 😊",
        description_en: "🎉 Congratulations! You are a true work-life balance master, full of respect and consideration.\n\nKeep your open mind and listen to juniors' fresh ideas. With seniors like you, the company will be a happier place! 😊",
        minScore: 0,
        maxScore: 3
    },
    SOMETIMES_KKONDAE: {
        name: "간간이 꼰대",
        name_en: "Sometimes Kkondae",
        emoji: "🟡",
        description: "⚠️ 아직은 괜찮지만, 가끔 꼰대 바이러스가 올라오네요!\n\n'요즘 애들' 대신 '새로운 세대'라는 말부터 써보는 건 어떨까요? 조금만 더 열린 마음을 가져보세요. 후배들도 당신을 좋아할 거예요! 🤗",
        description_en: "⚠️ You're mostly fine, but sometimes the kkondae virus comes up!\n\nTry saying 'new generation' instead of 'kids these days.' Be a bit more open-minded. Juniors will like you more! 🤗",
        minScore: 4,
        maxScore: 8
    },
    KING_KKONDAE: {
        name: "전통의 꼰대왕",
        name_en: "King of Kkondae",
        emoji: "🔴",
        description: "👑 당신 안에는 7080 감성이 살아 숨 쉬고 있어요...!\n\n과거는 가슴에 묻고, 지금 세대의 방식을 배우려는 용기가 필요합니다. 변화를 두려워하지 마세요. 새로운 것도 배워보면 재미있을 거예요! 🚀",
        description_en: "👑 You have the spirit of the 70s and 80s alive in you...!\n\nLet the past rest in your heart, and have the courage to learn the ways of the current generation. Don't be afraid of change. New things can be fun! 🚀",
        minScore: 9,
        maxScore: 15
    }
};

// 점수에 따른 결과 타입 반환 함수
function getResultType(score) {
    for (const [key, result] of Object.entries(RESULT_TYPES)) {
        if (score >= result.minScore && score <= result.maxScore) {
            return result;
        }
    }
    return RESULT_TYPES.NICE_SENIOR; // 기본값
} 