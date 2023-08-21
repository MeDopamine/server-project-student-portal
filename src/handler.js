const { nanoid } = require('nanoid');
const students = require('./students');

const addStudentHandler = (request, h) => {
    const { fullname, gender, phoneNumber, birthDate, address, profilePicture, programStudy, faculty } = request.payload
    const id = nanoid(16);

    const newStudent = {
        fullname, gender, phoneNumber, birthDate, address, profilePicture, programStudy, faculty, id
    };
    students.push(newStudent);
    // console.log(students);

    const isSuccess = students.some((student) => student.id === id);
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Data berhasil ditambahkan',
            data: {
                studentId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Data gagal ditambahkan',
    });
    response.code(500);
    return response;
};
//       "fullname": "Djarot Purnomo",
//       "gender": "Male",
//       "phoneNumber": "+6280987654321",
//       "birthDate": "1995-03-15",
//       "address": "Bogor, Indonesia",
//       "profilePicture": "https://randomuser.me/api/portraits/men/2.jpg",
//       "programStudy": "Fisika",

const getAllStudentHandler = () => ({
    status: 'success',
    data: {
      students,
    },
  })

const getStudentByIdHandler = (request, h) => {
    const {id} = request.params
    const student = students.find((student) => student.id === id);
    if (student !== undefined) {
        const response = h.response({
            status: 'success',
            data: {
                student,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Data tidak ditemukan',
    });
    response.code(404);
    return response;
}
const editStudentByIdHandler = (request, h) => {
    const {id} = request.params
    const { fullname, gender, phoneNumber, birthDate, address, profilePicture, programStudy, faculty } = request.payload
    const student = students.find((student) => student.id === id);

    if (student !== undefined) {
        Object.assign(student, {
            fullname, 
            gender, 
            phoneNumber, 
            birthDate, 
            address, 
            profilePicture, 
            programStudy, 
            faculty
        });
        const response = h.response({
            status: 'success',
            message: 'Data berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui data. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}
const deleteStudentByIdHandler = (request, h) => {
    const {id} = request.params
    const studentIndex = students.findIndex((student) => student.id === id);

    if (studentIndex !== -1) {
        students.splice(studentIndex, 1); // Menghapus catatan dari array

        const response = h.response({
            status: 'success',
            message: 'Data berhasil dihapus',
        });
        response.code(200);
        return response;
    }
}

module.exports = { addStudentHandler, getAllStudentHandler, getStudentByIdHandler, editStudentByIdHandler, deleteStudentByIdHandler };