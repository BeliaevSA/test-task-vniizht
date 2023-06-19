import {PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface ITrain {
  id: number,
  numberTrain: string,
  description: string,
  speed: number[]
}

export interface IIdTrain {
  id: number
}

interface ITrainState {
  error: string | null | undefined;
  dataTrains: ITrain[];
  idEditTrain: number | null
  speedArr: number[]
}

const initialState: ITrainState = {
  error: null,
  dataTrains: [],
  idEditTrain: null,
  speedArr: []
};

export const fetchDataTrains = createAsyncThunk<
  ITrain[],
  undefined,
  { rejectValue: string, }
>('user/fetchToken', async function (_, { rejectWithValue }) {
  const response = await axios
    .get('http://localhost:3001/train')
    .then((res) => {
      return res.data
    })
    .catch((error) => {      
      return rejectWithValue(error.message);
    });
  return response;
});



const trainSlice = createSlice({
  name: 'train',
  initialState,
  reducers: {
    setIdEditTrain(state, action: PayloadAction<number | null>) {
      state.idEditTrain = action.payload
    },
    setSpeedArr(state, action: PayloadAction<number[]>) {
      state.speedArr = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDataTrains.pending, (state) => {
        state.error = '';
      })
      .addCase(fetchDataTrains.fulfilled, (state, action) => {
        state.dataTrains = action.payload;
      })
      .addCase(fetchDataTrains.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setIdEditTrain, setSpeedArr } = trainSlice.actions;

export default trainSlice.reducer;