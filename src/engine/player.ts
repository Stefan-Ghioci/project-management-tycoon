import {
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Developer } from './availableDevs';
import { INITIAL_PLAYER_BALANCE } from './constants';

export const hiredDevelopersAdapter = createEntityAdapter<Developer>();

interface PlayerState {
  balance: number;
  hiredDevelopers: EntityState<Developer>;
  currentWeek: number;
}

const initialState: PlayerState = {
  balance: INITIAL_PLAYER_BALANCE,
  hiredDevelopers: hiredDevelopersAdapter.getInitialState(),
  currentWeek: 1,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    hireDev: (state, action: PayloadAction<Developer>) => {
      hiredDevelopersAdapter.addOne(state.hiredDevelopers, action.payload);
    },
    passWeek: (state) => {
      state.currentWeek += 1;
      if (state.currentWeek % 4 === 0) {
        state.balance -= hiredDevelopersAdapter
          .getSelectors()
          .selectAll(state.hiredDevelopers)
          .reduce((total, developer) => total + developer.salary, 0);
      }
    },
  },
});

export const { hireDev, passWeek } = playerSlice.actions;
export default playerSlice.reducer;
