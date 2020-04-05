import React, { ReactNode, useContext } from 'react';

// Define properties expected to be  used in the provider function
type Props = {
    children: ReactNode
};

// Create an interface to house the counter state
export interface ICount {
    value: number
}

// Create an unemeration 
export enum ActionTypes {
    INCREMENT,
    DECREMENT,
    SET,
    UNDEFINED
}

// Define the actions type used in the reducer
export type Action =
    | {type: ActionTypes.INCREMENT}
    | {type: ActionTypes.DECREMENT}
    | {type: ActionTypes.SET, value: number}
    | {type: ActionTypes.UNDEFINED};

// Define the context properties
// This is a bit funky compared to a lot of expamples floating
// around, but this will allow for the context to be created 
// without having to specify a default value. 
// Some examples will use 'null' as a default value, but this will
// not compile if strict typing is enabled in tsconfig (as it is by default)
interface IContextProps {
    state: ICount;
    dispatch: ({type}:{type:ActionTypes}) => void;
  }

// The counter context is defined by using an empty object specified as
// being an implementtion of the IContextProps interface. As mentioned
// in the note above, this allows for the context to be created with
// an undefined state while not having the TypeScript compiler 
// yell at you. 
// Initializing this as undefined isn't a bit deal because the 
// provider component will handle initialization and this 
// context itself will never be consumed outside of a child
// component. 
const CounterContext = React.createContext({} as IContextProps);

// Create the counter reducer.
// This reducer accepts actions defined in the ActionsType
// enumeration and will return an updated state. 
// It's important to note that the reducer will never 
// mutate the state directly as reducers must be a pure function.
const counterReducer = (state: ICount, action: Action): ICount => {
    // Create a copy of the state
    let newState = {...state};

    // Mutate the new stated
    switch(action.type){
        case ActionTypes.INCREMENT: 
            newState.value += 1; 
            break;
        case ActionTypes.DECREMENT:
            newState.value -= 1; 
            break;
        case ActionTypes.SET:
            newState.value = action.value; 
            break;
    }

    // Return the new state
    return(newState);
}

export const CounterProvider = ({
    children
}: Props) => {
    // Set the intial value of the state
    var initalizer: ICount ={
        value: 2
    };
    // Create the state and dipatch objects to be passed down to the child 
    // components
    const [state, dispatch] = React.useReducer(counterReducer, initalizer);
    return(
        // The children must be placed within the Context.Provider component
        // in order to access 'State' and 'Dispatch'
        <CounterContext.Provider value={{state, dispatch}}>
            {children}
        </CounterContext.Provider>
    );
};

// Export a helper function to be used by child components to access the 
// counter context
export const useCounter = () => useContext(CounterContext);