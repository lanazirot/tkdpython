import axiosInstance from "../axios";

const getProfesorByID = async (id) => {
    const response = await axiosInstance.get(`/professors/${id}`);
    return response.data;
}

const createProfesor = async (profesor) => {
    const response = await axiosInstance.post("/professors/add", profesor);
    return response.data;
}

const updateProfesor = async (profesor) => {
    const response = await axiosInstance.put(`/professors/${profesor.id}`, profesor);
    return response.data;
}

const deleteProfesor = async (id) => {
    const response = await axiosInstance.delete(`/professors/${id}`);
    return response.data;
}





const professorService = { 
    getProfesorByID,
    createProfesor
};

export default professorService;