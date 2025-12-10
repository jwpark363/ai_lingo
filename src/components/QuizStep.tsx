import { useState } from 'react';
import { ArrowRight, ArrowLeft, Star, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CourseType } from '../types';
import { PythonQuizQuestions } from './content/pythonContent';
import { JavascriptQuizQuestions } from './content/javascriptContent';

interface QuizStepProps {
  stageColor: string;
  onComplete: (stars: number) => void;
  onPrevious: () => void;
  courseType: CourseType;
}

interface Question {
  id: string;
  type: 'multiple-choice' | 'ox' | 'drag-match' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer?: number;
  pairs?: { left: string; right: string }[];
  blanks?: { text: string; answer: string }[];
  explanation: string;
}

export function QuizStep({ stageColor, onComplete, onPrevious, courseType }: QuizStepProps) {
  const questions = courseType === 'python' ? PythonQuizQuestions : JavascriptQuizQuestions;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());
  
  // For drag-match
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  
  // For fill-blank
  const [blankAnswer, setBlankAnswer] = useState('');

  const currentQuestion = questions[currentQuestionIndex];
  
  const checkAnswer = () => {
    if (currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'ox') {
      return selectedAnswer === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === 'drag-match') {
      const pairs = currentQuestion.pairs || [];
      return pairs.every(pair => matchedPairs[pair.left] === pair.right);
    } else if (currentQuestion.type === 'fill-blank') {
      return blankAnswer.toLowerCase().trim() === currentQuestion.blanks![0].answer.toLowerCase();
    }
    return false;
  };
  
  const isCorrect = checkAnswer();

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'ox') {
      if (selectedAnswer === null) return;
    } else if (currentQuestion.type === 'fill-blank') {
      if (!blankAnswer.trim()) return;
    } else if (currentQuestion.type === 'drag-match') {
      const pairs = currentQuestion.pairs || [];
      if (Object.keys(matchedPairs).length !== pairs.length) return;
    }

    setShowResult(true);
    if (isCorrect && !answeredQuestions.has(currentQuestion.id)) {
      setCorrectCount((prev) => prev + 1);
      setAnsweredQuestions((prev) => new Set(prev).add(currentQuestion.id));
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setMatchedPairs({});
      setBlankAnswer('');
      setDraggedItem(null);
    } else {
      const stars = correctCount * 10;
      onComplete(stars);
    }
  };

  const handleDragStart = (item: string) => {
    setDraggedItem(item);
  };

  const handleDrop = (target: string) => {
    if (draggedItem && !showResult) {
      setMatchedPairs(prev => ({ ...prev, [target]: draggedItem }));
      setDraggedItem(null);
    }
  };

  const renderQuestionContent = () => {
    if (currentQuestion.type === 'multiple-choice') {
      return (
        <div className="space-y-3">
          {currentQuestion.options!.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === currentQuestion.correctAnswer;
            const showCorrect = showResult && isCorrectOption;
            const showWrong = showResult && isSelected && !isCorrect;

            return (
              <motion.button
                key={index}
                whileHover={{ scale: showResult ? 1 : 1.02 }}
                whileTap={{ scale: showResult ? 1 : 0.98 }}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all text-lg ${
                  showCorrect
                    ? 'bg-green-50 border-green-500 text-green-900'
                    : showWrong
                    ? 'bg-red-50 border-red-500 text-red-900'
                    : isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showCorrect && <Check className="w-6 h-6 text-green-500" />}
                  {showWrong && <X className="w-6 h-6 text-red-500" />}
                </div>
              </motion.button>
            );
          })}
        </div>
      );
    }

    if (currentQuestion.type === 'ox') {
      return (
        <div className="grid grid-cols-2 gap-4">
          {['O', 'X'].map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === currentQuestion.correctAnswer;
            const showCorrect = showResult && isCorrectOption;
            const showWrong = showResult && isSelected && !isCorrect;

            return (
              <motion.button
                key={option}
                whileHover={{ scale: showResult ? 1 : 1.05 }}
                whileTap={{ scale: showResult ? 1 : 0.95 }}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`p-8 rounded-2xl border-4 text-4xl transition-all ${
                  showCorrect
                    ? 'bg-green-50 border-green-500 text-green-900'
                    : showWrong
                    ? 'bg-red-50 border-red-500 text-red-900'
                    : isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex flex-col items-center gap-2">
                  <span>{option}</span>
                  {showCorrect && <Check className="w-8 h-8 text-green-500" />}
                  {showWrong && <X className="w-8 h-8 text-red-500" />}
                </div>
              </motion.button>
            );
          })}
        </div>
      );
    }

    if (currentQuestion.type === 'drag-match') {
      const pairs = currentQuestion.pairs || [];
      const rightItems = pairs.map(p => p.right);
      const usedRightItems = new Set(Object.values(matchedPairs));
      
      return (
        <div className="space-y-6">
          <p className="text-slate-600 text-center">왼쪽과 오른쪽을 드래그해서 연결해보세요!</p>
          <div className="grid grid-cols-2 gap-8">
            {/* Left side */}
            <div className="space-y-3">
              {pairs.map(pair => (
                <div
                  key={pair.left}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(pair.left)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    matchedPairs[pair.left]
                      ? showResult
                        ? matchedPairs[pair.left] === pair.right
                          ? 'bg-green-50 border-green-500'
                          : 'bg-red-50 border-red-500'
                        : 'bg-blue-50 border-blue-500'
                      : 'border-slate-300 border-dashed bg-slate-50'
                  }`}
                >
                  <div className="text-lg text-slate-900">{pair.left}</div>
                  {matchedPairs[pair.left] && (
                    <div className="mt-2 text-blue-700 text-sm">→ {matchedPairs[pair.left]}</div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Right side */}
            <div className="space-y-3">
              {rightItems.map(item => {
                const isUsed = usedRightItems.has(item);
                return (
                  <motion.div
                    key={item}
                    draggable={!showResult && !isUsed}
                    onDragStart={() => handleDragStart(item)}
                    whileHover={!showResult && !isUsed ? { scale: 1.05 } : {}}
                    className={`p-4 rounded-xl border-2 text-lg transition-all ${
                      isUsed
                        ? 'opacity-30 border-slate-200 bg-slate-100'
                        : 'border-purple-300 bg-purple-50 cursor-move hover:border-purple-500'
                    } ${showResult ? 'cursor-not-allowed' : ''}`}
                  >
                    {item}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    if (currentQuestion.type === 'fill-blank') {
      const blank = currentQuestion.blanks![0];
      const parts = blank.text.split('___');
      
      return (
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-xl p-8">
            <div className="flex items-center gap-3 text-2xl">
              <span className="text-purple-400">{parts[0]}</span>
              <input
                type="text"
                value={blankAnswer}
                onChange={(e) => !showResult && setBlankAnswer(e.target.value)}
                disabled={showResult}
                className={`px-4 py-2 rounded-lg text-center min-w-[120px] ${
                  showResult
                    ? isCorrect
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-white text-slate-900'
                } disabled:cursor-not-allowed`}
                placeholder="입력하세요"
              />
              <span className="text-purple-400">{parts[1]}</span>
            </div>
          </div>
          {showResult && !isCorrect && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
              <p className="text-yellow-900">
                정답: <span className="font-bold">{blank.answer}</span>
              </p>
            </div>
          )}
        </div>
      );
    }
  };

  const canSubmit = () => {
    if (currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'ox') {
      return selectedAnswer !== null;
    } else if (currentQuestion.type === 'fill-blank') {
      return blankAnswer.trim() !== '';
    } else if (currentQuestion.type === 'drag-match') {
      return Object.keys(matchedPairs).length === (currentQuestion.pairs?.length || 0);
    }
    return false;
  };

  return (
    <div className="space-y-6">
      {/* Character guide */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-start gap-4"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-4xl shadow-lg flex-shrink-0">
          🎯
        </div>
        <div className="flex-1 bg-white rounded-2xl rounded-tl-none p-6 shadow-lg">
          <h3 className="text-slate-900 mb-2">퀴즈 풀기!</h3>
          <p className="text-slate-600 text-lg">
            배운 내용을 확인해볼까? 천천히 읽고 정답을 골라봐!
          </p>
        </div>
      </motion.div>

      {/* Quiz card */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-slate-600">
            문제 {currentQuestionIndex + 1} / {questions.length}
          </div>
          <div className="flex items-center gap-2 text-green-600">
            <Star className="w-5 h-5 fill-green-500" />
            <span>정답: {correctCount}개</span>
          </div>
        </div>

        {/* Question */}
        <h3 className="text-slate-900 mb-6 text-xl">{currentQuestion.question}</h3>

        {/* Question content */}
        <div className="mb-6">
          {renderQuestionContent()}
        </div>

        {/* Result feedback */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-6 rounded-xl ${
                isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{isCorrect ? '🎉' : '💡'}</div>
                <div>
                  <h4 className={`mb-2 ${isCorrect ? 'text-green-900' : 'text-red-900'}`}>
                    {isCorrect ? '정답이에요!' : '아쉬워요!'}
                  </h4>
                  <p className={`text-lg ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 px-6 py-4 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>이전</span>
        </button>
        
        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={!canSubmit()}
            className="flex-1 px-6 py-4 text-white rounded-xl transition-opacity text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: stageColor }}
          >
            정답 확인하기
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 text-white rounded-xl hover:opacity-90 transition-opacity text-lg"
            style={{ backgroundColor: stageColor }}
          >
            <span>{currentQuestionIndex < questions.length - 1 ? '다음 문제' : '완료하기'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}