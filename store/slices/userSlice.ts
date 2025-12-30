import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    name: string;
    age: number;
    email: string;
    phone: string;
}

const initialState: UserState = {
    name: '',
    age: 0,
    email: '',
    phone: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setName: (state: UserState, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setAge: (state: UserState, action: PayloadAction<number>) => {
            state.age = action.payload;
        },
        setEmail: (state: UserState, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPhone: (state: UserState, action: PayloadAction<string>) => {
            state.phone = action.payload;
        },
    },
});

export const { setName, setAge, setEmail, setPhone } = userSlice.actions;
export default userSlice.reducer;

