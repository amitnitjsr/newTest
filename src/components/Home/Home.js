import React, { Component } from 'react'
import Axios from 'axios';

class Home extends Component {
    state = {
        username: '',
        email_id: '',
        password: '',
        data: null
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        Axios.get('https://ec3ll8cxti.execute-api.ap-southeast-2.amazonaws.com/prod/register')
            .then((response) => {
                this.setState({ data: response.data })
            })
            .catch((error) => {
                console.log('Error', error)
            })
    }

    inputHandler = (value, name) => {
        this.setState({ [name]: value })
    }

    addHandler = () => {

        let data = {
            username: this.state.username,
            password: this.state.password,
            email_id: this.state.email_id,
        }

        Axios.post('https://ec3ll8cxti.execute-api.ap-southeast-2.amazonaws.com/prod/register', data, { headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                this.setState({ username: '', password: '', email_id: '' });
                this.fetchData();
            })
            .catch((error) => {
                console.log('err', error)
            })
    }

    render() {
        return (
            <div>
                <label>User Name</label>
                <input type='text' value={this.state.username} placeholder="username"
                    onChange={(event) => this.inputHandler(event.target.value, 'username')} /><br />
                <label>Password</label>
                <input type='password' value={this.state.password} placeholder="password"
                    onChange={(event) => this.inputHandler(event.target.value, 'password')} /><br />
                <label>Email ID</label>
                <input type='email' value={this.state.email_id} placeholder="email id"
                    onChange={(event) => this.inputHandler(event.target.value, 'email_id')} /><br />
                <button type='submit' onClick={() => this.addHandler()}>Add</button>

                <div>
                    <h1>Array Data show</h1>
                    {this.state.data ? this.state.data.registerList.map((val) => {
                        return (
                            <div key={val.id}>
                                <label>Username: </label><label>{val.username} </label><br />
                                <label>Password: </label><label>{val.password} </label><br />
                                <label>Email Id: </label><label>{val.email_id} </label><br /><br />
                            </div>
                        )
                    })

                        : null}
                </div>
            </div>
        )
    }
}

export default Home;