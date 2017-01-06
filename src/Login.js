import React, { Component } from 'react';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

import { authUser, createUser } from './api/firebaseApi';
import { validateCreds } from './utils';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';

const styles = {
  root: {
    height: '50%',
    width: '50%',
    maxWidth: '500px',
    margin: '10% auto'
  },
  tab: {
    textAlign: 'center',
    padding: '30px'
  },
  button: {
    width: '60%',
    marginTop: '30px' 
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.state = {
      errors: {
        emailError: '',
        passError: ''
      }
    }
  }

  handleLogin(e) {
    e.preventDefault();
    const email = this.refs.loginEmail.getValue(), pass = this.refs.loginPass.getValue();
    const errors = validateCreds(email, pass);
    this.setState({ errors });
    if (errors.emailError == '' && errors.passError == '') this.props.handleLogin(email, pass);
  }

  handleRegister(e) {
    e.preventDefault();
    const email = this.refs.regEmail.getValue(), 
          pass = this.refs.regPass.getValue(), 
          pass2 = this.refs.regPass2.getValue();
    const errors = validateCreds(email, pass, pass2);
    this.setState({ errors });
    if (errors.emailError == '' && errors.passError == '') this.props.handleRegister(email, pass);
    // createUser(email, pass)
    //   .then(user => authUser(email, pass))
    //   .catch(err => console.log(err))
  }

  render() {
    return (
    <Paper zDepth={3} style={styles.root}>
      <Tabs>
        <Tab label="Login">
          <form style={styles.tab}>
            <TextField
              hintText="E-mail"
              ref="loginEmail"
              errorText={this.state.errors.emailError}
            /><br />
            <TextField
              hintText="Password"
              floatingLabelText="Password"
              type="password"
              ref="loginPass"
              errorText={this.state.errors.passError}
            /><br />
            <RaisedButton label="Login" style={styles.button} 
              primary={true} onTouchTap={this.handleLogin} />

          </form>
        </Tab>
        <Tab label="Register">
          <form style={styles.tab} onSubmit={this.handleRegister}>
            <TextField
              hintText="E-mail"
              floatingLabelText="E-mail"
              errorText={this.state.errors.emailError}
              type="email"
              ref="regEmail"
            /><br />
            <TextField
              hintText="Password"
              floatingLabelText="Password"
              type="password"
              ref="regPass"
              errorText={this.state.errors.passError}
            /><br />
            <TextField
              hintText="Confirm Password"
              floatingLabelText="Confirm Password"
              type="password"
              ref="regPass2"
              errorText={this.state.errors.passError}
            /><br />
            <RaisedButton label="Register" style={styles.button} 
              primary={true} onTouchTap={this.handleRegister} />
          </form>
        </Tab>
      </Tabs>
    </Paper>
  )
  }
}

export default Login;