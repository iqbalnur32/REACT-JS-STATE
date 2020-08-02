import {ADD_SISWA, FECTH_SISWA, DELETE_SISWA, UPDATE_SISWA, GET_ALL_SISWA} from "./siswa-type";

export const addNewSiswa = (user) => ({
    type: ADD_SISWA,
    data: user
})

export const fetchAllUsers = (users) => ({
    type: FECTH_SISWA,
    data: users
});

export const deleteUser = (usersleft) => ({
    type: DELETE_SISWA,
    data: usersleft
})

export const getAnUser = () => ({
    type: GET_ALL_SISWA
})

export const updateAnUser = (updatedUser) => ({
    type: UPDATE_SISWA,
    data: updatedUser
})