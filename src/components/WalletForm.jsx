import { LoadingButton } from '@mui/lab';
import {
  Box,
  // Input,
  /* FormControl, InputLabel, MenuItem, Select, */
  // TextField,
} from '@mui/material';
import React, { Component } from 'react';
import {
  func,
  string,
  arrayOf,
  /* number, shape, bool */
} from 'prop-types';
import { connect } from 'react-redux';
import { actionSetCurrencies, newExpense } from '../redux/actions';

const alimentacao = 'Alimentação';

class WalletForm extends Component {
  state = {
    expenseCurrency: 'USD',
    expenseMethod: 'Dinheiro',
    expenseTag: alimentacao,
    expenseDescription: '',
    expenseValue: '',
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

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      expenseCurrency,
      expenseMethod,
      expenseTag,
      expenseDescription,
      expenseValue,
    } = this.state;
    const { dispatch } = this.props;

    dispatch(newExpense({
      value: expenseValue,
      description: expenseDescription,
      currency: expenseCurrency,
      method: expenseMethod,
      tag: expenseTag,
    }));

    this.setState({
      expenseCurrency: 'USD',
      expenseMethod: 'Dinheiro',
      expenseTag: alimentacao,
      expenseDescription: '',
      expenseValue: '',
    });
  };

  render() {
    const { currencies } = this.props;
    const {
      expenseCurrency,
      expenseMethod,
      expenseTag,
      expenseDescription,
      expenseValue,
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
          onSubmit={ this.handleSubmit }
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

            <input
              placeholder="Descrição da despesa"
              type="text"
              data-testid="description-input"
              name="expenseDescription"
              value={ expenseDescription }
              onChange={ this.handleChange }
            />

            <input
              placeholder="Valor"
              type="number"
              data-testid="value-input"
              name="expenseValue"
              value={ expenseValue }
              onChange={ this.handleChange }
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
              { ['Dinheiro', 'Cartão de crédito', 'Cartão de débito']
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

              { [alimentacao, 'Lazer', 'Trabalho', 'Transporte', 'Saúde']
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
            Adicionar Despesas
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
};

export default connect(mapStateToProps)(WalletForm);
