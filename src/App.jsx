import { useState } from 'react';
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
  BookOpenIcon
} from '@heroicons/react/24/outline';
import DailyPromptGenerator from './components/DailyPromptGenerator';
import SmartScheduler from './components/SmartScheduler';

function App() {
  const [activeTab, setActiveTab] = useState('daily-prompt');
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = [
    { id: 'daily-prompt', name: 'Daily Prompt', icon: SparklesIcon, color: 'bette-blush' },
    { id: 'scheduler', name: 'Smart Scheduler', icon: ClockIcon, color: 'bette-gold' },
    { id: 'content-vault', name: 'Content Vault', icon: PhotoIcon, color: 'bette-charcoal' },
    { id: 'analytics', name: 'Analytics', icon: ChartBarIcon, color: 'bette-blush' },
    { id: 'brand-vault', name: 'Brand Vault', icon: BookOpenIcon, color: 'bette-gold' },
    { id: 'achievements', name: 'Achievements', icon: TrophyIcon, color: 'bette-charcoal' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'daily-prompt':
        return <DailyPromptGenerator />;
      case 'scheduler':
        return <SmartScheduler />;
      case 'content-vault':
        return <div className="text-center py-12">
          <PhotoIcon className="h-16 w-16 text-bette-charcoal-400 mx-auto mb-4" />
          <h3 className="luxury-text text-2xl text-bette-charcoal-900 mb-2">Content Vault</h3>
          <p className="text-bette-charcoal-600">Upload your brand assets and track usage</p>
        </div>;
      case 'analytics':
        return <div className="text-center py-12">
          <ChartBarIcon className="h-16 w-16 text-bette-charcoal-400 mx-auto mb-4" />
          <h3 className="luxury-text text-2xl text-bette-charcoal-900 mb-2">Analytics</h3>
          <p className="text-bette-charcoal-600">Track your content performance and goals</p>
        </div>;
      case 'brand-vault':
        return <div className="text-center py-12">
          <BookOpenIcon className="h-16 w-16 text-bette-charcoal-400 mx-auto mb-4" />
          <h3 className="luxury-text text-2xl text-bette-charcoal-900 mb-2">Brand Vault</h3>
          <p className="text-bette-charcoal-600">Your brand voice and strategy insights</p>
        </div>;
      case 'achievements':
        return <div className="text-center py-12">
          <TrophyIcon className="h-16 w-16 text-bette-charcoal-400 mx-auto mb-4" />
          <h3 className="luxury-text text-2xl text-bette-charcoal-900 mb-2">Achievements</h3>
          <p className="text-bette-charcoal-600">Unlock badges and celebrate wins</p>
        </div>;
      default:
        return <DailyPromptGenerator />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bette-charcoal-50 to-bette-blush-50">
      {/* Header */}
      <header className="glass-effect border-b border-bette-charcoal-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-bette-blush-500 to-bette-gold-500 rounded-lg flex items-center justify-center mr-3">
                <SparklesIcon className="h-5 w-5 text-white" />
              </div>
              <h1 className="luxury-text text-2xl text-bette-charcoal-900">BETTE</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-bette-charcoal-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-bette-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bette-blush-500 focus:border-transparent w-64 bg-white/80 backdrop-blur-sm"
                />
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 text-bette-charcoal-400 hover:text-bette-charcoal-600 transition-colors">
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-bette-blush-500"></span>
              </button>
              
              {/* Profile */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-bette-blush-500 to-bette-gold-500 rounded-full flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-bette-charcoal-700">Queen</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 glass-effect border-r border-bette-charcoal-100 min-h-screen">
          <div className="p-4">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeTab === item.id
                        ? `bg-${item.color}-100 text-${item.color}-700 border border-${item.color}-200`
                        : 'text-bette-charcoal-600 hover:bg-bette-charcoal-100 hover:text-bette-charcoal-900'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h2 className="luxury-text text-3xl text-bette-charcoal-900">
                {navigation.find(nav => nav.id === activeTab)?.name}
              </h2>
              <p className="mt-2 text-bette-charcoal-600">
                {activeTab === 'daily-prompt' && "Let Bette help you create fire content today."}
                {activeTab === 'scheduler' && "Optimize your time and create freedom."}
                {activeTab === 'content-vault' && "Manage your brand assets and track usage."}
                {activeTab === 'analytics' && "Track your content performance and goals."}
                {activeTab === 'brand-vault' && "Your brand voice and strategy insights."}
                {activeTab === 'achievements' && "Celebrate your wins and unlock badges."}
              </p>
            </div>

            {/* Content */}
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
