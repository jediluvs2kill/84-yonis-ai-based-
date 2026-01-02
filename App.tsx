import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { SystemInterface } from './components/SystemInterface';

const App: React.FC = () => {
  const [hasEntered, setHasEntered] = useState(false);

  if (!hasEntered) {
    return <LandingPage onEnter={() => setHasEntered(true)} />;
  }

  return <SystemInterface onExit={() => setHasEntered(false)} />;
};

export default App;