import {
    createSlice,
} from "@reduxjs/toolkit";
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



export const updateProfessor = (professor) => {
    return async (dispatch) => {
        dispatch(setLoading());
        try {
            const response = await professorService.updateProfesor(professor);
            dispatch(updateProfessorSuccess(response.data));
        } catch (error) {
            dispatch(updateProfessorFailure(error));
        }
    }
};

export const deleteProfessor = (id) => {
    return async (dispatch) => {
        dispatch(setLoading());
        try {
            const response = await professorService.deleteProfesor(id);
            dispatch(deleteProfessorSuccess(response.data));
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
            const response = await professorService.fetchProfessors();
            dispatch(getProfessorsSuccess(response));
        } catch (error) {
            dispatch(getProfessorsFailure());
        }
    }
}

export const addProfessor = (professor) => {
    return async (dispatch) => {
        dispatch(setLoading());
        try {
            const response = await professorService.createProfesor(professor);
            dispatch(addProfessorSuccess(response.data));
        } catch (error) {
            dispatch(addProfessorFailure());
        }   
    }
}



const initialState = {
    professors: [],
    loading: false,
    hasErrors: false,
    professor: null,
    selectedProfessor: null,
    error : null
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
        updateProfessorSuccess: (state, {
            payload
        }) => {
            state.loading = false;
            state.hasErrors = false;
        },
        updateProfessorFailure: (state, {payload}) => {
            state.loading = false;
            state.hasErrors = true;
            state.error = payload;
        },
        deleteProfessorSuccess: (state, {
            payload
        }) => {
            state.loading = false;
            state.hasErrors = false;
        },
        setSelectedProfessor: (state, {
            payload
        }) => {
            state.selectedProfessor = payload;
        },
        addProfessorSuccess: (state, {
            payload
        }) => {
            state.professors.push(payload);
            state.loading = false;
            state.hasErrors = false;
        },
        addProfessorFailure: (state, {payload}) => {
            state.loading = false;
            state.hasErrors = true;
        }
    }
});

export const {
    setLoading,
    getProfessorsSuccess,
    getProfessorsFailure,
    getProfessorByIdSuccess,
    updateProfessorSuccess,
    deleteProfessorSuccess,
    setSelectedProfessor,
    addProfessorFailure,
    updateProfessorFailure,
    addProfessorSuccess
} = professorsSlice.actions;
export const professorsSelector = (state) => state.professors;
export default professorsSlice.reducer;