import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import '../app-style.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nama: '',
            kelas: '',
            users: [],
            formStatus: true
        }

        // Pemanggilan Masing Masing Function
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    // Tahap Sebelum Component Di Render
    componentWillMount () {
        let that = this
        axios.get('http://localhost:3000/siswa')
        .then(function (response) {
          that.props.getAllUsers(response.data);
          that.setState({
            users: response.data
          });
          // console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.users !== this.state.users){
        this.setState({
          users: nextProps.users
        });
      }
    }

    onInputChange (e) {
      const state = this.state;
      state[e.target.name] = e.target.value; 
      this.setState(state);
    }

    // Delete Users
    deleteUser(e, userID){
      e.preventDefault();
      let that = this;
      axios.delete('http://localhost:3000/siswa/' + userID)
      .then(function(response){
        let users = that.state.users;
        for(let a = 0; a < users.length; a++){
          if(userID === users[a].id){
            users.splice(a, 1);
          }
        }
        that.props.deleteUser(users);
      })
      .catch(function(error){
        console.log(error)
      })
    }

    // Handle Data Form Input
    handleFormSubmit(e){
      e.preventDefault();
      let that = this;
      if(this.state.nama && this.state.kelas){
        let Ulength = that.state.users.length;
        let lastID = Ulength === 0 ? 0 : that.state.users[Ulength-1].id;
        // console.log(lastID)
        axios.post('http://localhost:3000/siswa', {
          id: this.state.users.length > 0 ? (lastID+1) : 1,
          nama: this.state.nama,
          kelas: this.state.kelas
        })
        .then(function(response) {
          that.props.saveUser(response.data);
          that.state({
            nama: '',
            kelas: ''
          })
        })
        .catch(function(error){
          console.log(error);
        })
      }else{
        that.setState({
          formStatus: false
        })
      }
    }
    render() {
        const { nama, kelas } = this.state;
        let that = this;
        return (
          <div className="container">
            <table id="users">
              <thead>
                <tr>
                  <th>No</th>
                  <th>ID</th>
                  <th>Nama</th>
                  <th>Kelas</th>
                  <th>Alamat</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                  {
                      this.state.users.length > 0
                      ? this.state.users.map(function(result, i) {
                        return (
                            <tr key={i}>
                                <td>{i+=1}</td>
                                <td>{result.id}</td>
                                <td>{result.nama}</td>
                                <td>{result.kelas}</td>
                                <td>{result.alamat}</td>
                                <td>
                                  <a href="/" onClick={ (e) => that.deleteUser(e, result.id) }>Hapus Data</a>
                                </td>
                            </tr>
                        )
                      })
                      : <tr><td colSpan="4">Siswa Kosong</td></tr>
                  }
              </tbody>
            </table>
            <div>
              <form onSubmit={this.handleFormSubmit}>
                <input type="text" name="nama" value={nama} placeholder="Nama" onChange={this.onInputChange} />
                <br />
                <input type="text" name="kelas" value={kelas} placeholder="Kelas" onChange={this.onInputChange} />
                <br />
                <button type="submit" >Simpan</button>
              </form>
            </div>
            {! this.state.formStatus && <div className="warning-message">Form tidak boleh kosong</div>}
          </div>
        );
    }
}

App.protoTypes = {
    users: PropTypes.object,
    saveUser: PropTypes.func,
    getAllUsers: PropTypes.func,
    deleteUser: PropTypes.func
}

export default App