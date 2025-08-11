import { useState, useEffect } from 'react';
import {
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  LightBulbIcon,
  HeartIcon,
  UserGroupIcon,
  TrophyIcon,
  StarIcon,
  FireIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

const DailyBrandDeepener = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const dailyQuestions = [
    {
      id: 'brand_evolution',
      question: "How has your brand evolved since you started? What's changed about your voice, values, or approach?",
      category: 'brand_evolution',
      icon: SparklesIcon,
      placeholder: "Share how your brand has grown and evolved over time..."
    },
    {
      id: 'biggest_challenge',
      question: "What's the biggest challenge your ideal client is facing right now?",
      category: 'client_challenges',
      icon: LightBulbIcon,
      placeholder: "Describe the main pain point or struggle your audience is experiencing..."
    },
    {
      id: 'success_story',
      question: "What's a recent success story or transformation you've helped create?",
      category: 'success_stories',
      icon: TrophyIcon,
      placeholder: "Share a specific example of how you've helped a client achieve results..."
    },
    {
      id: 'brand_differentiator',
      question: "What makes you different from others in your industry? What's your unique approach?",
      category: 'differentiation',
      icon: StarIcon,
      placeholder: "Explain what sets you apart and makes your approach unique..."
    },
    {
      id: 'future_vision',
      question: "Where do you see your brand in 2 years? What's your vision?",
      category: 'future_vision',
      icon: AcademicCapIcon,
      placeholder: "Describe your long-term vision for your brand and business..."
    },
    {
      id: 'client_feedback',
      question: "What's the most meaningful feedback you've received from a client?",
      category: 'client_feedback',
      icon: HeartIcon,
      placeholder: "Share a piece of feedback that really resonated with you..."
    },
    {
      id: 'industry_trends',
      question: "What trends are you seeing in your industry that excite or concern you?",
      category: 'industry_insights',
      icon: FireIcon,
      placeholder: "Discuss the trends you're observing and your thoughts on them..."
    },
    {
      id: 'community_impact',
      question: "How do you want to impact your community or industry? What legacy are you building?",
      category: 'impact_legacy',
      icon: UserGroupIcon,
      placeholder: "Share your vision for the impact you want to make..."
    },
    {
      id: 'personal_growth',
      question: "What's something you've learned about yourself or your business recently?",
      category: 'personal_insights',
      icon: SparklesIcon,
      placeholder: "Reflect on a recent lesson or insight that's shaped your approach..."
    },
    {
      id: 'brand_authenticity',
      question: "What's something about your brand that you're most proud of being authentic about?",
      category: 'authenticity',
      icon: HeartIcon,
      placeholder: "Share what makes you feel most authentic and aligned in your brand..."
    }
  ];

  useEffect(() => {
    // Get today's date and use it to determine which question to show
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const questionIndex = dayOfYear % dailyQuestions.length;

    setCurrentQuestion(dailyQuestions[questionIndex]);

    // Check if today's question was already answered
    const todayKey = today.toISOString().split('T')[0];
    const answeredToday = localStorage.getItem(`bette_daily_${todayKey}`);
    if (answeredToday) {
      setIsCompleted(true);
    }
  }, []);

  const handleSubmit = async () => {
    if (!answer.trim() || answer.length < 20) return;

    setIsSubmitting(true);

    // Save the answer
    const today = new Date().toISOString().split('T')[0];
    const brandVault = JSON.parse(localStorage.getItem('bette_brand_vault') || '{}');

    brandVault[currentQuestion.category] = {
      ...brandVault[currentQuestion.category],
      [today]: {
        question: currentQuestion.question,
        answer: answer,
        timestamp: new Date().toISOString()
      }
    };

    localStorage.setItem('bette_brand_vault', JSON.stringify(brandVault));
    localStorage.setItem(`bette_daily_${today}`, 'true');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsCompleted(true);

    if (onComplete) {
      onComplete({
        question: currentQuestion,
        answer: answer,
        category: currentQuestion.category
      });
    }
  };

  const skipQuestion = () => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`bette_daily_${today}`, 'skipped');
    setIsCompleted(true);
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="body-text text-gray-600">Loading today's question...</p>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="card-luxury max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircleIcon className="h-10 w-10 text-white" />
          </div>
          <h2 className="display-text text-3xl text-gray-900 mb-6">
            Daily Brand Deepener Complete
          </h2>
          <p className="body-text text-xl text-gray-600 mb-8">
            Thanks for sharing! Bette is learning more about your brand voice every day.
          </p>
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <h3 className="display-text text-lg text-gray-900 mb-3">
              Today's Question:
            </h3>
            <p className="body-text text-gray-700">
              {currentQuestion.question}
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Continue to BETTE
          </button>
        </div>
      </div>
    );
  }

  const Icon = currentQuestion.icon;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon className="h-8 w-8 text-white" />
          </div>
          <h1 className="display-text text-2xl text-gray-900 mb-2">
            Daily Brand Deepener
          </h1>
          <p className="body-text text-gray-600">
            One question to help Bette understand your brand better
          </p>
        </div>

        {/* Question Card */}
        <div className="card-luxury mb-8">
          <h2 className="display-text text-2xl text-gray-900 mb-6 text-center">
            {currentQuestion.question}
          </h2>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="w-full h-48 p-6 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none body-text text-lg mb-4"
          />

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {answer.length} characters
            </span>
            <span className="text-sm text-gray-500">
              Minimum 20 characters
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={skipQuestion}
            className="body-text text-gray-600 hover:text-gray-900 transition-colors"
          >
            Skip for today
          </button>

          <button
            onClick={handleSubmit}
            disabled={!answer.trim() || answer.length < 20 || isSubmitting}
            className={`flex items-center space-x-2 px-8 py-4 rounded-xl transition-all duration-300 ${
              answer.trim() && answer.length >= 20 && !isSubmitting
                ? 'bg-black text-white hover:bg-gray-900 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span className="body-text font-medium">
              {isSubmitting ? 'Saving...' : 'Save Answer'}
            </span>
            {!isSubmitting && <ArrowRightIcon className="h-5 w-5" />}
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <span className="body-text text-sm text-gray-600">
              Building your brand voice, one day at a time
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyBrandDeepener;
