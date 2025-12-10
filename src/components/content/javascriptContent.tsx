export const JavascriptLearningContent = {
  pages: [
    {
      title: '안녕! 나는 코디야 🤖',
      content:
        '오늘은 변수에 대해서 배워볼 거야! 변수는 값을 저장하는 상자라고 생각하면 돼.',
      example: 'let myBox = "사탕";',
      explanation: '이렇게 하면 myBox라는 상자에 "사탕"이 들어가는 거야!',
    },
    {
      title: '변수는 어떻게 사용할까? 🎁',
      content:
        '변수에는 숫자, 글자, 여러 가지를 담을 수 있어. 마치 다양한 물건을 담을 수 있는 상자처럼!',
      example: 'let age = 12;\nlet name = "철수";\nlet isStudent = true;',
      explanation: '숫자, 문자, 참/거짓 값을 모두 저장할 수 있어!',
    },
    {
      title: '변수 이름 짓기 규칙 📝',
      content: '변수 이름을 지을 때는 규칙이 있어. 의미있는 이름을 사용하면 코드를 읽기 쉬워져!',
      example: 'let studentName = "영희";\nlet studentAge = 11;',
      explanation: '이렇게 무엇을 담고 있는지 알 수 있는 이름을 사용하는 게 좋아!',
    },
  ],
};

export const JavascriptQuizQuestions = [
  {
    id: '1',
    type: 'multiple-choice' as const,
    question: '변수를 만들 때 사용하는 키워드는?',
    options: ['let', 'var', 'const', '모두 정답'],
    correctAnswer: 3,
    explanation: '맞아요! let, var, const 모두 변수를 만들 때 사용할 수 있어요! 👏',
  },
  {
    id: '2',
    type: 'ox' as const,
    question: '변수 이름은 숫자로 시작할 수 있다',
    correctAnswer: 1, // 0: O, 1: X
    explanation: '정답! 변수 이름은 숫자로 시작할 수 없어요. 문자나 밑줄(_)로 시작해야 해요!',
  },
  {
    id: '3',
    type: 'drag-match' as const,
    question: '변수 타입과 예시를 연결해보세요!',
    pairs: [
      { left: '문자열', right: '"안녕하세요"' },
      { left: '숫자', right: '42' },
      { left: '불린', right: 'true' },
    ],
    explanation: '완벽해요! 각 데이터 타입과 예시를 잘 연결했어요! 🌟',
  },
  {
    id: '4',
    type: 'fill-blank' as const,
    question: '다음 빈칸을 채워 변수를 만들어보세요',
    blanks: [{ text: '___ age = 12;', answer: 'let' }],
    explanation: '잘했어요! let 키워드로 변수를 만들 수 있어요!',
  },
];

export const JavascriptCodingChallenges = [
  {
    id: '1',
    type: 'arrange-blocks' as const,
    title: '코드 블록 순서 맞추기 🧩',
    mission: '변수를 선언하고 출력하는 코드를 올바른 순서로 배열해보세요!',
    hint: '먼저 변수를 만들고, 그 다음에 출력해야 해요!',
    blocks: [
      'console.log(myName);',
      'let myName = "철수";',
      '// 내 이름 출력하기',
    ],
    correctOrder: [
      '// 내 이름 출력하기',
      'let myName = "철수";',
      'console.log(myName);',
    ],
  },
  {
    id: '2',
    type: 'fix-error' as const,
    title: '에러 찾아 고치기 🔍',
    mission: '아래 코드에는 에러가 있어요. 에러를 찾아서 고쳐보세요!',
    hint: '변수 이름은 숫자로 시작할 수 없어요!',
    errorCode: 'let 1student = "영희";\nconsole.log(1student);',
    fixedCode: 'let student1 = "영희";\nconsole.log(student1);',
  },
  {
    id: '3',
    type: 'fill-code' as const,
    title: '코드 빈칸 채우기 ✍️',
    mission: '빈칸을 채워서 나이를 저장하는 변수를 만들어보세요!',
    hint: 'let 키워드를 사용하고, 숫자는 따옴표 없이 써야 해요!',
    template: '___ age = ___;',
    answer: 'let age = 12;',
  },
  {
    id: '4',
    type: 'free-code' as const,
    title: '자유롭게 코드 작성하기 💻',
    mission: '좋아하는 과일 이름을 저장하는 변수를 만들어보세요!',
    hint: '예시: let fruit = "사과"; 처럼 작성하면 돼요!',
    initialCode: 'let fruit = ',
  },
];
