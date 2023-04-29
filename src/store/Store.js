import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialInputState = [];

const BoardSlice = createSlice({
  name: 'board',
  initialState: initialInputState,
  reducers: {
    add: (state, action) => {
      state.push({
        id: action.payload.id,
        title: action.payload.title,
        career: action.payload.career,
        genre: action.payload.genre,
        salary: action.payload.salary,
        deadline: action.payload.deadline,
        content: action.payload.content,
      });
    },
    update: (state, action) => {
      const { id, title, career, genre, salary, deadline, content } =
        action.payload;
      const filterState = state.find((input) => input.id === id);
      console.log(title);
      if (filterState) {
        filterState.title = title;
        filterState.career = career;
        filterState.genre = genre;
        filterState.salary = salary;
        filterState.deadline = deadline;
        filterState.content = content;
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
