import Axios from 'axios';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { connect } from 'react-redux';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import './LoginPage.scss';

class LoginPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isEmailError: false,
			isPasswordError: false,
			loginSuccess: false,
			emailError: '',
			passwordError: ''
		}
		this.login = this.login.bind(this);
	}

	setLoginError = (isError) => {
		if (isError) {
			this.setState({ isEmailError: true, emailError: "Please check your email" });
			this.setState({ isPasswordError: true, passwordError: "Please validate your password" });
		} else {
			this.setState({ isEmailError: false, emailError: "" });
			this.setState({ isPasswordError: false, passwordError: "" });
		}
	}

	async login(e) {
		const loginJSON = {
			'email': e.target.email.value,
			'password': e.target.password.value,
		};
		console.log(loginJSON);
		if (loginJSON.email == "" || !loginJSON.email || loginJSON.password == "" || !loginJSON.password) return this.setLoginError(true)
		else this.setLoginError(false)

		// login attempt
		try {
			const res = await Axios.post("http://localhost:3000/auth/login",
				JSON.stringify(loginJSON), {
				headers: {
					"Content-Type": "application/json",
					'Access-Control-Allow-Origin': '*',
				},
				withCredentials: true,
			});

			console.log(res);

			if (res.data.err) {
				return this.setLoginError(true);
			}

			if (res.data.success) {
				// TODO: Redux
				this.setState({ loginSuccess: true });
			}
		} catch (error) {
			this.setLoginError(true);
		}


	}

	render() {
		if (this.state.loginSuccess) {
			return (<Redirect to="/dashboard" />)
		}
		console.log(this.props);
		return (
			<div className="LoginPage">
				{/** Login Page */}
				<form id="login-form" onSubmit={async (e) => {
					e.preventDefault();
					await this.login(e);
					return false;
				}}
					noValidate autoComplete="off">
					<TextField
						error={this.state.isEmailError}
						type="text"
						label="Email"
						name="email"
						helperText={this.state.emailError}
						required
					/>
					<TextField
						error={this.state.isPasswordError}
						label="Password"
						type="password"
						name="password"
						required
						helperText={this.state.passwordError}
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


const mapStateToProps = (state, ownProps) => {
	return {
		isLoggedIn: state.isLoggedIn
	}
}

function mapDispatchToProps(dispatch) {
	return {
		changeLoginStatus: (isLoggedIn) =>{
			dispatch({type:'CHANGE_LOGIN_STATUS', isLoggedIn: isLoggedIn})
		}
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);