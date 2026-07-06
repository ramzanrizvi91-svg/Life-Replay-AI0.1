import { useState } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Link, 
  Cpu, 
  Volume2, 
  Save, 
  Lock,
  Compass,
  Monitor
} from 'lucide-react';
import { AppConfig } from '../types';

interface SettingsViewProps {
  config: AppConfig;
  onUpdateConfig: (updated: AppConfig) => void;
  userEmail: string;
  onTriggerDemoAlert?: () => void;
}

export default function SettingsView({
  config,
  onUpdateConfig,
  userEmail,
  onTriggerDemoAlert
}: SettingsViewProps) {
  const [profileName, setProfileName] = useState(userEmail.split('@')[0]);
  const [savedMessage, setSavedMessage] = useState(false);

  const toggleLocation = () => {
    onUpdateConfig({
      ...config,
      locationToggle: !config.locationToggle
    });
  };

  const toggleNotification = () => {
    onUpdateConfig({
      ...config,
      notifications: !config.notifications
    });
  };

  const toggleSmartNotifications = () => {
    onUpdateConfig({
      ...config,
      smartNotifications: !config.smartNotifications
    });
  };

  const togglePrivacy = () => {
    onUpdateConfig({
      ...config,
      privacyMode: !config.privacyMode
    });
  };

  const changeInterval = (val: number) => {
    onUpdateConfig({
      ...config,
      screenshotInterval: val
    });
  };

  const toggleIntegration = (key: 'google' | 'apple' | 'microsoft') => {
    onUpdateConfig({
      ...config,
      integrations: {
        ...config.integrations,
        [key]: !config.integrations[key]
      }
    });
  };

  const handleSaveProfile = () => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
      
      {/* Settings Intro */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-200/50 dark:border-slate-800/80">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-500 animate-spin-slow" />
            <span>Applet Preferences & Safety Controls</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Configure background screen grab schedules, manage third-party integrations, and modify biometric profile criteria.
          </p>
        </div>
        
        {savedMessage && (
          <span className="text-[11px] font-mono text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full font-bold animate-pulse">
            ✔ SAVED SUCCESS
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left pane: Profile card */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 bg-white dark:bg-slate-950 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-400 to-[#6C63FF] mx-auto flex items-center justify-center font-extrabold text-white text-2xl uppercase shadow-lg">
              {profileName.charAt(0)}
            </div>
            <h3 className="font-bold text-slate-800 dark:text-white mt-4 uppercase tracking-wide">{profileName}</h3>
            <p className="text-[10px] text-slate-400 font-mono mt-1">{userEmail}</p>

            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-900 space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold flex items-center gap-1">
                  <User className="w-3 h-3" /> Display Name
                </label>
                <input 
                  type="text" 
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                />
              </div>

              <button 
                onClick={handleSaveProfile}
                className="w-full py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs shadow-md shadow-indigo-500/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Update Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right pane: Safety toggles and integrations */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Section 1: Capture interval and safety */}
          <div className="p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/40 space-y-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-900">
              <Monitor className="w-4 h-4 text-indigo-500" />
              <span>Automated Screentime Capture</span>
            </h3>

            {/* Slider Interval */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 font-medium">
                <span>Capture Screen Grab Interval</span>
                <span className="font-mono font-bold text-indigo-500">Every {config.screenshotInterval} minutes</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="30" 
                value={config.screenshotInterval}
                onChange={(e) => changeInterval(parseInt(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <span className="text-[10px] text-slate-400 block font-mono leading-relaxed">Lower intervals yield more granular AI timelines, but consume more local memory buffers.</span>
            </div>

            {/* Toggles */}
            <div className="space-y-4 pt-2">
              
              {/* Location Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Location Tracking Coordinates</span>
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 max-w-sm">Determine spatial context (office vs cafe) to correlate workspace focus.</p>
                </div>
                <button
                  onClick={toggleLocation}
                  className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                    config.locationToggle ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-800'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ${
                    config.locationToggle ? 'translate-x-5' : ''
                  }`}></div>
                </button>
              </div>

              {/* Notification Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Focus Interrupt Warning Alerts</span>
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 max-w-sm">Send local system notifications when rapid app-switching cost spikes.</p>
                </div>
                <button
                  onClick={toggleNotification}
                  className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                    config.notifications ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-800'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ${
                    config.notifications ? 'translate-x-5' : ''
                  }`}></div>
                </button>
              </div>

              {/* Smart Notifications Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Smart AI-Driven Focus Alerts</span>
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 max-w-sm">Triggers smart, real-time desktop advice and alerts if you stay in low-focus, non-work activities for too long.</p>
                  {config.smartNotifications && onTriggerDemoAlert && (
                    <button 
                      onClick={onTriggerDemoAlert}
                      className="mt-2 px-2 py-1 rounded-md bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 text-[10px] font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-200 flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      ⚡ Simulation: Trigger Test AI Alert
                    </button>
                  )}
                </div>
                <button
                  onClick={toggleSmartNotifications}
                  className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                    config.smartNotifications ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-800'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ${
                    config.smartNotifications ? 'translate-x-5' : ''
                  }`}></div>
                </button>
              </div>

              {/* Privacy Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-indigo-400" />
                    <span>In-App Privacy Blur Mask</span>
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 max-w-sm">Automatically blur passwords, financial keys, and credit cards during grabs.</p>
                </div>
                <button
                  onClick={togglePrivacy}
                  className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                    config.privacyMode ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-800'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ${
                    config.privacyMode ? 'translate-x-5' : ''
                  }`}></div>
                </button>
              </div>

            </div>
          </div>

          {/* Section 2: Integrations */}
          <div className="p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/40 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-900">
              <Link className="w-4 h-4 text-indigo-500" />
              <span>Third-Party Calendar Providers</span>
            </h3>

            <div className="space-y-3">
              
              {/* Google */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 dark:bg-slate-900/20 border border-slate-200/40 dark:border-slate-800/40">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-indigo-500/10 rounded-lg flex items-center justify-center font-bold text-indigo-500 font-mono text-xs">G</div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Google Workspace Account</h4>
                    <p className="text-[9px] font-mono text-emerald-500">SYNCED AND TRUSTED</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleIntegration('google')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider cursor-pointer transition-all ${
                    config.integrations.google 
                      ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20' 
                      : 'bg-indigo-500 text-white'
                  }`}
                >
                  {config.integrations.google ? 'DISCONNECT' : 'CONNECT'}
                </button>
              </div>

              {/* Apple */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 dark:bg-slate-900/20 border border-slate-200/40 dark:border-slate-800/40">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-indigo-500/10 rounded-lg flex items-center justify-center font-bold text-indigo-500 font-mono text-xs">A</div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Apple iCloud Calendar</h4>
                    <p className="text-[9px] font-mono text-slate-400">NOT SYNCED</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleIntegration('apple')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider cursor-pointer transition-all ${
                    config.integrations.apple 
                      ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20' 
                      : 'bg-indigo-500 text-white'
                  }`}
                >
                  {config.integrations.apple ? 'DISCONNECT' : 'CONNECT'}
                </button>
              </div>

              {/* Microsoft */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 dark:bg-slate-900/20 border border-slate-200/40 dark:border-slate-800/40">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-indigo-500/10 rounded-lg flex items-center justify-center font-bold text-indigo-500 font-mono text-xs">M</div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Microsoft Outlook Exchange</h4>
                    <p className="text-[9px] font-mono text-slate-400">NOT SYNCED</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleIntegration('microsoft')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider cursor-pointer transition-all ${
                    config.integrations.microsoft 
                      ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20' 
                      : 'bg-indigo-500 text-white'
                  }`}
                >
                  {config.integrations.microsoft ? 'DISCONNECT' : 'CONNECT'}
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
