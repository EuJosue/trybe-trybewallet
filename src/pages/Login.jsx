import { Box, Container } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';

class Login extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <Container
        sx={ {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        } }
      >
        <Box
          width
          marginX="50px"
          sx={ {
            border: '1px solid black',
            minHeight: 350,
            minWidth: 350,
            maxWidth: 500,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          } }
        >
          <Box sx={ { flexGrow: 2 } }>Logo</Box>
          <LoginForm history={ history } />
        </Box>
      </Container>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default Login;
