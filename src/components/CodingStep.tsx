import { useState } from 'react';
import { ArrowRight, ArrowLeft, Play, RotateCcw, Lightbulb, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CourseType } from '../types';
import { PythonCodingChallenges } from './content/pythonContent';
import { JavascriptCodingChallenges } from './content/javascriptContent';

interface CodingStepProps {
  stageColor: string;
  onComplete: (stars: number) => void;
  onPrevious: () => void;
  courseType: CourseType;
}

type ChallengeType = 'free-code' | 'arrange-blocks' | 'fix-error' | 'fill-code';

interface Challenge {
  id: string;
  type: ChallengeType;
  title: string;
  mission: string;
  hint: string;
  initialCode?: string;
  blocks?: string[];
  correctOrder?: string[];
  errorCode?: string;
  fixedCode?: string;
  template?: string;
  answer?: string;
}

export function CodingStep({ stageColor, onComplete, onPrevious, courseType }: CodingStepProps) {
  const allChallenges = courseType === 'python' ? PythonCodingChallenges : JavascriptCodingChallenges;
  const challenges = allChallenges as Challenge[];
  
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  
  // For arrange-blocks
  const [blockOrder, setBlockOrder] = useState<string[]>([]);
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  
  // For fill-code
  const [fillAnswers, setFillAnswers] = useState<string[]>(['', '']);

  const currentChallenge = challenges[currentChallengeIndex];
  
  // Initialize state based on challenge type
  useState(() => {
    if (currentChallenge.type === 'arrange-blocks' && currentChallenge.blocks) {
      setBlockOrder([...currentChallenge.blocks].sort(() => Math.random() - 0.5));
    } else if (currentChallenge.type === 'fix-error') {
      setCode(currentChallenge.errorCode || '');
    } else if (currentChallenge.type === 'free-code') {
      setCode(currentChallenge.initialCode || '');
    } else if (currentChallenge.type === 'fill-code') {
      setFillAnswers(['', '']);
    }
  });

  const checkAnswer = () => {
    if (currentChallenge.type === 'arrange-blocks') {
      return JSON.stringify(blockOrder) === JSON.stringify(currentChallenge.correctOrder);
    } else if (currentChallenge.type === 'fix-error') {
      return code.trim() === currentChallenge.fixedCode?.trim();
    } else if (currentChallenge.type === 'fill-code') {
      const userAnswer = currentChallenge.template?.replace(/___/g, () => fillAnswers.shift() || '');
      setFillAnswers(['', '']);
      return userAnswer?.trim() === currentChallenge.answer?.trim();
    } else if (currentChallenge.type === 'free-code') {
      if (courseType === 'python') {
        // Python validation: no keyword needed, just check for = and quotes
        return code.includes('=') && code.includes('"');
      } else {
        // JavaScript validation
        return code.includes('let') && code.includes('=') && code.includes('"') && code.includes(';');
      }
    }
    return false;
  };

  const handleRun = () => {
    setHasRun(true);
    const isCorrect = checkAnswer();
    
    if (currentChallenge.type === 'arrange-blocks') {
      if (isCorrect) {
        setOutput('✅ 완벽해요! 코드 순서가 정확해요!\n\n' + blockOrder.join('\n'));
      } else {
        setOutput('❌ 순서를 다시 확인해보세요!\n먼저 변수를 만들고, 그 다음에 사용해야 해요.');
      }
    } else if (currentChallenge.type === 'fix-error') {
      if (isCorrect) {
        setOutput('✅ 에러를 찾아서 잘 고쳤어요!\n\n' + code);
      } else {
        setOutput('❌ 아직 에러가 있어요.\n변수 이름을 다시 확인해보세요!');
      }
    } else if (currentChallenge.type === 'fill-code') {
      const tempAnswers = [...fillAnswers];
      const userAnswer = currentChallenge.template?.replace(/___/g, () => tempAnswers.shift() || '');
      if (isCorrect) {
        setOutput('✅ 정확해요! 변수를 잘 만들었어요!\n\n' + userAnswer);
      } else {
        setOutput('❌ 다시 한 번 확인해볼까요?\n힌트: ' + currentChallenge.hint);
      }
    } else if (currentChallenge.type === 'free-code') {
      if (isCorrect) {
        setOutput('✅ 성공! 변수를 잘 만들었어요!\n\n' + code);
      } else {
        if (courseType === 'python') {
          setOutput('❌ 변수 선언 형식을 확인해보세요!\n힌트: 변수명 = "값" 형태로 작성해요.');
        } else {
          setOutput('❌ 변수 선언 형식을 확인해보세요!\n힌트를 참고해주세요.');
        }
      }
    }
  };

  const handleReset = () => {
    if (currentChallenge.type === 'arrange-blocks' && currentChallenge.blocks) {
      setBlockOrder([...currentChallenge.blocks].sort(() => Math.random() - 0.5));
    } else if (currentChallenge.type === 'fix-error') {
      setCode(currentChallenge.errorCode || '');
    } else if (currentChallenge.type === 'free-code') {
      setCode(currentChallenge.initialCode || '');
    } else if (currentChallenge.type === 'fill-code') {
      setFillAnswers(['', '']);
    }
    setOutput('');
    setHasRun(false);
  };

  const handleNext = () => {
    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      handleReset();
      setShowHint(false);
    } else {
      onComplete(15);
    }
  };

  const handleDragStart = (block: string, index: number) => {
    setDraggedBlock(block);
    setDraggedIndex(index);
  };

  const handleDrop = (dropIndex: number) => {
    if (draggedIndex === null) return;
    
    const newOrder = [...blockOrder];
    const [removed] = newOrder.splice(draggedIndex, 1);
    newOrder.splice(dropIndex, 0, removed);
    setBlockOrder(newOrder);
    setDraggedBlock(null);
    setDraggedIndex(null);
  };

  const renderChallengeContent = () => {
    if (currentChallenge.type === 'arrange-blocks') {
      return (
        <div className="space-y-4">
          <p className="text-slate-600 text-center mb-6">
            블록을 드래그해서 올바른 순서로 배열해보세요! 🧩
          </p>
          <div className="space-y-3">
            {blockOrder.map((block, index) => (
              <motion.div
                key={index}
                draggable
                onDragStart={() => handleDragStart(block, index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(index)}
                whileHover={{ scale: 1.02 }}
                className="bg-slate-900 rounded-xl p-4 cursor-move border-2 border-slate-700 hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <GripVertical className="w-5 h-5 text-slate-500" />
                  <pre className="text-green-400 text-lg flex-1">
                    <code>{block}</code>
                  </pre>
                  <span className="text-slate-500 text-sm">{index + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      );
    }

    if (currentChallenge.type === 'fix-error') {
      return (
        <div className="bg-slate-900 rounded-xl overflow-hidden">
          <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-slate-400 text-sm">script.js</span>
          </div>
          <div className="p-6">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-transparent text-green-400 text-lg font-mono outline-none resize-none"
              rows={3}
              style={{ minHeight: '80px' }}
            />
          </div>
        </div>
      );
    }

    if (currentChallenge.type === 'fill-code') {
      const parts = currentChallenge.template?.split('___') || [];
      
      return (
        <div className="bg-slate-900 rounded-xl p-8">
          <div className="flex items-center gap-3 text-2xl flex-wrap">
            <span className="text-purple-400">{parts[0]}</span>
            <input
              type="text"
              value={fillAnswers[0]}
              onChange={(e) => setFillAnswers([e.target.value, fillAnswers[1]])}
              className="px-4 py-2 rounded-lg text-center min-w-[100px] bg-white text-slate-900"
              placeholder="?"
            />
            <span className="text-purple-400">{parts[1]}</span>
            <input
              type="text"
              value={fillAnswers[1]}
              onChange={(e) => setFillAnswers([fillAnswers[0], e.target.value])}
              className="px-4 py-2 rounded-lg text-center min-w-[80px] bg-white text-slate-900"
              placeholder="?"
            />
            <span className="text-purple-400">{parts[2]}</span>
          </div>
        </div>
      );
    }

    if (currentChallenge.type === 'free-code') {
      return (
        <div className="bg-slate-900 rounded-xl overflow-hidden">
          <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-slate-400 text-sm">script.js</span>
          </div>
          <div className="p-6">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-transparent text-green-400 text-lg font-mono outline-none resize-none"
              rows={2}
              style={{ minHeight: '60px' }}
              placeholder='let myVariable = "value";'
            />
          </div>
        </div>
      );
    }
  };

  const isCorrect = checkAnswer();

  return (
    <div className="space-y-6">
      {/* Character guide */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-start gap-4"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-4xl shadow-lg flex-shrink-0">
          💻
        </div>
        <div className="flex-1 bg-white rounded-2xl rounded-tl-none p-6 shadow-lg">
          <h3 className="text-slate-900 mb-2">{currentChallenge.title}</h3>
          <p className="text-slate-600 text-lg">{currentChallenge.mission}</p>
        </div>
      </motion.div>

      {/* Coding interface */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h3 className="text-slate-900">도전 과제 {currentChallengeIndex + 1}/{challenges.length}</h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
            >
              <Lightbulb className="w-4 h-4" />
              <span>힌트</span>
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>초기화</span>
            </button>
          </div>
        </div>

        {/* Hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                <p className="text-yellow-900">{currentChallenge.hint}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Challenge content */}
        <div className="mb-6">
          {renderChallengeContent()}
        </div>

        {/* Run button */}
        <button
          onClick={handleRun}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 text-white rounded-xl hover:opacity-90 transition-opacity text-lg mb-4"
          style={{ backgroundColor: stageColor }}
        >
          <Play className="w-5 h-5" />
          <span>실행하기</span>
        </button>

        {/* Output */}
        {output && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-xl border-2 ${
              isCorrect && hasRun
                ? 'bg-green-50 border-green-200'
                : 'bg-orange-50 border-orange-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{isCorrect && hasRun ? '🎉' : '🤔'}</div>
              <pre className={`text-lg whitespace-pre-wrap ${
                isCorrect && hasRun ? 'text-green-900' : 'text-orange-900'
              }`}>{output}</pre>
            </div>
          </motion.div>
        )}
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
        <button
          onClick={handleNext}
          disabled={!isCorrect || !hasRun}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 text-white rounded-xl transition-opacity text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: stageColor }}
        >
          <span>{currentChallengeIndex < challenges.length - 1 ? '다음 도전' : '완료하기'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}