import { Scenario } from "./types";

const JavascriptScenarios: Scenario[] = [
  {
    id: '1',
    name: 'JavaScript 기초',
    color: '#0052A4',
    stages: [
      { id: '1-1', name: '변수와 자료형', status: 'completed', description: '변수 선언과 다양한 자료형에 대해 학습합니다.' },
      { id: '1-2', name: '연산자', status: 'completed', description: '산술, 비교, 논리 연산자를 이해합니다.' },
      { id: '1-3', name: '조건문', status: 'current', description: 'if, else, switch 문을 활용한 조건 처리를 학습합니다.' },
      { id: '1-4', name: '반복문', status: 'locked', description: 'for, while 문으로 반복 처리를 구현합니다.' },
      { id: '1-5', name: '함수', status: 'locked', description: '함수 선언과 활용 방법을 배웁니다.' },
      { id: '1-6', name: '배열', status: 'locked', description: '배열 생성과 메서드 사용법을 익힙니다.' },
    ],
  },
  {
    id: '2',
    name: 'React 입문',
    color: '#00A84D',
    stages: [
      { id: '2-1', name: '컴포넌트 기초', status: 'completed', description: 'React 컴포넌트의 개념을 이해합니다.' },
      { id: '2-2', name: 'JSX 문법', status: 'current', description: 'JSX 문법과 표현식을 학습합니다.' },
      { id: '2-3', name: 'Props', status: 'locked', description: '컴포넌트 간 데이터 전달 방법을 배웁니다.' },
      { id: '2-4', name: 'State', status: 'locked', description: '상태 관리의 기본을 익힙니다.' },
      { id: '2-5', name: 'Hooks', status: 'locked', description: 'useState, useEffect 등 주요 훅을 학습합니다.' },
    ],
  },
  {
    id: '3',
    name: '데이터베이스 기초',
    color: '#F5A200',
    stages: [
      { id: '3-1', name: 'SQL 기초', status: 'locked', description: 'SQL 기본 문법을 배웁니다.' },
      { id: '3-2', name: 'SELECT 쿼리', status: 'locked', description: '데이터 조회 방법을 학습합니다.' },
      { id: '3-3', name: 'INSERT/UPDATE', status: 'locked', description: '데이터 삽입과 수정을 실습합니다.' },
      { id: '3-4', name: 'JOIN', status: 'locked', description: '테이블 간 관계를 이해하고 조인합니다.' },
    ],
  },
  {
    id: '4',
    name: '웹 API 개발',
    color: '#CD7C2F',
    stages: [
      { id: '4-1', name: 'REST API 개념', status: 'locked', description: 'RESTful API의 기본 개념을 이해합니다.' },
      { id: '4-2', name: 'HTTP 메서드', status: 'locked', description: 'GET, POST, PUT, DELETE를 학습합니다.' },
      { id: '4-3', name: 'API 설계', status: 'locked', description: '효과적인 API 구조를 설계합니다.' },
      { id: '4-4', name: 'API 테스트', status: 'locked', description: 'API 테스트 도구를 활용합니다.' },
      { id: '4-5', name: '에러 처리', status: 'locked', description: '적절한 에러 처리 방법을 배웁니다.' },
    ],
  },
];

const PythonScenarios: Scenario[] = [
  {
    id: '1',
    name: 'Python 기초',
    color: '#3776AB',
    stages: [
      { id: '1-1', name: '변수와 자료형', status: 'completed', description: '변수 선언과 다양한 자료형에 대해 학습합니다.' },
      { id: '1-2', name: '연산자', status: 'completed', description: '산술, 비교, 논리 연산자를 이해합니다.' },
      { id: '1-3', name: '조건문', status: 'current', description: 'if, elif, else 문을 활용한 조건 처리를 학습합니다.' },
      { id: '1-4', name: '반복문', status: 'locked', description: 'for, while 문으로 반복 처리를 구현합니다.' },
      { id: '1-5', name: '함수', status: 'locked', description: '함수 정의와 활용 방법을 배웁니다.' },
      { id: '1-6', name: '리스트', status: 'locked', description: '리스트 생성과 메서드 사용법을 익힙니다.' },
    ],
  },
  {
    id: '2',
    name: 'Python 자료구조',
    color: '#FFD43B',
    stages: [
      { id: '2-1', name: '튜플', status: 'completed', description: '변경할 수 없는 튜플의 개념을 이해합니다.' },
      { id: '2-2', name: '딕셔너리', status: 'current', description: '키-값 쌍으로 데이터를 저장하는 방법을 배웁니다.' },
      { id: '2-3', name: '세트', status: 'locked', description: '중복을 허용하지 않는 세트를 학습합니다.' },
      { id: '2-4', name: '리스트 컴프리헨션', status: 'locked', description: '간결한 리스트 생성 방법을 익힙니다.' },
      { id: '2-5', name: '람다 함수', status: 'locked', description: '익명 함수 람다를 학습합니다.' },
    ],
  },
  {
    id: '3',
    name: '파일 입출력',
    color: '#4B8BBE',
    stages: [
      { id: '3-1', name: '파일 읽기', status: 'locked', description: '텍스트 파일을 읽는 방법을 배웁니다.' },
      { id: '3-2', name: '파일 쓰기', status: 'locked', description: '데이터를 파일에 저장하는 방법을 학습합니다.' },
      { id: '3-3', name: 'CSV 다루기', status: 'locked', description: 'CSV 파일을 읽고 쓰는 방법을 실습합니다.' },
      { id: '3-4', name: 'JSON 다루기', status: 'locked', description: 'JSON 형식의 데이터를 처리합니다.' },
    ],
  },
  {
    id: '4',
    name: '객체지향 프로그래밍',
    color: '#646464',
    stages: [
      { id: '4-1', name: '클래스 기초', status: 'locked', description: '클래스와 객체의 개념을 이해합니다.' },
      { id: '4-2', name: '상속', status: 'locked', description: '클래스 상속과 메서드 오버라이딩을 배웁니다.' },
      { id: '4-3', name: '캡슐화', status: 'locked', description: '데이터 은닉과 접근 제어를 학습합니다.' },
      { id: '4-4', name: '다형성', status: 'locked', description: '다형성의 개념과 활용법을 익힙니다.' },
      { id: '4-5', name: '특수 메서드', status: 'locked', description: '__init__, __str__ 등 특수 메서드를 배웁니다.' },
    ],
  },
];

export { JavascriptScenarios, PythonScenarios }