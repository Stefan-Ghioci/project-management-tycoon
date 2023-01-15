import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import { availableDevsAdapter } from './availableDevs';
import { hiredDevelopersAdapter } from './player';

export const selectPlayerState = (state: RootState) => state.player;
export const selectPlayerBalance = createSelector(
  selectPlayerState,
  (player) => player.balance
);

const availableDevsAdapterSelectors = availableDevsAdapter.getSelectors(
  (state: RootState) => state.developers
);
export const selectAvailableDevs = availableDevsAdapterSelectors.selectAll;

const hiredDevsAdapterSelectors = hiredDevelopersAdapter.getSelectors(
  (state: RootState) => state.player.hiredDevelopers
);

export const selectHiredDevs = hiredDevsAdapterSelectors.selectAll;

export const selectCurrentWeek = createSelector(
  selectPlayerState,
  (player) => player.currentWeek
);
