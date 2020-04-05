import React from 'react';
import { useCounter } from '../CounterProvider/CounterProvider';

export const CounterDisplay = () => {
    // Retrieve the sate from the counter context and display the courrent count
    const {state} = useCounter();
    return(
        <div>
            <b>Current Count:</b> {state.value}
        </div>
    )
}

export default CounterDisplay;