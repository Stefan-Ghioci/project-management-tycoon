import { createEntityAdapter, createSlice, nanoid } from '@reduxjs/toolkit';
import { randomInt } from './utils';
import { hireDev } from './player';
import {
  DEV_SALARY_MAX,
  DEV_SALARY_MIN,
  INITIAL_AVAILABLE_DEV_COUNT,
} from './constants';

export interface Developer {
  id: string;
  name: string;
  salary: number;
}

const generateDeveloperName = () => 'Developer' + randomInt(0, 1000);

export const availableDevsAdapter = createEntityAdapter<Developer>();

const initialState = availableDevsAdapter.getInitialState();

for (let i = 0; i < INITIAL_AVAILABLE_DEV_COUNT; i++) {
  const id = nanoid();
  initialState.ids.push(id);
  initialState.entities[id] = {
    id,
    name: generateDeveloperName(),
    salary: randomInt(DEV_SALARY_MIN, DEV_SALARY_MAX),
  };
}

const availableDevsSlice = createSlice({
  name: 'availableDevs',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(hireDev, (state, action) => {
      availableDevsAdapter.removeOne(state, action.payload.id);
    });
  },
});

export default availableDevsSlice.reducer;
