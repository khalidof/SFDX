import React, { createContext, useContext, useReducer } from 'react';

const BettingContext = createContext();

const initialState = {
  betSlip: [],       // { matchId, selection: 'home'|'draw'|'away', odds, homeTeam, awayTeam }
  betHistory: [],    // historique des paris
  balance: 1000.00,  // solde initial en MAD
};

function bettingReducer(state, action) {
  switch (action.type) {
    case 'ADD_BET': {
      const exists = state.betSlip.find((b) => b.matchId === action.payload.matchId);
      if (exists) {
        // Remplacer la sélection existante
        return {
          ...state,
          betSlip: state.betSlip.map((b) =>
            b.matchId === action.payload.matchId ? action.payload : b
          ),
        };
      }
      return { ...state, betSlip: [...state.betSlip, action.payload] };
    }

    case 'REMOVE_BET':
      return {
        ...state,
        betSlip: state.betSlip.filter((b) => b.matchId !== action.payload),
      };

    case 'CLEAR_SLIP':
      return { ...state, betSlip: [] };

    case 'PLACE_BET': {
      const { stake, totalOdds, potentialWin } = action.payload;
      if (stake > state.balance || stake <= 0) return state;
      const bet = {
        id: Date.now().toString(),
        selections: [...state.betSlip],
        stake,
        totalOdds,
        potentialWin,
        status: 'pending',
        placedAt: new Date().toISOString(),
      };
      return {
        ...state,
        balance: +(state.balance - stake).toFixed(2),
        betHistory: [bet, ...state.betHistory],
        betSlip: [],
      };
    }

    case 'ADD_FUNDS':
      return {
        ...state,
        balance: +(state.balance + action.payload).toFixed(2),
      };

    case 'SETTLE_BET': {
      const { betId, won } = action.payload;
      return {
        ...state,
        balance: won
          ? +(state.balance + state.betHistory.find((b) => b.id === betId)?.potentialWin || 0).toFixed(2)
          : state.balance,
        betHistory: state.betHistory.map((b) =>
          b.id === betId ? { ...b, status: won ? 'won' : 'lost' } : b
        ),
      };
    }

    default:
      return state;
  }
}

export function BettingProvider({ children }) {
  const [state, dispatch] = useReducer(bettingReducer, initialState);

  const addBet = (bet) => dispatch({ type: 'ADD_BET', payload: bet });
  const removeBet = (matchId) => dispatch({ type: 'REMOVE_BET', payload: matchId });
  const clearSlip = () => dispatch({ type: 'CLEAR_SLIP' });
  const placeBet = (stake) => {
    const totalOdds = state.betSlip.reduce((acc, b) => acc * b.odds, 1);
    const potentialWin = +(stake * totalOdds).toFixed(2);
    dispatch({ type: 'PLACE_BET', payload: { stake, totalOdds, potentialWin } });
  };
  const addFunds = (amount) => dispatch({ type: 'ADD_FUNDS', payload: amount });

  return (
    <BettingContext.Provider
      value={{
        betSlip: state.betSlip,
        betHistory: state.betHistory,
        balance: state.balance,
        addBet,
        removeBet,
        clearSlip,
        placeBet,
        addFunds,
      }}
    >
      {children}
    </BettingContext.Provider>
  );
}

export const useBetting = () => {
  const context = useContext(BettingContext);
  if (!context) throw new Error('useBetting must be used within BettingProvider');
  return context;
};
