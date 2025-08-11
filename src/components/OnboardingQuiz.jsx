import { useState, useEffect } from 'react';
import { 
  SparklesIcon, 
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  HeartIcon,
  UserGroupIcon,
  TrophyIcon,
  StarIcon,
  FireIcon,
  CrownIcon,
  MegaphoneIcon,
  CurrencyDollarIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const OnboardingQuiz = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const quizSteps = [
    {
      id: 'welcome',
      title: "Welcome to BETTE",
      subtitle: "Your AI content strategist",
      type: 'welcome',
      icon: SparklesIcon
    },
    {
      id: 'audience_feeling',
      title: "How do you want your audience to feel when they see your content?",
      subtitle: "Describe the emotional impact you want to create",
      type: 'text',
      placeholder: "Example: I want them to feel lit up, seen, and like they've finally found someone who 'gets it.' I want them inspired to move, confident in their decisions, and part of something bigger.",
      icon: HeartIcon
    },
    {
      id: 'brand_personality',
      title: "What's your brand's personality in three words?",
      subtitle: "Choose the traits that best represent your voice",
      type: 'text',
      placeholder: "Example: Bold. Visionary. No-chill.",
      icon: CrownIcon
    },
    {
      id: 'signature_phrases',
      title: "What three phrases, words, or ideas are signature 'you'?",
      subtitle: "Your unique language and catchphrases",
      type: 'text',
      placeholder: 'Example: "Paid like an icon," "You\'re unforgettable," "When the world sees you as iconic, they pay you like you are."',
      icon: MegaphoneIcon
    },
    {
      id: 'never_use',
      title: "What words, tones, or phrases should Bette never use?",
      subtitle: "Your content boundaries and deal-breakers",
      type: 'text',
      placeholder: "Example: No cheesy empowerment clichés, no corporate jargon, no watered-down 'girlboss' language—ever.",
      icon: EyeIcon
    },
    {
      id: 'industry_ick',
      title: "What makes you cringe ('ick') in your industry?",
      subtitle: "The things that turn you off",
      type: 'text',
      placeholder: "Example: Overhyped income claims, copycat branding, vague offers, fake scarcity, and performative empowerment without strategy.",
      icon: FireIcon
    },
    {
      id: 'ideal_audience',
      title: "Who is your ideal audience?",
      subtitle: "Describe your target client in detail",
      type: 'text',
      placeholder: "Example: High-achieving entrepreneurs scaling past six figures who value quality, want to stand out, but need strategy, not slog.",
      icon: UserGroupIcon
    },
    {
      id: 'transformation',
      title: "What transformation do you deliver?",
      subtitle: "The specific change you create for clients",
      type: 'text',
      placeholder: "Example: I take content off their plate so they focus on money and impact. They go from invisible and overwhelmed to magnetic, visible, and in demand.",
      icon: TrophyIcon
    },
    {
      id: 'vibe_matches',
      title: "List 3–5 people whose vibe matches yours",
      subtitle: "People whose energy and style you align with",
      type: 'text',
      placeholder: "Example: Savannah Jordan, Leila Hormozi, Abby Wambach, Jenna Lyons.",
      icon: StarIcon
    },
    {
      id: 'content_positioning',
      title: "How should your content position you?",
      subtitle: "The role you want to play in your audience's mind",
      type: 'text',
      placeholder: "Example: As the high-level partner who sees what they need before they do—strategist, creative director, fixer.",
      icon: CrownIcon
    },
    {
      id: 'content_types',
      title: "What content types do you want?",
      subtitle: "The formats and styles you prefer",
      type: 'text',
      placeholder: "Example: Storytelling captions, offer strategy posts, behind-the-scenes clarity, educational value, and emotionally resonant content.",
      icon: ChatBubbleLeftRightIcon
    },
    {
      id: 'writing_style',
      title: "What's your writing style non-negotiable?",
      subtitle: "Your signature writing approach",
      type: 'text',
      placeholder: "Example: Short, punchy sentences with longer, storytelling captions when needed. Conversational, high-end, always ending with a mic-drop.",
      icon: MegaphoneIcon
    },
    {
      id: 'visual_style',
      title: "Visual style notes?",
      subtitle: "Your aesthetic preferences and boundaries",
      type: 'text',
      placeholder: "Example: Bold, cinematic imagery. Rich colors. Editorial polish. No generic stock.",
      icon: EyeIcon
    },
    {
      id: 'sensitive_topics',
      title: "Sensitive topics or boundaries?",
      subtitle: "What to avoid or handle carefully",
      type: 'text',
      placeholder: "Example: Queer-owned, fiercely inclusive. Safe space for women and LGBTQIA+ founders. Speak with clarity, confidence, and respect. No tokenism.",
      icon: HeartIcon
    },
    {
      id: 'financial_goals',
      title: "Your 12-month financial goals?",
      subtitle: "Your revenue targets and business vision",
      type: 'text',
      placeholder: "Example: Hit $20K/month recurring, maintain 4–5 high-level retainers, plus $50K+ per launch.",
      icon: CurrencyDollarIcon
    },
    {
      id: 'launch_frequency',
      title: "Launch frequency ambition?",
      subtitle: "How often you want to launch offers",
      type: 'text',
      placeholder: "Example: 2–3 main launches per year—plus smaller offers in between for steady cash flow.",
      icon: FireIcon
    },
    {
      id: 'post_offer_result',
      title: "After you post a new offer, what usually happens?",
      subtitle: "Your typical launch experience",
      type: 'text',
      placeholder: "Example: I either sell out instantly, get a few loyal buyers quickly, or hear crickets—and then push harder.",
      icon: TrophyIcon
    },
    {
      id: 'sales_timing',
      title: "Do most sales happen immediately or after reminders?",
      subtitle: "Your audience's buying behavior",
      type: 'text',
      placeholder: "Example: Sometimes they buy right away; other times I need to nurture heavily with storytelling and proof.",
      icon: CurrencyDollarIcon
    },
    {
      id: 'sales_sources',
      title: "Where do most purchases come from?",
      subtitle: "Your top converting channels",
      type: 'text',
      placeholder: "Example: DMs, email list, live events, referrals, and my own content flow.",
      icon: UserGroupIcon
    },
    {
      id: 'buyer_type',
      title: "Are buyers longtime followers or fresh leads?",
      subtitle: "Your customer journey insights",
      type: 'text',
      placeholder: "Example: Some are longtime followers; others are new—but they all need strategic clarity before they pull the trigger.",
      icon: UserGroupIcon
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
              This comprehensive intake will help Bette understand your exact brand voice, audience behavior, and creative direction so she can create content that converts—using high-impact storytelling inspired by the best in the business.
            </p>
          </div>
        );

      case 'text':
        return (
          <div>
            <div className="text-center mb-8">
              {Icon && (
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="h-8 w-8 text-white" />
                </div>
              )}
              <h2 className="display-text text-3xl text-gray-900 mb-4">
                {step.title}
              </h2>
              <p className="body-text text-lg text-gray-600">
                {step.subtitle}
              </p>
            </div>
            
            <textarea
              value={answers[step.id] || ''}
              onChange={(e) => handleAnswer(step.id, e.target.value)}
              placeholder={step.placeholder}
              className="w-full h-48 p-6 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none body-text text-lg"
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
            <div className="bg-gray-50 rounded-2xl p-8 max-w-3xl mx-auto">
              <h3 className="display-text text-2xl text-gray-900 mb-6">
                Brand Voice Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="display-text text-lg text-gray-900 mb-3">Brand Personality</h4>
                  <p className="body-text text-gray-700 mb-4">
                    {answers.brand_personality || 'Not specified'}
                  </p>
                  
                  <h4 className="display-text text-lg text-gray-900 mb-3">Signature Phrases</h4>
                  <p className="body-text text-gray-700 mb-4">
                    {answers.signature_phrases || 'Not specified'}
                  </p>
                  
                  <h4 className="display-text text-lg text-gray-900 mb-3">Ideal Audience</h4>
                  <p className="body-text text-gray-700 mb-4">
                    {answers.ideal_audience || 'Not specified'}
                  </p>
                </div>
                <div>
                  <h4 className="display-text text-lg text-gray-900 mb-3">Transformation</h4>
                  <p className="body-text text-gray-700 mb-4">
                    {answers.transformation || 'Not specified'}
                  </p>
                  
                  <h4 className="display-text text-lg text-gray-900 mb-3">Content Positioning</h4>
                  <p className="body-text text-gray-700 mb-4">
                    {answers.content_positioning || 'Not specified'}
                  </p>
                  
                  <h4 className="display-text text-lg text-gray-900 mb-3">Financial Goals</h4>
                  <p className="body-text text-gray-700 mb-4">
                    {answers.financial_goals || 'Not specified'}
                  </p>
                </div>
              </div>
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
