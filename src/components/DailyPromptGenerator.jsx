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

const DailyPromptGenerator = ({ userProfile }) => {
  const [currentStep, setCurrentStep] = useState('greeting');
  const [userProfileData, setUserProfileData] = useState({
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

    // Load user profile data if available
    if (userProfile) {
      setUserProfileData(prev => ({
        ...prev,
        brandTone: userProfile.brand_personality?.[0] || '',
        targetAudience: userProfile.target_audience || '',
        contentGoal: userProfile.content_goals?.[0] || '',
        brandVault: {
          brand_values: userProfile.brand_values || '',
          brand_voice_examples: userProfile.brand_voice_examples || '',
          business_type: userProfile.business_type || ''
        }
      }));
    }
  }, [userProfile]);

  const handleProfileUpdate = (field, value) => {
    setUserProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBrandDeepenerAnswer = (answer) => {
    const question = BRAND_DEEPENER_QUESTIONS[currentQuestion];
    setUserProfileData(prev => ({
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
      const prompt = generatePromptFromProfile(userProfileData);
      setGeneratedPrompt(prompt);
      setIsGenerating(false);
      setCurrentStep('result');
    }, 2000);
  };

  const generatePromptFromProfile = (profile) => {
    const tone = profile.brandTone || 'sassy';
    const goal = profile.contentGoal || 'engagement';
    const platform = profile.platforms[0] || 'instagram';
    const businessType = profile.brandVault?.business_type || 'business';
    const targetAudience = profile.targetAudience || 'your audience';
    const brandValues = profile.brandVault?.brand_values || '';
    const voiceExamples = profile.brandVault?.brand_voice_examples || '';
    
    // Create personalized prompts based on user profile
    const personalizedPrompts = {
      coach: {
        sales: `Listen up, queen. You're not here to play small. Share a client transformation that made you proud (with specific results if you've got 'em). Then tell ${targetAudience} exactly how to work with you and why waiting is costing them money.`,
        engagement: `Spill the tea on something that's been on your mind lately about coaching. What's a behind-the-scenes moment from your coaching practice that would surprise people? Be real, be bold, be you.`,
        awareness: `What's the one thing you wish people knew about coaching that most people get wrong? Bust a myth, share your truth, and position yourself as the expert you are.`,
        authority: `What's something you believe about coaching that most people in your industry disagree with? Take a stand, share your perspective, and show why you're the one to listen to.`,
        community: `What's the transformation your coaching clients experience when they work with you? Tell a story, share a moment, and invite others into your world.`
      },
      consultant: {
        sales: `Excellence isn't accidental. Share a client transformation that showcases your premium consulting value. Then extend an invitation to ${targetAudience} who are ready to invest in their own transformation.`,
        engagement: `Behind every successful brand is a story of resilience. Share a moment that shaped your consulting philosophy and invite ${targetAudience} to be part of your journey.`,
        awareness: `In a world of mediocrity, you choose excellence. Share what sets your consulting approach apart and why ${targetAudience} deserve nothing less than exceptional.`,
        authority: `Leadership isn't about having all the answers—it's about asking the right questions. Share an insight that positions you as a thought leader in your space.`,
        community: `Curated experiences for curated people. Share how you're building a community of high-achievers and invite ${targetAudience} to join this exclusive circle.`
      },
      creator: {
        sales: `Your content isn't just content—it's transformation. Share a piece of content that created real change for your audience. Then show ${targetAudience} how to work with you for more of that magic.`,
        engagement: `What's the story behind your most viral piece of content? Share the real, behind-the-scenes version that your audience never saw.`,
        awareness: `What's the biggest misconception about content creation that drives you crazy? Set the record straight and show your expertise.`,
        authority: `What's your unique take on content creation that sets you apart? Share your perspective and why it matters.`,
        community: `How do you want your content to impact your community? Share your vision and invite others to be part of it.`
      }
    };

    // Use business-specific prompts if available, otherwise fall back to tone-based prompts
    const businessPrompts = personalizedPrompts[businessType];
    if (businessPrompts && businessPrompts[goal]) {
      return businessPrompts[goal];
    }

    // Fallback to tone-based prompts
    const prompts = {
      sassy: {
        sales: `Listen up, queen. You're not here to play small. Share a client result that made you proud (with numbers if you've got 'em). Then tell ${targetAudience} exactly how to work with you and why waiting is costing them money.`,
        engagement: `Spill the tea on something that's been on your mind lately. What's a behind-the-scenes moment from your business that would surprise people? Be real, be bold, be you.`,
        awareness: `What's the one thing you wish people knew about your industry? Bust a myth, share your truth, and position yourself as the expert you are.`,
        authority: `What's something you believe that most people in your industry disagree with? Take a stand, share your perspective, and show why you're the one to listen to.`,
        community: `What's the transformation your clients experience when they work with you? Tell a story, share a moment, and invite others into your world.`
      },
      luxury: {
        sales: `Excellence isn't accidental. Share a client transformation that showcases your premium value. Then extend an invitation to ${targetAudience} who are ready to invest in their own transformation.`,
        engagement: `Behind every successful brand is a story of resilience. Share a moment that shaped your business philosophy and invite ${targetAudience} to be part of your journey.`,
        awareness: `In a world of mediocrity, you choose excellence. Share what sets your approach apart and why ${targetAudience} deserve nothing less than exceptional.`,
        authority: `Leadership isn't about having all the answers—it's about asking the right questions. Share an insight that positions you as a thought leader in your space.`,
        community: `Curated experiences for curated people. Share how you're building a community of high-achievers and invite ${targetAudience} to join this exclusive circle.`
      }
    };

    return prompts[tone]?.[goal] || prompts.sassy.engagement;
  };

  const renderGreeting = () => (
    <div className="hero-section">
      <div className="card-luxury max-w-2xl mx-auto text-center animate-fade-in">
        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-8">
          <SparklesIcon className="h-10 w-10 text-white" />
        </div>
        <h2 className="display-text text-4xl text-gray-900 mb-6">
          {dailyGreeting}
        </h2>
        <p className="body-text text-xl text-gray-600 mb-12 leading-relaxed">
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
    <div className="section">
      <div className="card-luxury max-w-4xl mx-auto animate-slide-up">
        <h3 className="display-text text-3xl text-gray-900 mb-12 text-center">
          What's your brand voice?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BRAND_TONES.map((tone) => (
            <button
              key={tone.id}
              onClick={() => {
                handleProfileUpdate('brandTone', tone.id);
                setCurrentStep('content-goal');
              }}
              className={`p-8 rounded-2xl border-2 transition-all duration-300 text-left hover:shadow-lg ${
                userProfileData.brandTone === tone.id
                  ? 'border-gray-900 bg-black text-white'
                  : 'border-gray-200 hover:border-gray-900 hover:bg-gray-50'
              }`}
            >
              <h4 className="display-text text-xl mb-3">
                {tone.name}
              </h4>
              <p className="body-text text-base opacity-80">
                {tone.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContentGoal = () => (
    <div className="section">
      <div className="card-luxury max-w-4xl mx-auto animate-slide-up">
        <h3 className="display-text text-3xl text-gray-900 mb-12 text-center">
          What's your content goal today?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CONTENT_GOALS.map((goal) => (
            <button
              key={goal.id}
              onClick={() => {
                handleProfileUpdate('contentGoal', goal.id);
                setCurrentStep('platforms');
              }}
              className={`p-8 rounded-2xl border-2 transition-all duration-300 text-left hover:shadow-lg ${
                userProfileData.contentGoal === goal.id
                  ? 'border-gray-900 bg-black text-white'
                  : 'border-gray-200 hover:border-gray-900 hover:bg-gray-50'
              }`}
            >
              <h4 className="display-text text-xl mb-3">
                {goal.name}
              </h4>
              <p className="body-text text-base opacity-80">
                {goal.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPlatforms = () => (
    <div className="section">
      <div className="card-luxury max-w-4xl mx-auto animate-slide-up">
        <h3 className="display-text text-3xl text-gray-900 mb-12 text-center">
          Where are you posting today?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {PLATFORMS.map((platform) => (
            <button
              key={platform.id}
              onClick={() => {
                const newPlatforms = userProfileData.platforms.includes(platform.id)
                  ? userProfileData.platforms.filter(p => p !== platform.id)
                  : [...userProfileData.platforms, platform.id];
                handleProfileUpdate('platforms', newPlatforms);
              }}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 text-center hover:shadow-lg ${
                userProfileData.platforms.includes(platform.id)
                  ? 'border-gray-900 bg-black text-white'
                  : 'border-gray-200 hover:border-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="text-3xl mb-3">{platform.icon}</div>
              <h4 className="display-text text-sm">
                {platform.name}
              </h4>
            </button>
          ))}
        </div>
        <button 
          onClick={() => setCurrentStep('brand-deepener')}
          className="btn-primary w-full"
          disabled={userProfileData.platforms.length === 0}
        >
          Continue
          <ArrowRightIcon className="h-5 w-5 ml-2" />
        </button>
      </div>
    </div>
  );

  const renderBrandDeepener = () => {
    const question = BRAND_DEEPENER_QUESTIONS[currentQuestion];
    
    return (
      <div className="section">
        <div className="card-luxury max-w-3xl mx-auto animate-slide-up">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="display-text text-white font-bold text-xl">{currentQuestion + 1}</span>
            </div>
            <h3 className="display-text text-3xl text-gray-900 mb-6">
              {question.question}
            </h3>
            <p className="body-text text-lg text-gray-600">
              This helps me create more personalized content for you.
            </p>
          </div>
          
          <div className="space-y-6">
            <textarea
              placeholder="Share your thoughts..."
              className="input-field h-40 resize-none"
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
      </div>
    );
  };

  const renderGenerating = () => (
    <div className="hero-section">
      <div className="card-luxury max-w-2xl mx-auto text-center animate-fade-in">
        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
          <SparklesIcon className="h-10 w-10 text-white" />
        </div>
        <h3 className="display-text text-3xl text-gray-900 mb-6">
          Creating your content strategy...
        </h3>
        <p className="body-text text-xl text-gray-600">
          Bette is crafting the perfect prompt for your brand.
        </p>
      </div>
    </div>
  );

  const renderResult = () => (
    <div className="section">
      <div className="card-luxury max-w-3xl mx-auto animate-slide-up">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircleIcon className="h-10 w-10 text-white" />
          </div>
          <h3 className="display-text text-3xl text-gray-900 mb-6">
            Here's your content prompt
          </h3>
        </div>
        
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <p className="body-text text-xl text-gray-800 leading-relaxed">
            {generatedPrompt}
          </p>
        </div>
        
        <div className="flex space-x-6">
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
    <div>
      {renderCurrentStep()}
    </div>
  );
};

export default DailyPromptGenerator; 