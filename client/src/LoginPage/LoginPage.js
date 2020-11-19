import Axios from 'axios';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import './LoginPage.scss';

export default class LoginPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loginError: false,
			loginSuccess: false
		}
		this.login = this.login.bind(this);
	}

	login(e) {
		e.preventDefault();
		// login attempt
		const loginData = JSON.stringify({
			'email': e.target.email.value,
			'password': e.target.password.value
		});
		Axios.post("http://localhost:3000/login", loginData, {
			headers: {
				"Content-Type": "application/json"
			}
		}).then((res) => {
			this.setState({loginError: this.state.loginSuccess, loginSuccess: !this.state.loginSuccess});
			console.log(res);
		}).catch((e) => {
			console.log(e);

		});

		return false;
	}

	render() {
		if (this.state.loginSuccess) {
			return (<Redirect to="/dashboard"/>)
		}
		
		return (
			<div className="LoginPage">
				{/** Login Page */}
				<form id="login-form" onSubmit={this.login} noValidate autoComplete="off">
					<TextField
						error={this.state.loginError}
						type="text"
						label="Email"
						name="email"
					/>
					<TextField
						label="Password"
						type="password"
						name="password"
					/>
					<Button type="submit" variant="contained" color="primary"> Login </Button>
				</form>
				<div className="other-login-options">
					<Link component={RouterLink} to="/signup">No account yet? Signup here</Link>
					<Link component={RouterLink} to="/forgot-passsword">Forgot Password?</Link>
				</div>
			</div>
		)
	}
}