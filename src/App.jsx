import { useState, useEffect } from 'react';
import { 
  SparklesIcon,
  ClockIcon, 
  UserIcon, 
  CogIcon, 
  ChartBarIcon,
  BellIcon,
  MagnifyingGlassIcon,
  HomeIcon,
  CalendarIcon,
  TrophyIcon,
  PhotoIcon,
  BookOpenIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import DailyPromptGenerator from './components/DailyPromptGenerator';
import SmartScheduler from './components/SmartScheduler';
import OnboardingQuiz from './components/OnboardingQuiz';
import DailyBrandDeepener from './components/DailyBrandDeepener';

function App() {
  const [activeTab, setActiveTab] = useState('daily-prompt');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appState, setAppState] = useState('loading'); // 'loading', 'onboarding', 'daily-deepener', 'main'
  const [userProfile, setUserProfile] = useState(null);

  const navigation = [
    { id: 'daily-prompt', name: 'Daily Prompt', icon: SparklesIcon },
    { id: 'scheduler', name: 'Scheduler', icon: ClockIcon },
    { id: 'content-vault', name: 'Content Vault', icon: PhotoIcon },
    { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
    { id: 'brand-vault', name: 'Brand Vault', icon: BookOpenIcon },
    { id: 'achievements', name: 'Achievements', icon: TrophyIcon },
  ];

  useEffect(() => {
    // TEMPORARY: Clear localStorage to force onboarding for testing
    localStorage.removeItem('bette_onboarding_complete');
    localStorage.removeItem('bette_user_profile');
    
    // Check if user has completed onboarding
    const onboardingComplete = localStorage.getItem('bette_onboarding_complete');
    const userProfileData = localStorage.getItem('bette_user_profile');
    
    if (!onboardingComplete) {
      setAppState('onboarding');
    } else {
      // Check if daily brand deepener is needed
      const today = new Date().toISOString().split('T')[0];
      const dailyCompleted = localStorage.getItem(`bette_daily_${today}`);
      
      if (!dailyCompleted) {
        setAppState('daily-deepener');
      } else {
        setAppState('main');
      }
      
      if (userProfileData) {
        setUserProfile(JSON.parse(userProfileData));
      }
    }
  }, []);

  const handleOnboardingComplete = (profileData) => {
    setUserProfile(profileData);
    setAppState('daily-deepener');
  };

  const handleDailyDeepenerComplete = () => {
    setAppState('main');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'daily-prompt':
        return <DailyPromptGenerator userProfile={userProfile} />;
      case 'scheduler':
        return <SmartScheduler />;
      case 'content-vault':
        return <div className="hero-section">
          <div className="text-center">
            <PhotoIcon className="h-24 w-24 text-gray-400 mx-auto mb-8" />
            <h2 className="display-text text-4xl text-gray-900 mb-6">Content Vault</h2>
            <p className="body-text text-xl text-gray-600 max-w-2xl mx-auto">
              Upload your brand assets and track usage with editorial precision.
            </p>
          </div>
        </div>;
      case 'analytics':
        return <div className="hero-section">
          <div className="text-center">
            <ChartBarIcon className="h-24 w-24 text-gray-400 mx-auto mb-8" />
            <h2 className="display-text text-4xl text-gray-900 mb-6">Analytics</h2>
            <p className="body-text text-xl text-gray-600 max-w-2xl mx-auto">
              Track your content performance and goals with refined insights.
            </p>
          </div>
        </div>;
      case 'brand-vault':
        return <div className="hero-section">
          <div className="text-center">
            <BookOpenIcon className="h-24 w-24 text-gray-400 mx-auto mb-8" />
            <h2 className="display-text text-4xl text-gray-900 mb-6">Brand Vault</h2>
            <p className="body-text text-xl text-gray-600 max-w-2xl mx-auto">
              Your brand voice and strategy insights, curated with precision.
            </p>
          </div>
        </div>;
      case 'achievements':
        return <div className="hero-section">
          <div className="text-center">
            <TrophyIcon className="h-24 w-24 text-gray-400 mx-auto mb-8" />
            <h2 className="display-text text-4xl text-gray-900 mb-6">Achievements</h2>
            <p className="body-text text-xl text-gray-600 max-w-2xl mx-auto">
              Celebrate your wins and unlock badges with elegant recognition.
            </p>
          </div>
        </div>;
      default:
        return <DailyPromptGenerator userProfile={userProfile} />;
    }
  };

  // Loading state
  if (appState === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
            <SparklesIcon className="h-8 w-8 text-white" />
          </div>
          <h2 className="display-text text-2xl text-gray-900 mb-4">Loading BETTE</h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
        </div>
      </div>
    );
  }

  // Onboarding quiz
  if (appState === 'onboarding') {
    return <OnboardingQuiz onComplete={handleOnboardingComplete} />;
  }

  // Daily brand deepener
  if (appState === 'daily-deepener') {
    return <DailyBrandDeepener onComplete={handleDailyDeepenerComplete} />;
  }

  // Main app
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hidden div to force Tailwind to generate classes */}
      <div className="hidden bg-gray-50 bg-gray-100 bg-gray-200 bg-gray-300 bg-gray-400 bg-gray-500 bg-gray-600 bg-gray-700 bg-gray-800 bg-gray-900 bg-black bg-white text-gray-50 text-gray-100 text-gray-200 text-gray-300 text-gray-400 text-gray-500 text-gray-600 text-gray-700 text-gray-800 text-gray-900 text-black text-white border-gray-50 border-gray-100 border-gray-200 border-gray-300 border-gray-400 border-gray-500 border-gray-600 border-gray-700 border-gray-800 border-gray-900 border-black border-white"></div>
      
      {/* Header */}
      <header className="glass-effect border-b border-gray-200 sticky top-0 z-50 transition-all duration-300">
        <div className="container-luxury px-6">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center mr-4">
                <SparklesIcon className="h-6 w-6 text-white" />
              </div>
              <h1 className="display-text text-2xl text-gray-900">BETTE</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`nav-link ${activeTab === item.id ? 'nav-link-active' : ''}`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </nav>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden lg:block">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent w-64 bg-white/80 backdrop-blur-sm"
                />
              </div>
              
              {/* Notifications */}
              <button className="relative p-3 text-gray-600 hover:text-gray-900 transition-colors">
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-orange-500"></span>
              </button>
              
              {/* Profile */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-white" />
                </div>
                <span className="body-text text-sm font-medium text-gray-700 hidden lg:block">
                  {userProfile?.business_type ? userProfile.business_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'User'}
                </span>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <nav className="px-6 py-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-black text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="body-text font-medium">{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container-luxury">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
