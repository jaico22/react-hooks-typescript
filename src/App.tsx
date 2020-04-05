import React from 'react';
import './App.css';
import {CounterProvider} from './components/CounterProvider/CounterProvider';
import {CounterDisplay} from './components/CounterDisplay/CounterDisplay';
import {CounterControl} from './components/CounterControl/CounterControl';
function App() {
  return (
    // CounterControl and CounterDisplay all utilize the same
    // states provided defined in CounterProvider. 
    // These states are set by utilizing Hooks.
    <>
      <CounterProvider>
        <CounterDisplay />
        <CounterControl action='INCREMENT' />
        <CounterControl action='DECREMENT' />
        <CounterControl action='CLEAR' />
      </CounterProvider>
    </>
  );
}

export default App;
