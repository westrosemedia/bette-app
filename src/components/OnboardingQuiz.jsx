import { useState, useEffect } from 'react';
import { 
  SparklesIcon, 
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  UserIcon,
  BuildingOfficeIcon,
  MegaphoneIcon,
  HeartIcon,
  GlobeAltIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

const OnboardingQuiz = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const quizSteps = [
    {
      id: 'welcome',
      title: "Welcome to BETTE",
      subtitle: "Let's train your AI content strategist",
      type: 'welcome',
      icon: SparklesIcon
    },
    {
      id: 'business_type',
      title: "What type of business do you run?",
      subtitle: "This helps Bette understand your industry and audience",
      type: 'multiple_choice',
      options: [
        { id: 'coach', label: 'Business Coach', icon: UserIcon },
        { id: 'consultant', label: 'Consultant', icon: BuildingOfficeIcon },
        { id: 'creator', label: 'Content Creator', icon: MegaphoneIcon },
        { id: 'service', label: 'Service Provider', icon: HeartIcon },
        { id: 'product', label: 'Product Business', icon: GlobeAltIcon },
        { id: 'other', label: 'Other', icon: CurrencyDollarIcon }
      ]
    },
    {
      id: 'brand_personality',
      title: "How would you describe your brand personality?",
      subtitle: "Choose the traits that best represent your voice",
      type: 'multi_select',
      options: [
        { id: 'bold', label: 'Bold & Confident' },
        { id: 'luxury', label: 'Luxury & Premium' },
        { id: 'authentic', label: 'Authentic & Real' },
        { id: 'professional', label: 'Professional & Expert' },
        { id: 'friendly', label: 'Friendly & Approachable' },
        { id: 'sassy', label: 'Sassy & Direct' },
        { id: 'inspirational', label: 'Inspirational & Motivational' },
        { id: 'educational', label: 'Educational & Informative' }
      ]
    },
    {
      id: 'target_audience',
      title: "Who is your ideal client?",
      subtitle: "Describe your target audience",
      type: 'text',
      placeholder: "e.g., Ambitious female entrepreneurs aged 30-45 who want to scale their service business to 6-figures..."
    },
    {
      id: 'content_goals',
      title: "What are your main content goals?",
      subtitle: "Select all that apply",
      type: 'multi_select',
      options: [
        { id: 'awareness', label: 'Build Brand Awareness' },
        { id: 'engagement', label: 'Increase Engagement' },
        { id: 'leads', label: 'Generate Leads' },
        { id: 'sales', label: 'Drive Sales' },
        { id: 'authority', label: 'Establish Authority' },
        { id: 'community', label: 'Build Community' },
        { id: 'education', label: 'Educate Audience' },
        { id: 'inspiration', label: 'Inspire Action' }
      ]
    },
    {
      id: 'brand_values',
      title: "What are your core brand values?",
      subtitle: "What principles guide your business?",
      type: 'text',
      placeholder: "e.g., Excellence, Authenticity, Empowerment, Innovation..."
    },
    {
      id: 'content_style',
      title: "What's your preferred content style?",
      subtitle: "How do you like to communicate?",
      type: 'multiple_choice',
      options: [
        { id: 'storytelling', label: 'Storytelling & Personal Stories' },
        { id: 'educational', label: 'Educational & How-To' },
        { id: 'inspirational', label: 'Inspirational & Motivational' },
        { id: 'behind_scenes', label: 'Behind-the-Scenes & Authentic' },
        { id: 'results', label: 'Results & Case Studies' },
        { id: 'conversational', label: 'Conversational & Chatty' }
      ]
    },
    {
      id: 'brand_voice_examples',
      title: "Share some examples of your brand voice",
      subtitle: "Paste a few sentences that sound like you",
      type: 'text',
      placeholder: "e.g., 'Listen up, queen. You're not here to play small. Share a client result that made you proud...'"
    },
    {
      id: 'completion',
      title: "Perfect! Bette is learning your voice",
      subtitle: "Your AI content strategist is ready to create personalized content for you",
      type: 'completion',
      icon: CheckCircleIcon
    }
  ];

  const handleAnswer = (stepId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [stepId]: answer
    }));
  };

  const handleNext = () => {
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    
    // Simulate saving to backend
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Save to localStorage for now (replace with backend call)
    localStorage.setItem('bette_user_profile', JSON.stringify(answers));
    localStorage.setItem('bette_onboarding_complete', 'true');
    
    setIsLoading(false);
    onComplete(answers);
  };

  const canProceed = () => {
    const currentStepData = quizSteps[currentStep];
    const currentAnswer = answers[currentStepData.id];
    
    if (currentStepData.type === 'welcome' || currentStepData.type === 'completion') {
      return true;
    }
    
    if (currentStepData.type === 'multiple_choice') {
      return currentAnswer;
    }
    
    if (currentStepData.type === 'multi_select') {
      return currentAnswer && currentAnswer.length > 0;
    }
    
    if (currentStepData.type === 'text') {
      return currentAnswer && currentAnswer.trim().length > 10;
    }
    
    return false;
  };

  const renderStep = () => {
    const step = quizSteps[currentStep];
    const Icon = step.icon;

    switch (step.type) {
      case 'welcome':
        return (
          <div className="text-center">
            {Icon && (
              <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-8">
                <Icon className="h-12 w-12 text-white" />
              </div>
            )}
            <h2 className="display-text text-4xl text-gray-900 mb-6">
              {step.title}
            </h2>
            <p className="body-text text-xl text-gray-600 mb-12 leading-relaxed">
              {step.subtitle}
            </p>
            <p className="body-text text-lg text-gray-500 max-w-2xl mx-auto">
              This quick quiz will help Bette understand your brand voice, audience, and goals so she can create personalized content that sounds exactly like you.
            </p>
          </div>
        );

      case 'multiple_choice':
        return (
          <div>
            <h2 className="display-text text-3xl text-gray-900 mb-4 text-center">
              {step.title}
            </h2>
            <p className="body-text text-lg text-gray-600 mb-12 text-center">
              {step.subtitle}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {step.options.map((option) => {
                const OptionIcon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(step.id, option.id)}
                    className={`p-8 rounded-2xl border-2 transition-all duration-300 text-left hover:shadow-lg ${
                      answers[step.id] === option.id
                        ? 'border-gray-900 bg-black text-white'
                        : 'border-gray-200 hover:border-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {OptionIcon && (
                      <OptionIcon className="h-8 w-8 mb-4" />
                    )}
                    <h3 className="display-text text-xl">
                      {option.label}
                    </h3>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 'multi_select':
        return (
          <div>
            <h2 className="display-text text-3xl text-gray-900 mb-4 text-center">
              {step.title}
            </h2>
            <p className="body-text text-lg text-gray-600 mb-12 text-center">
              {step.subtitle}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {step.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    const currentAnswers = answers[step.id] || [];
                    const newAnswers = currentAnswers.includes(option.id)
                      ? currentAnswers.filter(id => id !== option.id)
                      : [...currentAnswers, option.id];
                    handleAnswer(step.id, newAnswers);
                  }}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg ${
                    (answers[step.id] || []).includes(option.id)
                      ? 'border-gray-900 bg-black text-white'
                      : 'border-gray-200 hover:border-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <h3 className="display-text text-lg">
                    {option.label}
                  </h3>
                </button>
              ))}
            </div>
          </div>
        );

      case 'text':
        return (
          <div>
            <h2 className="display-text text-3xl text-gray-900 mb-4 text-center">
              {step.title}
            </h2>
            <p className="body-text text-lg text-gray-600 mb-12 text-center">
              {step.subtitle}
            </p>
            <textarea
              value={answers[step.id] || ''}
              onChange={(e) => handleAnswer(step.id, e.target.value)}
              placeholder={step.placeholder}
              className="w-full h-40 p-6 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none body-text text-lg"
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              {answers[step.id] ? `${answers[step.id].length} characters` : '0 characters'}
            </p>
          </div>
        );

      case 'completion':
        return (
          <div className="text-center">
            {Icon && (
              <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-8">
                <Icon className="h-12 w-12 text-white" />
              </div>
            )}
            <h2 className="display-text text-4xl text-gray-900 mb-6">
              {step.title}
            </h2>
            <p className="body-text text-xl text-gray-600 mb-12 leading-relaxed">
              {step.subtitle}
            </p>
            <div className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="display-text text-2xl text-gray-900 mb-4">
                What Bette learned about you:
              </h3>
              <ul className="body-text text-lg text-gray-700 space-y-2 text-left">
                {Object.entries(answers).map(([key, value]) => {
                  const stepData = quizSteps.find(s => s.id === key);
                  if (!stepData || stepData.type === 'welcome') return null;
                  
                  let displayValue = value;
                  if (Array.isArray(value)) {
                    displayValue = value.join(', ');
                  }
                  
                  return (
                    <li key={key} className="flex items-start">
                      <span className="text-black font-semibold mr-2">•</span>
                      <span><strong>{stepData.title}:</strong> {displayValue}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="body-text text-sm text-gray-600">
              Step {currentStep + 1} of {quizSteps.length}
            </span>
            <span className="body-text text-sm text-gray-600">
              {Math.round(((currentStep + 1) / quizSteps.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-black h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / quizSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Quiz Content */}
        <div className="card-luxury">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="body-text font-medium">Back</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed() || isLoading}
            className={`flex items-center space-x-2 px-8 py-4 rounded-xl transition-all duration-300 ${
              canProceed() && !isLoading
                ? 'bg-black text-white hover:bg-gray-900 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span className="body-text font-medium">
              {isLoading ? 'Training Bette...' : currentStep === quizSteps.length - 1 ? 'Get Started' : 'Next'}
            </span>
            {!isLoading && <ArrowRightIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingQuiz;
