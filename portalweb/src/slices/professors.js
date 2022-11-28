import {
    createSlice,
} from "@reduxjs/toolkit";
import axiosInstance from "../axios";
import professorService from "../services/professor.service";
import {
    setMessage
} from "./messages";


export const getProfessorById = (id) => {
    return async (dispatch) => {
        dispatch(setLoading());
        try {
            const response = await professorService.getProfesorByID(id);
            dispatch(getProfessorByIdSuccess(response.data));
        } catch (error) {
            const message = error.response.data || "Unknown error";
            dispatch(setMessage(message));
        }
    }
};

export const createProfessor = (professor) => {
    return async (dispatch) => {
        dispatch(setLoading());
        try {
            const response = await professorService.createProfessor(professor);
            dispatch(createProfessorSuccess(response.data));
        } catch (error) {
            const message = error.response.data || "Unknown error";
            dispatch(setMessage(message));
        }
    }
};


export const fetchProfessors = () => {
    return async (dispatch) => {
        dispatch(setLoading());
        try {
            const response = await axiosInstance.get('/professors');
            dispatch(getProfessorsSuccess(response.data));
        } catch (error) {
            dispatch(getProfessorsFailure());
        }
    }
}


const initialState = {
    professors: [],
    loading: false,
    hasErrors: false,
    professor: null
};

const professorsSlice = createSlice({
    name: "professors",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
            state.hasErrors = false;
        },
        getProfessorsSuccess: (state, {
            payload
        }) => {
            state.professors = payload;
            state.loading = false;
            state.hasErrors = false;
        },
        getProfessorsFailure: (state) => {
            state.loading = false;
            state.hasErrors = true;
        },
        getProfessorByIdSuccess: (state, {
            payload
        }) => {
            state.professor = payload;
            state.loading = false;
            state.hasErrors = false;
        },
        createProfessorSuccess: (state, {
            payload
        }) => {
            state.professors.push(payload);
            state.loading = false;
            state.hasErrors = false;
        }
    }
});

export const {
    setLoading,
    getProfessorsSuccess,
    getProfessorsFailure,
    getProfessorByIdSuccess,
    createProfessorSuccess
} = professorsSlice.actions;
export const professorsSelector = (state) => state.professors;
export default professorsSlice.reducer;