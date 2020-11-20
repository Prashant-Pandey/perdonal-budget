import React, { Component } from 'react';
import Axios from 'axios';
import { Button, TextField, Snackbar, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import './SignupPage.scss';

export default class SignupPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loginSuccess: false,
			isSignupError: false,
			signupError: '',
			fNameError: false,
			lNameError: false,
			emailError: false,
			passwordError: false,
			phoneError: false
		}
	}

	signup = async (e) => {
		e.preventDefault();
		// login attempt
		const signupData = {
			'firstName': e.target.fName.value,
			'lastName': e.target.lName.value,
			'email': e.target.email.value,
			'password': e.target.password.value,
			'phone': e.target.phone.value
		};

		this.setState({
			fNameError: signupData.firstName === '',
			lNameError: signupData.lastName === '',
			emailError: signupData.email === '',
			passwordError: signupData.password === '',
			phoneError: signupData.phone.includes('_')
		});

		if (signupData.firstName === '' || signupData.lastName === '' || signupData.email === '' || signupData.password === '' || signupData.phone.includes('_')) return;

		try {
			const res = await Axios.post("http://localhost:3000/auth/signup",
				JSON.stringify(signupData), {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (res.data.err) {
				this.setState({ isSignupError: res.data.err })
			}

			if (res.data.success) {
				this.setState({ loginSuccess: true });
			}

			console.log(res.data);

		} catch (error) {
			let msg = error.response.data.err;
			this.setState({ isSignupError: true, signupError: msg })
		}

		return;
	}

	render() {
		if (this.state.loginSuccess) {
			return (<Redirect to="/dashboard" />)
		}
		return (
			<div className="SignupPage">
				<Snackbar
					open={this.state.isSignupError} autoHideDuration={600}>
					<MuiAlert elevation={10}
						autohideduration={6000} severity="error">
						<div>
							{this.state.signupError}
							<IconButton size="small" aria-label="close" color="inherit" onClick={() => { this.setState({ isSignupError: false, signupError: '' }) }}>
								<Close fontSize="small" />
							</IconButton>
						</div>
					</MuiAlert>
				</Snackbar>

				<form id="signup-form" onSubmit={async (e) => {
					e.preventDefault();
					await this.signup(e);
					return false;
				}} noValidate autoComplete="on">
					<TextField
						error={this.state.fNameError}
						type="text"
						label="First Name"
						name="fName"
					/>
					<TextField
						error={this.state.lNameError}
						type="text"
						label="Last Name"
						name="lName"
					/>
					<TextField
						error={this.state.emailError}
						type="email"
						label="Email"
						name="email"
					/>
					<TextField
						error={this.state.passwordError}
						label="Password"
						type="password"
						name="password"
					/>
					<NumberFormat
						error={this.state.phoneError}
						name="phone"
						customInput={TextField}
						label="Phone Number"
						format="+1 (###) ###-####"
						allowEmptyFormatting
						mask="_"
					/>
					<Button type="submit" variant="contained" color="primary"> Sign-up </Button>
				</form>
				<div className="other-login-options">
					<Link component={RouterLink} to="/login">Already have account? Login here</Link>
				</div>
			</div>
		)
	}
}