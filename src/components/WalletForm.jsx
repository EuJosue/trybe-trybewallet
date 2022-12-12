import { LoadingButton } from '@mui/lab';
import {
  Box,
  /* FormControl, InputLabel, MenuItem, Select, */
  TextField,
} from '@mui/material';
import React, { Component } from 'react';
import {
  func,
  string,
  arrayOf,
  /* number, shape, bool */
} from 'prop-types';
import { connect } from 'react-redux';
import { actionSetCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    expenseCurrency: '',
    expenseMethod: '',
    expenseTag: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        delete data.USDT;
        dispatch(actionSetCurrencies(Object.keys(data)));
      });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { currencies } = this.props;
    const {
      expenseCurrency,
      expenseMethod,
      expenseTag,
    } = this.state;
    return (
      <Box
        sx={ {
          border: '1px solid black',
          margin: 5,
          padding: 5,
        } }
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          autoSave="off"
          onSubmit={ (event) => { event.preventDefault(); } }
          sx={ {
            justifyContent: 'space-between',
            display: 'flex',
            alignItems: 'center',
          } }
        >
          <Box
            sx={ {
              display: 'flex',
              justifyContent: 'space-evenly',
              flexWrap: 'wrap',
              gap: '25px',
            } }
          >

            <TextField
              label="Descrição da despesa"
              type="text"
              data-testid="description-input"
              name="expenseDescription"
              sx={ {
                width: '205px',
              } }
            />

            <TextField
              label="Valor"
              type="number"
              data-testid="value-input"
              name="expenseValue"
              sx={ {
                width: '90px',
              } }
            />

            <select
              name="expenseCurrency"
              value={ expenseCurrency }
              onChange={ this.handleChange }
              data-testid="currency-input"
            >
              { currencies.map((currency) => (
                <option
                  key={ currency }
                  value={ currency }
                >
                  { currency }
                </option>
              )) }
            </select>
            <select
              name="expenseMethod"
              data-testid="method-input"
              value={ expenseMethod }
              onChange={ this.handleChange }
            >
              { ['Dinheiro', 'Cartão de crédito', 'Cartão de  débito']
                .map((method) => (
                  <option
                    key={ method }
                    value={ method }
                  >
                    { method }
                  </option>
                )) }
            </select>
            <select
              name="expenseTag"
              data-testid="tag-input"
              value={ expenseTag }
              onChange={ this.handleChange }
            >

              { ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde']
                .map((tag) => (
                  <option
                    key={ tag }
                    value={ tag }
                  >
                    { tag }
                  </option>
                )) }
            </select>

          </Box>

          <LoadingButton
            // disabled={ buttonIsDisabled }
            type="submit"
            variant="contained"
          >
            Entrar
          </LoadingButton>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies } }) => ({
  currencies,
});

WalletForm.propTypes = {
  dispatch: func.isRequired,
  currencies: arrayOf(string).isRequired,
  // editor: bool.isRequired,
  // idToEdit: number.isRequired,
  // expenses: arrayOf(shape({
  //   id: number,
  //   value: string,
  //   description: string,
  //   currency: string,
  //   method: string,
  //   tag: string,
  //   exchangesRates: shape({}),
  // })).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
