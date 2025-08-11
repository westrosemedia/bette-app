import { useState, useEffect } from 'react';
import { 
  SparklesIcon, 
  ClockIcon, 
  CalendarIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { 
  DAILY_GREETINGS, 
  BRAND_DEEPENER_QUESTIONS, 
  CONTENT_TYPES, 
  BRAND_TONES, 
  CONTENT_GOALS, 
  PLATFORMS 
} from '../data/betteVoice';

const DailyPromptGenerator = () => {
  const [currentStep, setCurrentStep] = useState('greeting');
  const [userProfile, setUserProfile] = useState({
    brandTone: '',
    contentGoal: '',
    platforms: [],
    contentType: '',
    currentOffers: '',
    targetAudience: '',
    brandVault: {}
  });
  const [dailyGreeting, setDailyGreeting] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showBrandDeepener, setShowBrandDeepener] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    // Set random daily greeting
    const randomGreeting = DAILY_GREETINGS[Math.floor(Math.random() * DAILY_GREETINGS.length)];
    setDailyGreeting(randomGreeting);
  }, []);

  const handleProfileUpdate = (field, value) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBrandDeepenerAnswer = (answer) => {
    const question = BRAND_DEEPENER_QUESTIONS[currentQuestion];
    setUserProfile(prev => ({
      ...prev,
      brandVault: {
        ...prev.brandVault,
        [question.category]: answer
      }
    }));
    
    if (currentQuestion < BRAND_DEEPENER_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowBrandDeepener(false);
      setCurrentStep('generating');
      generateContentPrompt();
    }
  };

  const generateContentPrompt = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation (replace with actual OpenAI API call)
    setTimeout(() => {
      const prompt = generatePromptFromProfile(userProfile);
      setGeneratedPrompt(prompt);
      setIsGenerating(false);
      setCurrentStep('result');
    }, 2000);
  };

  const generatePromptFromProfile = (profile) => {
    const tone = profile.brandTone || 'sassy';
    const goal = profile.contentGoal || 'engagement';
    const platform = profile.platforms[0] || 'instagram';
    
    const prompts = {
      sassy: {
        sales: `Listen up, queen. You're not here to play small. Share a client result that made you proud (with numbers if you've got 'em). Then tell your audience exactly how to work with you and why waiting is costing them money.`,
        engagement: `Spill the tea on something that's been on your mind lately. What's a behind-the-scenes moment from your business that would surprise people? Be real, be bold, be you.`,
        awareness: `What's the one thing you wish people knew about your industry? Bust a myth, share your truth, and position yourself as the expert you are.`,
        authority: `What's something you believe that most people in your industry disagree with? Take a stand, share your perspective, and show why you're the one to listen to.`,
        community: `What's the transformation your clients experience when they work with you? Tell a story, share a moment, and invite others into your world.`
      },
      luxury: {
        sales: `Excellence isn't accidental. Share a client transformation that showcases your premium value. Then extend an invitation to those ready to invest in their own transformation.`,
        engagement: `Behind every successful brand is a story of resilience. Share a moment that shaped your business philosophy and invite your audience to be part of your journey.`,
        awareness: `In a world of mediocrity, you choose excellence. Share what sets your approach apart and why your audience deserves nothing less than exceptional.`,
        authority: `Leadership isn't about having all the answers—it's about asking the right questions. Share an insight that positions you as a thought leader in your space.`,
        community: `Curated experiences for curated people. Share how you're building a community of high-achievers and invite others to join this exclusive circle.`
      }
    };

    return prompts[tone]?.[goal] || prompts.sassy.engagement;
  };

  const renderGreeting = () => (
    <div className="card-luxury animate-bounce-in">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-bette-blush-500 to-bette-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <SparklesIcon className="h-8 w-8 text-white" />
        </div>
        <h2 className="luxury-text text-3xl text-bette-charcoal-900 mb-4">
          {dailyGreeting}
        </h2>
        <p className="text-bette-charcoal-600 mb-8">
          Let's create some fire content together. I need to know a few things about your brand first.
        </p>
        <button 
          onClick={() => setCurrentStep('brand-tone')}
          className="btn-primary"
        >
          Let's Get Started
          <ArrowRightIcon className="h-5 w-5 ml-2" />
        </button>
      </div>
    </div>
  );

  const renderBrandTone = () => (
    <div className="card-luxury animate-slide-up">
      <h3 className="luxury-text text-2xl text-bette-charcoal-900 mb-6">
        What's your brand voice?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {BRAND_TONES.map((tone) => (
          <button
            key={tone.id}
            onClick={() => {
              handleProfileUpdate('brandTone', tone.id);
              setCurrentStep('content-goal');
            }}
            className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
              userProfile.brandTone === tone.id
                ? 'border-bette-blush-500 bg-bette-blush-50'
                : 'border-bette-charcoal-200 hover:border-bette-blush-300 hover:bg-bette-blush-50'
            }`}
          >
            <h4 className="font-semibold text-bette-charcoal-900 mb-1">
              {tone.name}
            </h4>
            <p className="text-sm text-bette-charcoal-600">
              {tone.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );

  const renderContentGoal = () => (
    <div className="card-luxury animate-slide-up">
      <h3 className="luxury-text text-2xl text-bette-charcoal-900 mb-6">
        What's your content goal today?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {CONTENT_GOALS.map((goal) => (
          <button
            key={goal.id}
            onClick={() => {
              handleProfileUpdate('contentGoal', goal.id);
              setCurrentStep('platforms');
            }}
            className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
              userProfile.contentGoal === goal.id
                ? 'border-bette-blush-500 bg-bette-blush-50'
                : 'border-bette-charcoal-200 hover:border-bette-blush-300 hover:bg-bette-blush-50'
            }`}
          >
            <h4 className="font-semibold text-bette-charcoal-900 mb-1">
              {goal.name}
            </h4>
            <p className="text-sm text-bette-charcoal-600">
              {goal.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );

  const renderPlatforms = () => (
    <div className="card-luxury animate-slide-up">
      <h3 className="luxury-text text-2xl text-bette-charcoal-900 mb-6">
        Where are you posting today?
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {PLATFORMS.map((platform) => (
          <button
            key={platform.id}
            onClick={() => {
              const newPlatforms = userProfile.platforms.includes(platform.id)
                ? userProfile.platforms.filter(p => p !== platform.id)
                : [...userProfile.platforms, platform.id];
              handleProfileUpdate('platforms', newPlatforms);
            }}
            className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
              userProfile.platforms.includes(platform.id)
                ? 'border-bette-blush-500 bg-bette-blush-50'
                : 'border-bette-charcoal-200 hover:border-bette-blush-300 hover:bg-bette-blush-50'
            }`}
          >
            <div className="text-2xl mb-2">{platform.icon}</div>
            <h4 className="font-semibold text-bette-charcoal-900 text-sm">
              {platform.name}
            </h4>
          </button>
        ))}
      </div>
      <button 
        onClick={() => setCurrentStep('brand-deepener')}
        className="btn-primary w-full"
        disabled={userProfile.platforms.length === 0}
      >
        Continue
        <ArrowRightIcon className="h-5 w-5 ml-2" />
      </button>
    </div>
  );

  const renderBrandDeepener = () => {
    const question = BRAND_DEEPENER_QUESTIONS[currentQuestion];
    
    return (
      <div className="card-luxury animate-slide-up">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-bette-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold">{currentQuestion + 1}</span>
          </div>
          <h3 className="luxury-text text-2xl text-bette-charcoal-900 mb-4">
            {question.question}
          </h3>
          <p className="text-bette-charcoal-600">
            This helps me create more personalized content for you.
          </p>
        </div>
        
        <div className="space-y-4">
          <textarea
            placeholder="Share your thoughts..."
            className="input-field h-32 resize-none"
            onChange={(e) => {
              // Store answer temporarily
              const answer = e.target.value;
              if (answer.length > 10) {
                handleBrandDeepenerAnswer(answer);
              }
            }}
          />
        </div>
      </div>
    );
  };

  const renderGenerating = () => (
    <div className="card-luxury animate-slide-up">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-bette-blush-500 to-bette-gold-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <SparklesIcon className="h-8 w-8 text-white" />
        </div>
        <h3 className="luxury-text text-2xl text-bette-charcoal-900 mb-4">
          Creating your content strategy...
        </h3>
        <p className="text-bette-charcoal-600">
          Bette is crafting the perfect prompt for your brand.
        </p>
      </div>
    </div>
  );

  const renderResult = () => (
    <div className="card-luxury animate-slide-up">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-bette-blush-500 to-bette-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircleIcon className="h-8 w-8 text-white" />
        </div>
        <h3 className="luxury-text text-2xl text-bette-charcoal-900 mb-4">
          Here's your content prompt
        </h3>
      </div>
      
      <div className="bg-bette-charcoal-50 rounded-xl p-6 mb-6">
        <p className="text-bette-charcoal-800 text-lg leading-relaxed">
          {generatedPrompt}
        </p>
      </div>
      
      <div className="flex space-x-4">
        <button className="btn-secondary flex-1">
          <CalendarIcon className="h-5 w-5 mr-2" />
          Schedule Post
        </button>
        <button className="btn-primary flex-1">
          <ClockIcon className="h-5 w-5 mr-2" />
          Create Now
        </button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'greeting':
        return renderGreeting();
      case 'brand-tone':
        return renderBrandTone();
      case 'content-goal':
        return renderContentGoal();
      case 'platforms':
        return renderPlatforms();
      case 'brand-deepener':
        return renderBrandDeepener();
      case 'generating':
        return renderGenerating();
      case 'result':
        return renderResult();
      default:
        return renderGreeting();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {renderCurrentStep()}
    </div>
  );
};

export default DailyPromptGenerator; 