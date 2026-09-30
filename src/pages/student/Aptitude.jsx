import React, { useState, useEffect, useRef } from 'react';
import {
  HelpCircle,
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Award,
  ChevronLeft,
  ChevronRight,
  Send,
  History,
  AlertTriangle,
  BookOpen,
  Filter
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';
import { ConfirmModal } from '../../components/common/ConfirmModal';

export const Aptitude = () => {
  const { aptitudeQuestions, testResults, saveTestResult } = useData();

  // View modes: 'lobby' | 'test' | 'result' | 'history'
  const [viewMode, setViewMode] = useState('lobby');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTestQuestions, setActiveTestQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: selectedOptionIndex }
  const [timeRemaining, setTimeRemaining] = useState(0); // in seconds
  const [totalTimeLimit, setTotalTimeLimit] = useState(0);
  const [currentResult, setCurrentResult] = useState(null);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);

  const timerRef = useRef(null);

  // Filter available test categories
  const categories = ['All', 'Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability'];

  // Start test handler
  const handleStartTest = (category) => {
    let pool = [];
    if (category === 'All') {
      // Pick 15 questions across categories
      pool = [...aptitudeQuestions].slice(0, 15);
    } else {
      pool = aptitudeQuestions.filter(q => q.category === category);
    }

    if (pool.length === 0) {
      pool = aptitudeQuestions.slice(0, 10);
    }

    // Allocate 1.5 minutes per question
    const duration = pool.length * 90;

    setActiveTestQuestions(pool);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTimeRemaining(duration);
    setTotalTimeLimit(duration);
    setViewMode('test');
  };

  // Timer effect during active test
  useEffect(() => {
    if (viewMode === 'test' && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [viewMode]);

  // Handle user option selection
  const handleSelectOption = (questionId, optionIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  // Submit test and evaluate
  const handleSubmitTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setConfirmSubmitOpen(false);

    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    const detailedReview = activeTestQuestions.map(q => {
      const selected = userAnswers[q.id];
      const isAttempted = selected !== undefined;
      const isCorrect = isAttempted && selected === q.correctAnswer;

      if (!isAttempted) unattemptedCount++;
      else if (isCorrect) correctCount++;
      else incorrectCount++;

      return {
        ...q,
        selectedAnswer: selected,
        isCorrect
      };
    });

    const total = activeTestQuestions.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const accuracy = (correctCount + incorrectCount) > 0
      ? Math.round((correctCount / (correctCount + incorrectCount)) * 100)
      : 0;
    const timeSpent = totalTimeLimit - timeRemaining;

    const resultSummary = {
      testTitle: selectedCategory === 'All' ? 'Full Mock Aptitude Test' : `${selectedCategory} Test`,
      category: selectedCategory,
      totalQuestions: total,
      correctCount,
      incorrectCount,
      unattemptedCount,
      score: correctCount,
      percentage,
      accuracy,
      timeSpentSeconds: timeSpent,
      detailedQuestions: detailedReview
    };

    saveTestResult(resultSummary);
    setCurrentResult(resultSummary);
    setViewMode('result');
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = activeTestQuestions[currentQuestionIndex];
  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* View: LOBBY */}
      {viewMode === 'lobby' && (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Aptitude Practice & Assessment</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Practice speed math, logical deduction, and verbal aptitude with timed simulation and explanations
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={History}
              onClick={() => setViewMode('history')}
            >
              Test History ({testResults.length})
            </Button>
          </div>

          {/* Test Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Full Mock Test */}
            <div className="p-5 bg-gradient-to-br from-indigo-900 to-indigo-700 text-white rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                  Recommended
                </span>
                <h3 className="text-lg font-bold mt-2 text-white">Full Mock Test</h3>
                <p className="text-xs text-indigo-100 mt-1">
                  15 questions covering Quantitative, Logical Reasoning, and Verbal Ability.
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-indigo-200">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 22 Mins
                  </span>
                  <span>•</span>
                  <span>15 Questions</span>
                </div>
              </div>
              
              <Button
                variant="secondary"
                size="sm"
                icon={Play}
                onClick={() => {
                  setSelectedCategory('All');
                  handleStartTest('All');
                }}
                className="mt-5 w-full bg-white text-indigo-900 hover:bg-indigo-50 font-bold"
              >
                Start Full Mock
              </Button>
            </div>

            {/* Quantitative Aptitude */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Mathematics
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">Quantitative Aptitude</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Time & Work, Speed Trains, Profit & Loss, Percentages, and Probability.
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 12 Mins
                  </span>
                  <span>•</span>
                  <span>8 Questions</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                icon={Play}
                onClick={() => {
                  setSelectedCategory('Quantitative Aptitude');
                  handleStartTest('Quantitative Aptitude');
                }}
                className="mt-5 w-full"
              >
                Start Practice
              </Button>
            </div>

            {/* Logical Reasoning */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Reasoning
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">Logical Reasoning</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Number series, Blood Relations, Direction Sense, Coding-Decoding, and Syllogisms.
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 9 Mins
                  </span>
                  <span>•</span>
                  <span>6 Questions</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                icon={Play}
                onClick={() => {
                  setSelectedCategory('Logical Reasoning');
                  handleStartTest('Logical Reasoning');
                }}
                className="mt-5 w-full"
              >
                Start Practice
              </Button>
            </div>

            {/* Verbal Ability */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  English
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">Verbal Ability</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Synonyms, Antonyms, Grammar Correction, Idioms, and Vocabulary.
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 9 Mins
                  </span>
                  <span>•</span>
                  <span>6 Questions</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                icon={Play}
                onClick={() => {
                  setSelectedCategory('Verbal Ability');
                  handleStartTest('Verbal Ability');
                }}
                className="mt-5 w-full"
              >
                Start Practice
              </Button>
            </div>

          </div>

          {/* Quick Performance Summary Card */}
          <Card title="Past Performance & Accuracy">
            {testResults.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-500">
                You haven't attempted any tests yet. Complete your first test above to establish your aptitude benchmark!
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Total Attempts</span>
                    <p className="text-xl font-black text-slate-900">{testResults.length}</p>
                  </div>
                  <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
                    <span className="text-[10px] text-indigo-500 uppercase font-bold">Average Score</span>
                    <p className="text-xl font-black text-indigo-700">
                      {Math.round(testResults.reduce((acc, c) => acc + (c.percentage || 0), 0) / testResults.length)}%
                    </p>
                  </div>
                  <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                    <span className="text-[10px] text-emerald-600 uppercase font-bold">Best Score</span>
                    <p className="text-xl font-black text-emerald-700">
                      {Math.max(...testResults.map(r => r.percentage || 0))}%
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Readiness Weight</span>
                    <p className="text-xl font-black text-slate-900">20%</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </>
      )}

      {/* View: ACTIVE TEST RUNNER */}
      {viewMode === 'test' && currentQ && (
        <div className="space-y-6">
          
          {/* Test Runner Top Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {selectedCategory === 'All' ? 'Full Mock Test' : selectedCategory}
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Question {currentQuestionIndex + 1} of {activeTestQuestions.length}
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 font-mono font-bold text-sm">
                <Clock className="w-4 h-4 animate-pulse" />
                <span>{formatTimer(timeRemaining)}</span>
              </div>

              <Button
                variant="primary"
                size="sm"
                icon={Send}
                onClick={() => setConfirmSubmitOpen(true)}
              >
                Finish Test
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Main Question Display (3 cols) */}
            <div className="lg:col-span-3 space-y-5">
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="indigo" size="sm">
                    {currentQ.category}
                  </Badge>
                  <Badge variant={currentQ.difficulty === 'Easy' ? 'emerald' : currentQ.difficulty === 'Hard' ? 'rose' : 'amber'} size="sm">
                    {currentQ.difficulty}
                  </Badge>
                </div>

                {/* Question Statement */}
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed whitespace-pre-line mb-6">
                  {currentQ.question}
                </h3>

                {/* Options List */}
                <div className="space-y-3">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = userAnswers[currentQ.id] === idx;
                    const optionLetter = String.fromCharCode(65 + idx); // A, B, C, D

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectOption(currentQ.id, idx)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3.5 ${
                          isSelected
                            ? 'bg-indigo-50/80 border-indigo-600 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors ${
                          isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {optionLetter}
                        </span>
                        <span className="text-sm font-medium text-slate-800 leading-snug">
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Question Bottom Navigation Controls */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={ChevronLeft}
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                  >
                    Previous
                  </Button>

                  <button
                    onClick={() => {
                      const updated = { ...userAnswers };
                      delete updated[currentQ.id];
                      setUserAnswers(updated);
                    }}
                    className="text-xs text-slate-400 hover:text-slate-700 font-medium"
                  >
                    Clear Response
                  </button>

                  <Button
                    variant="primary"
                    size="sm"
                    icon={ChevronRight}
                    iconPosition="right"
                    disabled={currentQuestionIndex === activeTestQuestions.length - 1}
                    onClick={() => setCurrentQuestionIndex(prev => Math.min(activeTestQuestions.length - 1, prev + 1))}
                  >
                    Next Question
                  </Button>
                </div>
              </Card>
            </div>

            {/* Question Navigation Palette (1 col) */}
            <div className="lg:col-span-1 space-y-4">
              <Card title="Question Palette">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Answered: <strong>{answeredCount}</strong></span>
                    <span>Remaining: <strong>{activeTestQuestions.length - answeredCount}</strong></span>
                  </div>

                  {/* Number buttons grid */}
                  <div className="grid grid-cols-5 gap-2">
                    {activeTestQuestions.map((q, idx) => {
                      const isAnswered = userAnswers[q.id] !== undefined;
                      const isCurrent = currentQuestionIndex === idx;

                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentQuestionIndex(idx)}
                          className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                            isCurrent
                              ? 'ring-2 ring-indigo-600 ring-offset-2 bg-indigo-600 text-white'
                              : isAnswered
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-md bg-emerald-500" />
                      <span>Answered ({answeredCount})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-md bg-slate-200" />
                      <span>Unanswered ({activeTestQuestions.length - answeredCount})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-md ring-2 ring-indigo-600 bg-indigo-600" />
                      <span>Active Question</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

          </div>

          {/* Confirm Finish Modal */}
          <ConfirmModal
            isOpen={confirmSubmitOpen}
            onClose={() => setConfirmSubmitOpen(false)}
            onConfirm={handleSubmitTest}
            title="Submit Test"
            message={`You have answered ${answeredCount} out of ${activeTestQuestions.length} questions. Are you ready to submit and calculate your score?`}
            confirmText="Yes, Submit Test"
            confirmVariant="primary"
          />
        </div>
      )}

      {/* View: TEST RESULTS & COMPREHENSIVE EXPLANATIONS */}
      {viewMode === 'result' && currentResult && (
        <div className="space-y-6">
          
          {/* Result Score Card Header */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold rounded-full mb-2">
                  <Award className="w-3.5 h-3.5" />
                  <span>Test Completed Successfully</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900">{currentResult.testTitle}</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Completed in {Math.round(currentResult.timeSpentSeconds / 60)} minutes • Result saved to your permanent profile
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  icon={RotateCcw}
                  onClick={() => setViewMode('lobby')}
                >
                  Back to Aptitude Lobby
                </Button>
              </div>
            </div>

            {/* Scorecard 4-Metric Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
              <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Final Score</span>
                <p className="text-3xl font-black text-indigo-700 mt-1">
                  {currentResult.score} / {currentResult.totalQuestions}
                </p>
                <span className="text-xs font-semibold text-slate-500">{currentResult.percentage}% Score</span>
              </div>

              <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Correct</span>
                <p className="text-3xl font-black text-emerald-700 mt-1">{currentResult.correctCount}</p>
                <span className="text-xs font-semibold text-emerald-600">Questions</span>
              </div>

              <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100 text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">Incorrect</span>
                <p className="text-3xl font-black text-rose-700 mt-1">{currentResult.incorrectCount}</p>
                <span className="text-xs font-semibold text-rose-600">Questions</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Accuracy</span>
                <p className="text-3xl font-black text-slate-800 mt-1">{currentResult.accuracy}%</p>
                <span className="text-xs font-semibold text-slate-500">Attempted Accuracy</span>
              </div>
            </div>
          </div>

          {/* Detailed Question Explanations */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Comprehensive Solutions & Step-by-Step Explanations</h3>
            
            {currentResult.detailedQuestions.map((q, idx) => {
              const isCorrect = q.isCorrect;
              const isAttempted = q.selectedAnswer !== undefined;

              return (
                <div
                  key={q.id}
                  className={`p-5 bg-white rounded-2xl border-2 transition-all ${
                    isCorrect
                      ? 'border-emerald-200'
                      : isAttempted
                      ? 'border-rose-200'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400">Q{idx + 1}.</span>
                      <Badge variant="slate" size="sm">{q.category}</Badge>
                    </div>

                    <div>
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+1)
                        </span>
                      ) : isAttempted ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                          Unattempted
                        </span>
                      )}
                    </div>
                  </div>

                  <h4 className="text-sm font-semibold text-slate-900 mb-4 whitespace-pre-line">
                    {q.question}
                  </h4>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {q.options.map((opt, optIdx) => {
                      const isOptionCorrect = optIdx === q.correctAnswer;
                      const isOptionSelected = optIdx === q.selectedAnswer;

                      let optClass = 'bg-slate-50 border-slate-200 text-slate-700';
                      if (isOptionCorrect) optClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
                      else if (isOptionSelected && !isOptionCorrect) optClass = 'bg-rose-50 border-rose-500 text-rose-900 font-semibold';

                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-xl border text-xs flex items-center justify-between ${optClass}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                            <span>{opt}</span>
                          </div>
                          {isOptionCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                          {isOptionSelected && !isOptionCorrect && <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation box */}
                  <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-100 text-xs text-indigo-950">
                    <strong className="text-indigo-900 block mb-1">💡 Solution & Mathematical Explanation:</strong>
                    <p className="leading-relaxed text-indigo-900">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View: TEST HISTORY */}
      {viewMode === 'history' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Attempted Test History</h2>
              <p className="text-xs text-slate-500 mt-0.5">Review your previous mock scores and progress trajectory</p>
            </div>

            <Button
              variant="primary"
              size="sm"
              icon={RotateCcw}
              onClick={() => setViewMode('lobby')}
            >
              Back to Tests
            </Button>
          </div>

          {testResults.length === 0 ? (
            <Card>
              <div className="text-center py-10 text-xs text-slate-500">
                No past tests recorded yet.
              </div>
            </Card>
          ) : (
            <div className="space-y-3">
              {testResults.map((res) => (
                <div
                  key={res.id}
                  className="p-5 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {res.category}
                    </span>
                    <h4 className="text-base font-bold text-slate-900">{res.testTitle}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Completed on {new Date(res.date).toLocaleDateString()} at {new Date(res.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <span className="text-xl font-black text-indigo-700">{res.percentage}%</span>
                      <p className="text-[11px] text-slate-500">{res.score} / {res.totalQuestions} Correct</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
