/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainView from './components/MainView';

export default function App() {
  const [keys, setKeys] = useState({ elevenlabs: '', pexels: '', openai: '', shotstack: '' });
  const [duration, setDuration] = useState(5);
  const [language, setLanguage] = useState('English');
  const [topic, setTopic] = useState('');
  const [theme, setTheme] = useState('True Crime / Mystery');

  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden text-sm">
      <Sidebar 
        keys={keys} setKeys={setKeys}
        duration={duration} setDuration={setDuration}
        language={language} setLanguage={setLanguage}
        theme={theme} setTheme={setTheme}
      />
      <div className="flex-1 overflow-y-auto">
        <MainView 
          keys={keys} duration={duration} language={language} theme={theme} topic={topic} setTopic={setTopic}
        />
      </div>
    </div>
  );
}
