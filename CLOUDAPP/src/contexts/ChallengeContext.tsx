import React, { createContext, useContext, useReducer } from 'react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
}

interface ChallengeState {
  challenges: Challenge[];
  totalPoints: number;
}

type ChallengeAction =
  | { type: 'COMPLETE_CHALLENGE'; payload: string }
  | { type: 'ADD_CHALLENGE'; payload: Challenge }
  | { type: 'RESET_CHALLENGES' };

const initialChallenges: Challenge[] = [
  {
    id: '1',
    title: 'First Purchase',
    description: 'Make your first purchase',
    points: 100,
    completed: false,
  },
  {
    id: '2',
    title: 'Coffee Lover',
    description: 'Buy 5 different coffee drinks',
    points: 200,
    completed: false,
  },
  {
    id: '3',
    title: 'Tea Master',
    description: 'Try all tea varieties',
    points: 300,
    completed: false,
  },
];

const initialState: ChallengeState = {
  challenges: initialChallenges,
  totalPoints: 0,
};

const ChallengeContext = createContext<{
  state: ChallengeState;
  dispatch: React.Dispatch<ChallengeAction>;
  completeChallenge: (id: string) => void;
  addChallenge: (challenge: Omit<Challenge, 'completed'>) => void;
  resetChallenges: () => void;
} | null>(null);

const challengeReducer = (
  state: ChallengeState,
  action: ChallengeAction
): ChallengeState => {
  switch (action.type) {
    case 'COMPLETE_CHALLENGE': {
      const updatedChallenges = state.challenges.map(challenge =>
        challenge.id === action.payload
          ? { ...challenge, completed: true }
          : challenge
      );
      const completedChallenge = state.challenges.find(
        c => c.id === action.payload && !c.completed
      );
      return {
        challenges: updatedChallenges,
        totalPoints:
          state.totalPoints + (completedChallenge ? completedChallenge.points : 0),
      };
    }

    case 'ADD_CHALLENGE':
      return {
        ...state,
        challenges: [...state.challenges, action.payload],
      };

    case 'RESET_CHALLENGES':
      return initialState;

    default:
      return state;
  }
};

export const ChallengeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(challengeReducer, initialState);

  const completeChallenge = (id: string) => {
    dispatch({ type: 'COMPLETE_CHALLENGE', payload: id });
  };

  const addChallenge = (challenge: Omit<Challenge, 'completed'>) => {
    dispatch({
      type: 'ADD_CHALLENGE',
      payload: { ...challenge, completed: false },
    });
  };

  const resetChallenges = () => {
    dispatch({ type: 'RESET_CHALLENGES' });
  };

  return (
    <ChallengeContext.Provider
      value={{
        state,
        dispatch,
        completeChallenge,
        addChallenge,
        resetChallenges,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallenge = () => {
  const context = useContext(ChallengeContext);
  if (!context) {
    throw new Error('useChallenge must be used within a ChallengeProvider');
  }
  return context;
};