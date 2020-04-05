import React from 'react';
import { useCounter, Action, ActionTypes } from '../CounterProvider/CounterProvider';

export const CounterControl = (props: any) => {
    // Retrieve the dispatch from the counter context.
    // dispatch will be called with an object of type 'Action'
    // to change the state.
    const {dispatch} = useCounter(); 

    // Initialize rendering settings
    let buttonText = "";

    // Create a default action. This action has no implementation
    // but will allow for mutation when parsing out the action properies
    let dispatchAction: Action = {
        type: ActionTypes.UNDEFINED
    };

    // Parse the action property and determine rendering settings
    // and dispatch actions
    switch(props.action){
        case "INCREMENT": 
            buttonText = "+"; 
            dispatchAction = {
                type: ActionTypes.INCREMENT
            };
            break;
        case "DECREMENT": 
            buttonText = "-"; 
            dispatchAction = {
                type: ActionTypes.DECREMENT
            };
            break;
        case "CLEAR": 
            buttonText = "Clear";
            dispatchAction = {
                type: ActionTypes.SET,
                value: 0
            };
            break;
    }

    return(
        <div>
            <button onClick={() => dispatch(dispatchAction)}>
                {buttonText}
            </button>
        </div>
    );
}

export default CounterControl;