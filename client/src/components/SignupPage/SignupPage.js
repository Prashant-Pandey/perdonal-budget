import React, { Component } from 'react';
import { signup as register } from '../../actions/authAction'
import { Button, TextField, Snackbar, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import './SignupPage.scss';
import { connect } from 'react-redux';

class SignupPage extends Component {

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

		if (signupData.firstName === '' || signupData.lastName === '' || signupData.email === '' || signupData.password === '' || signupData.phone.includes('_')) {
			this.setState({
				fNameError: signupData.firstName === '',
				lNameError: signupData.lastName === '',
				emailError: signupData.email === '',
				passwordError: signupData.password === '',
				phoneError: signupData.phone.includes('_')
			});
			return;
		}

		this.props.dispatch(register(signupData)).then(() => {
			this.setState({ loginSuccess: true });
		}).catch(() => {
			this.setState({ ...this.state, showError: true });
		});

	}

	render() {
		if (this.state.loginSuccess) {
			return (<Redirect to="/dashboard" />)
		}
		const { message } = this.props;
		return (
			<div className="SignupPage">
				<Snackbar
					open={this.state.showError} autoHideDuration={600}>
					<MuiAlert elevation={10}
						autohideduration={6000} severity="error">
						<div>
							message
							<IconButton size="small" aria-label="close" color="inherit" onClick={() => { this.setState({ showError: false }) }}>
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

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
		message: state.msg.message
	}
}

export default connect(mapStateToProps)(SignupPage);
