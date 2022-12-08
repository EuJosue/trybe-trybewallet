import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/system';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { Component } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionSuccessfulLogin } from '../redux/actions';

const NUMBER_SIX = 6;

class LoginForm extends Component {
  state = {
    showPassword: false,
    email: '',
    password: '',
    buttonIsDisabled: true,
    validEmail: false,
    validPassword: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.enableButton);
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { history, dispatch } = this.props;
    const { email } = this.state;

    dispatch(actionSuccessfulLogin(email));

    history.push('/carteira');
  };

  clickShowPassword = () => (
    this.setState(({ showPassword }) => ({
      showPassword: !showPassword,
    }))
  );

  enableButton = () => {
    const { email, password } = this.state;
    const emailRegEx = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
    const validEmail = !!email.match(emailRegEx);
    const validPassword = password.length >= NUMBER_SIX;

    this.setState({
      validEmail,
      validPassword,
      buttonIsDisabled: !(validEmail && validPassword),
    });
  };

  render() {
    const {
      showPassword,
      email,
      password,
      buttonIsDisabled,
      validEmail,
      validPassword,
    } = this.state;
    return (
      <Box
        component="form"
        noValidate
        autoComplete="off"
        paddingX="50px"
        autoSave="off"
        width
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          flexGrow: 1,
        } }
        onSubmit={ this.handleSubmit }
      >
        <TextField
          label="Email"
          id="outlined-required"
          type="email"
          data-testid="email-input"
          name="email"
          onChange={ this.handleChange }
          value={ email }
          fullWidth
          autoFocus
          error={ !validEmail && email.length > 0 }
          helperText={ !validEmail
            && email.length > 0
            && 'Utilize um formato de email válido' }
        />
        <TextField
          id="outlined-password-input"
          label="Senha"
          type={ showPassword ? 'text' : 'password' }
          name="password"
          value={ password }
          onChange={ this.handleChange }
          autoComplete="current-password"
          data-testid="password-input"
          error={ !validPassword && password.length > 0 }
          helperText={ !validPassword
            && password.length > 0
            && 'A senha tem que conter mais de 6 caracteres' }
          InputProps={ {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={ this.clickShowPassword }>
                  { showPassword ? <VisibilityOff /> : <Visibility /> }
                </IconButton>
              </InputAdornment>
            ),
          } }
        />
        <LoadingButton
          disabled={ buttonIsDisabled }
          type="submit"
          variant="contained"
        >
          Entrar
        </LoadingButton>
      </Box>
    );
  }
}

LoginForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.user,
});

export default connect(mapStateToProps)(LoginForm);
