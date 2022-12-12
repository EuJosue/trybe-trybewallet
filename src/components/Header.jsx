import { AccountCircle } from '@mui/icons-material';
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    menu: null,
  };

  handleOpenMenu = ({ currentTarget }) => {
    this.setState({ menu: currentTarget });
  };

  handleCloseMenu = () => {
    this.setState({ menu: null });
  };

  render() {
    const { menu } = this.state;
    const { email, total } = this.props;
    return (
      <AppBar position="static">
        <Toolbar sx={ { justifyContent: 'space-between' } }>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={ { mr: 2 } }
          >
            <span className="logo">
              <span className="logoIcon">💸</span>
              <span className="logoTrybe">Trybe</span>
              <strong className="logoStrong">Wallet</strong>
            </span>
          </IconButton>

          <h6 data-testid="total-field">
            <Typography
              variant="h6"
              component="div"
            >
              { `Total de Despesas: ${total}` }
            </Typography>
          </h6>

          <h6 data-testid="header-currency-field">
            <Typography
              variant="h6"
              component="div"
            >
              Câmbio atual: BRL
            </Typography>
          </h6>

          <Tooltip title="Open settings">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={ this.handleOpenMenu }
              color="inherit"
            >
              <AccountCircle />
              <span
                style={ { fontSize: '20px', marginLeft: '5px' } }
                data-testid="email-field"
              >
                { email }
              </span>
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={ menu }
            anchorOrigin={ {
              vertical: 'top',
              horizontal: 'right',
            } }
            keepMounted
            transformOrigin={ {
              vertical: 'top',
              horizontal: 'right',
            } }
            open={ Boolean(menu) }
            onClose={ this.handleCloseMenu }
          >
            <MenuItem onClick={ this.handleCloseMenu }>Profile</MenuItem>
            <MenuItem onClick={ this.handleCloseMenu }>My account</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = ({ user: { email } }) => ({
  email,
  total: 0,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
