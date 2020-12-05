import React, { Component } from 'react';
import { Button, TextField, Snackbar, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';
import { connect } from 'react-redux';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import './LoginPage.scss';
import { login } from '../../actions/authAction'

class LoginPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isEmailError: false,
			isPasswordError: false,
			loginSuccess: false,
			showError: false,
			emailError: '',
			passwordError: ''
		}
		this.login = this.login.bind(this);
	}

	setLoginError = (isError) => {
		if (isError) {
			this.setState({ isEmailError: true, emailError: "Please check your email" });
			this.setState({ isPasswordError: true, passwordError: "Please validate your password" });
		}
	}

	async login(e) {
		const loginJSON = {
			'email': e.target.email.value,
			'password': e.target.password.value,
		};
		if (loginJSON.email == "" || !loginJSON.email || loginJSON.password == "" || !loginJSON.password) return this.setLoginError(true);

		this.props.dispatch(login(loginJSON)).then(() => {
			this.setState({ loginSuccess: true });
		}).catch(() => {
			this.setLoginError(true);
			this.setState({ ...this.state, showError: true });
		});

	}

	render() {
		if (this.state.loginSuccess) {
			return (<Redirect to="/dashboard" />)
		}
		
		const {message} = this.props
		return (
			<div className="LoginPage">
				{/** Login Page */}
				<Snackbar
					open={this.state.showError} autoHideDuration={600}>
					<MuiAlert elevation={10}
						autohideduration={6000} severity="error">
						<div>
							{message}
							<IconButton size="small" aria-label="close" color="inherit" onClick={() => { this.setState({ showError: false }) }}>
								<Close fontSize="small" />
							</IconButton>
						</div>
					</MuiAlert>
				</Snackbar>
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
		isLoggedIn: state.auth.isLoggedIn,
		message: state.msg.message
	}
}

export default connect(mapStateToProps)(LoginPage);