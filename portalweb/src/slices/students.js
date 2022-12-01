import {
    createSlice,
} from "@reduxjs/toolkit";
import studentService from "../services/student.service";
import {
    setMessage
} from "./messages";


export const getStudentByID = (id) => {
    return async (dispatch) => {
        dispatch(setLoading());
        try {
            const response = await studentService.getStudentByID(id);
            dispatch(getStudentByIdSuccess(response.data));
        } catch (error) {
            const message = error.response.data || "Unknown error";
            dispatch(setMessage(message));
        }
    }
};



export const updateStudent = (student) => {
    return async (dispatch) => {
        dispatch(setLoading());
        try {
            const response = await studentService.updateStudent(student);
            dispatch(updateStudentSuccess(response.data));
        } catch (error) {
            dispatch(updateStudentFailure(error));
        }
    }
};

export const deleteStudent = (id) => {
    return async (dispatch) => {
        dispatch(setLoading());
        try {
            const response = await studentService.deleteStudent(id);
            dispatch(deleteStudentSuccess(response.data));
        } catch (error) {
            const message = error.response.data || "Unknown error";
            dispatch(setMessage(message));
        }
    }
};




export const fetchStudents = () => {
    return async (dispatch) => {
        dispatch(setLoading());
        try {
            const response = await studentService.fetchStudents();
            dispatch(getStudentsSuccess(response));
        } catch (error) {
            dispatch(getStudentsFailure());
        }
    }
}

export const addStudent = (student) => {
    return async (dispatch) => {
        dispatch(setLoading());
        try {
            const response = await studentService.createStudent(student);
            dispatch(addStudentSuccess(response.data));
        } catch (error) {
            dispatch(addStudentFailure());
        }   
    }
}



const initialState = {
    students: [],
    loading: false,
    hasErrors: false,
    student: null,
    selectedStudent: null,
    error : null
};

const studentsSlice = createSlice({
    name: "students",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
            state.hasErrors = false;
        },
        getStudentsSuccess: (state, {
            payload
        }) => {
            state.students = payload;
            state.loading = false;
            state.hasErrors = false;
        },
        getStudentsFailure: (state) => {
            state.loading = false;
            state.hasErrors = true;
        },
        getStudentByIdSuccess: (state, {
            payload
        }) => {
            state.student = payload;
            state.loading = false;
            state.hasErrors = false;
        },
        updateStudentSuccess: (state, {
            payload
        }) => {
            state.loading = false;
            state.hasErrors = false;
        },
        updateStudentFailure: (state, {payload}) => {
            state.loading = false;
            state.hasErrors = true;
            state.error = payload;
        },
        deleteStudentSuccess: (state, {
            payload
        }) => {
            state.loading = false;
            state.hasErrors = false;
        },
        setSelectedStudent: (state, {
            payload
        }) => {
            state.selectedStudent = payload;
        },
        addStudentSuccess: (state, {
            payload
        }) => {
            state.students.push(payload);
            state.loading = false;
            state.hasErrors = false;
        },
        addStudentFailure: (state, {payload}) => {
            state.loading = false;
            state.hasErrors = true;
        }
    }
});

const { reducer } = studentsSlice;

export const {
    setLoading,
    getStudentsSuccess,
    getStudentsFailure,
    getStudentByIdSuccess,
    updateStudentSuccess,
    deleteStudentSuccess,
    setSelectedStudent,
    addStudentFailure,
    updateStudentFailure,
    addStudentSuccess
} = studentsSlice.actions;
export const studentsSelector = (state) => state.students;
export default reducer;