const { getHome, addStudentHandler, getAllStudentHandler, getStudentByIdHandler, editStudentByIdHandler, deleteStudentByIdHandler } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/add',
        handler: addStudentHandler,
    },
    {
        method: 'GET',
        path: '/students',
        handler: getAllStudentHandler,
    },
    {
        method: 'GET',
        path: '/',
        handler: getHome,
    },
    {
        method: 'GET',
        path: '/students/{id}',
        handler: getStudentByIdHandler,
    },
    {
        method: 'PUT',
        path: '/students/{id}',
        handler: editStudentByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/students/{id}',
        handler: deleteStudentByIdHandler,
    }
];

module.exports = routes;