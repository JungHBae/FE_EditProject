import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialInputState = [];
let id = 1;

const BoardSlice = createSlice({
  name: 'board',
  initialState: initialInputState,
  reducers: {
    add: (state, action) => {
      state.push({
        id: id++,
        title: action.payload.title,
        career: action.payload.career,
        time: action.payload.time,
        money: action.payload.pay,
        workType: action.payload.worktype,
        content: action.payload.content,
      });
    },
    update: (state, action) => {
      const { id, name, value } = action.payload;
      const filterState = state
        .find((input) => input.id === id)
        .find((input) => input.name === name);
      if (filterState) {
        filterState.value = value;
      }
    },
    delete: (state, action) => {
      return state.filter((input) => input.id !== action.payload);
    },
  },
});

const board = configureStore({
  reducer: {
    board: BoardSlice.reducer,
  },
});

export const boardActions = BoardSlice.actions;
export default board;
