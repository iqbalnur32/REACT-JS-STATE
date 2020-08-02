import {ADD_SISWA, FECTH_SISWA, DELETE_SISWA, UPDATE_SISWA} from "./siswa-type";

const userReducer = (state = [], action) => {
    console.log('action : ', action);
    switch(action.type){
        
        case ADD_SISWA:
            return [
                ...state,
                action.data
            ];
        
        case DELETE_SISWA:
            let userleft = action.data;
            let res = userleft.map(function(user) {
                return {
                    id  : user.id,
                    nama: user.nama,
                    kelas: user.kelas,
                    alamat: user.alamat
                }``
            });

            return res;

        case FECTH_SISWA:
            return action.data;

        case UPDATE_SISWA:
            return [
                ...state,
                action.data
            ];
        default:
            return state;
    }   
}

export default userReducer;