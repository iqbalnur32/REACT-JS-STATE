import { connect } from "react-redux";
import App from "./component/App";
import { addNewSiswa, fetchAllUsers, deleteUser } from "./action/siswa-action";

const mapStateToProps = state => ({
  users: state
});

const mapActionToProps = dispatch => ({
  saveUser: user => dispatch(addNewSiswa(user)),
  getAllUsers: users => dispatch(fetchAllUsers(users)),
  deleteUser: userleft => dispatch(deleteUser(userleft))
});

export default connect(mapStateToProps, mapActionToProps)(App);