import axios from "axios";
import { ref } from "vue";



const useStudent = () => {
    const url = 'http://localhost:8002/students';
    const students = ref([]);
    const student = ref({});
    const err = ref(null);
    // get all students
    const getStudents = async () => {
        students.value = [];
        err.value = null;
        try {
            const res = await axios(url);
            console.log(res.data);
            students.value = res.data;
        } catch (error) {
            err.value = error;
            console.log(error);
        }
    }

    // get single student Data
    const getStudent = async (id) => {
        const url = `http://localhost:8002/students/${id}`;
        student.value = [];
        err.value = null;
        try {
            const res = await axios(url);
            console.log(res.data);
            student.value = res.data;
        } catch (error) {
            err.value = error;
            console.log(error);
        }
    }
    // create single student 
    const createStudent = async (data) => {
        const url = `http://localhost:8002/students`;
        student.value = [];
        err.value = null;
        try {
            const res = await axios.post(url,data);
            console.log(res.data);
            student.value = res.data;
        } catch (error) {
            err.value = error;
            console.log(error);
        }
    }
    // update single student 
    const updateStudent = async (id,data) => {
        const url = `http://localhost:8002/students/${id}`;
        student.value = [];
        err.value = null;
        try {
            const res = await axios.put(url,data);
            console.log(res.data);
            student.value = res.data;
        } catch (error) {
            err.value = error;
            console.log(error);
        }
    }
    return { getStudents, students, err, getStudent, student,createStudent,updateStudent }
}


export default useStudent;