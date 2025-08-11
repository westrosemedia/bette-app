import { useState, useEffect } from 'react';
import { 
  ClockIcon, 
  CalendarIcon, 
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const SmartScheduler = () => {
  const [userPreferences, setUserPreferences] = useState({
    preferredPostTime: '14:00', // 2 PM default
    contentCreationTime: 30, // minutes
    reminderTime: 40, // minutes before posting
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [showSetup, setShowSetup] = useState(true);

  const calculateReminderTime = () => {
    const postTime = new Date();
    const [hours, minutes] = userPreferences.preferredPostTime.split(':');
    postTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    const reminderTime = new Date(postTime);
    reminderTime.setMinutes(reminderTime.getMinutes() - userPreferences.reminderTime);
    
    return reminderTime;
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleTimePreferenceChange = (field, value) => {
    setUserPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const savePreferences = () => {
    localStorage.setItem('bette-scheduler-preferences', JSON.stringify(userPreferences));
    setShowSetup(false);
  };

  const schedulePost = (content, platforms) => {
    const postTime = new Date();
    const [hours, minutes] = userPreferences.preferredPostTime.split(':');
    postTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    // If today's time has passed, schedule for tomorrow
    if (postTime < new Date()) {
      postTime.setDate(postTime.getDate() + 1);
    }

    const newPost = {
      id: Date.now(),
      content,
      platforms,
      scheduledTime: postTime,
      status: 'scheduled',
      createdAt: new Date()
    };

    setScheduledPosts(prev => [...prev, newPost]);
  };

  const renderSetup = () => (
    <div className="card-luxury animate-bounce-in">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-bette-blush-500 to-bette-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <ClockIcon className="h-8 w-8 text-white" />
        </div>
        <h2 className="luxury-text text-3xl text-bette-charcoal-900 mb-4">
          Let's optimize your time
        </h2>
        <p className="text-bette-charcoal-600">
          I'll remind you exactly when you need to start creating content.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-bette-charcoal-700 mb-2">
            What time do you want to post each day?
          </label>
          <input
            type="time"
            value={userPreferences.preferredPostTime}
            onChange={(e) => handleTimePreferenceChange('preferredPostTime', e.target.value)}
            className="input-field"
          />
          <p className="text-sm text-bette-charcoal-500 mt-1">
            I'll remind you {userPreferences.reminderTime} minutes before to start creating.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-bette-charcoal-700 mb-2">
            How long does it usually take you to create a post? (minutes)
          </label>
          <input
            type="number"
            min="5"
            max="120"
            value={userPreferences.contentCreationTime}
            onChange={(e) => handleTimePreferenceChange('contentCreationTime', parseInt(e.target.value))}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-bette-charcoal-700 mb-2">
            How early should I remind you? (minutes before posting)
          </label>
          <input
            type="number"
            min="10"
            max="60"
            value={userPreferences.reminderTime}
            onChange={(e) => handleTimePreferenceChange('reminderTime', parseInt(e.target.value))}
            className="input-field"
          />
        </div>

        <button 
          onClick={savePreferences}
          className="btn-primary w-full"
        >
          Save Preferences
          <ArrowRightIcon className="h-5 w-5 ml-2" />
        </button>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Today's Schedule */}
      <div className="card-luxury">
        <div className="flex items-center justify-between mb-4">
          <h3 className="luxury-text text-xl text-bette-charcoal-900">
            Today's Schedule
          </h3>
          <div className="flex items-center space-x-2">
            <ClockIcon className="h-5 w-5 text-bette-charcoal-500" />
            <span className="text-sm text-bette-charcoal-600">
              {formatTime(userPreferences.preferredPostTime)}
            </span>
          </div>
        </div>

        <div className="bg-bette-charcoal-50 rounded-xl p-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-bette-gold-500 rounded-full flex items-center justify-center">
              <BellIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-bette-charcoal-900">
                Reminder at {formatTime(calculateReminderTime().toTimeString().slice(0, 5))}
              </p>
              <p className="text-sm text-bette-charcoal-600">
                Start creating your {userPreferences.contentCreationTime}-minute post
              </p>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
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

      {/* Scheduled Posts */}
      {scheduledPosts.length > 0 && (
        <div className="card">
          <h3 className="luxury-text text-xl text-bette-charcoal-900 mb-4">
            Scheduled Posts
          </h3>
          <div className="space-y-3">
            {scheduledPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 bg-bette-charcoal-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-bette-charcoal-900">
                    {post.content.substring(0, 50)}...
                  </p>
                  <p className="text-sm text-bette-charcoal-600">
                    {post.scheduledTime.toLocaleDateString()} at {post.scheduledTime.toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {post.platforms.map(platform => (
                    <span key={platform} className="text-xs bg-bette-blush-100 text-bette-blush-700 px-2 py-1 rounded">
                      {platform}
                    </span>
                  ))}
                  <CheckCircleIcon className="h-5 w-5 text-bette-gold-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Time Freedom Celebration */}
      {scheduledPosts.some(post => post.status === 'completed') && (
        <div className="card-luxury bg-gradient-to-r from-bette-gold-50 to-bette-blush-50 border-bette-gold-200">
          <div className="text-center">
            <div className="w-12 h-12 bg-bette-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="h-6 w-6 text-white" />
            </div>
            <h3 className="luxury-text text-xl text-bette-charcoal-900 mb-2">
              Your post went live successfully!
            </h3>
            <p className="text-bette-charcoal-600">
              Isn't it great having time freedom right now? 🎉
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      {showSetup ? renderSetup() : renderDashboard()}
    </div>
  );
};

export default SmartScheduler; 