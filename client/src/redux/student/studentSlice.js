import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    teacher : null,
};

const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        setTeacher: (state, action) => {
            state.teacher = action.payload.teacher;
        },
    },
});

export const { setTeacher } = studentSlice.actions;

export default studentSlice.reducer;