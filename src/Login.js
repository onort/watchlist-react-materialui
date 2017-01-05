import React, { Component } from 'react';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';

const styles = {
  root: {
    height: '50%',
    width: '50%',
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
      emailError: '',
      passError: ''
    }
  }

  handleLogin(e) {
    e.preventDefault();
    // TODO: Create a check function in utils and send email, password which may return an object containing error messages to update state(nested).
    if(!isEmail(this.refs.loginEmail.getValue()) || isEmpty(this.refs.loginEmail.getValue())) {
      this.setState({ emailError: "Please enter a valid email address"});
      return;
    }
    if(isEmpty(this.refs.loginPass.getValue())) {
      this.setState({ passError: "Please enter your password"});
      return;
    }
    this.setState({ emailError: '', passError: ''})
    console.log(`Email: ${this.refs.loginEmail.getValue()}, Password: ${this.refs.loginPass.getValue()}, isEmail:${isEmail(this.refs.loginEmail.getValue())}`);
  }

  handleRegister(e) {
    console.log('Register clicked')
    e.preventDefault();
    console.log(`Email: ${this.refs.regEmail.getValue()}, Password: ${this.refs.regPass.getValue()}, Password Confirmation: ${this.refs.regPass2.getValue()}`);
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
              errorText={this.state.emailError}
            /><br />
            <TextField
              hintText="Password"
              floatingLabelText="Password"
              type="password"
              ref="loginPass"
              errorText={this.state.passError}
            />
            <RaisedButton label="Login" style={styles.button} 
              primary={true} onTouchTap={this.handleLogin} />

          </form>
        </Tab>
        <Tab label="Register">
          <form style={styles.tab} onSubmit={this.handleRegister}>
            <TextField
              hintText="E-mail"
              floatingLabelText="E-mail"
              errorText={this.state.emailError}
              type="email"
              ref="regEmail"
            /><br />
            <TextField
              hintText="Password"
              floatingLabelText="Password"
              type="password"
              ref="regPass"
            />
            <TextField
              hintText="Confirm Password"
              floatingLabelText="Confirm Password"
              type="password"
              ref="regPass2"
            />
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