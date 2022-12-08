import { Box } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';
import '../Login.css';

class Login extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div className="background">
        <div className="backgroundImage" />
        <Box
          width
          marginX="50px"
          sx={ {
            border: '1px solid black',
            borderRadius: '10px',
            minHeight: 350,
            minWidth: 350,
            maxWidth: 500,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: '#fdfdfd',
            boxShadow: '-4px 9px 13px rgba(3, 107, 82, 0.3)',
            zIndex: 2,
          } }
        >
          <Box sx={ { flexGrow: 2 } }>
            <p className="logo">
              <span className="logoIcon">💸</span>
              <span className="logoTrybe">Trybe</span>
              <strong className="logoStrong">Wallet</strong>
            </p>
          </Box>
          <LoginForm history={ history } />
        </Box>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default Login;
