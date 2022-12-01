import axiosInstance from "../axios";

const getStudentByID = async (id) => {
    const response = await axiosInstance.get(`/students/${id}`);
    return response.data;
}

const createStudent = async (student) => {
    const response = await axiosInstance.post("/students/add", student);
    return response.data;
}

const updateStudent = async (student) => {
    const response = await axiosInstance.put(`/students/${student.id}`, student);
    return response.data;
}

const deleteStudent = async (id) => {
    const response = await axiosInstance.delete(`/students/${id}`);
    return response.data;
}

const fetchStudents = async () => {
    const response = await axiosInstance.get('/students');
    return response.data;
}


const studentService = { 
    getStudentByID,
    createStudent,
    updateStudent, 
    deleteStudent,
    fetchStudents
};

export default studentService;