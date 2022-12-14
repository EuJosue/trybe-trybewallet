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
  bool,
  number,
  shape,
} from 'prop-types';
import { connect } from 'react-redux';
import {
  actionFinishEditExpense,
  newExpense,
  setCurrencies,
} from '../redux/actions';

const alimentacao = 'Alimentação';

class WalletForm extends Component {
  state = {
    currency: 'USD',
    method: 'Dinheiro',
    tag: alimentacao,
    description: '',
    value: '',
    editorState: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(setCurrencies());
  }

  componentDidUpdate() {
    this.editorMode();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  buildExpenseObject = () => {
    const { currency, method, tag, description, value,
    } = this.state;
    return {
      value,
      description,
      currency,
      method,
      tag,
    };
  };

  clearForm = () => {
    this.setState({
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
      description: '',
      value: '',
    });
  };

  handleSubmit = () => {
    const { dispatch } = this.props;
    dispatch(newExpense(this.buildExpenseObject()));
    this.clearForm();
  };

  editorMode = () => {
    const { editor, expenses, idToEdit } = this.props;
    const { editorState } = this.state;

    if (editor && editorState) {
      const { value, description, currency, method, tag,
      } = expenses.find(({ id }) => id === idToEdit);
      this.setState({
        editorState: false,
        currency,
        method,
        tag,
        description,
        value,
      });
    }
  };

  editorComplete = () => {
    const { expenses, idToEdit, dispatch } = this.props;
    const newExpenses = expenses
      .map((expense) => (expense.id === idToEdit
        ? {
          ...expense,
          ...this.buildExpenseObject(),
        }
        : expense));

    dispatch(actionFinishEditExpense(newExpenses));
    this.clearForm();
  };

  render() {
    const { currencies, isFetching, editor } = this.props;
    const { currency, method, tag, description, value,
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
          onSubmit={ (event) => {
            event.preventDefault();
            return (editor ? this.editorComplete(event) : this.handleSubmit(event));
          } }
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
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />

            <input
              placeholder="Valor"
              type="number"
              data-testid="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />

            <select
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
              data-testid="currency-input"
            >
              { currencies.map((currencyType) => (
                <option
                  key={ currencyType }
                  value={ currencyType }
                >
                  { currencyType }
                </option>
              )) }
            </select>
            <select
              name="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              { ['Dinheiro', 'Cartão de crédito', 'Cartão de débito']
                .map((methodType) => (
                  <option
                    key={ methodType }
                    value={ methodType }
                  >
                    { methodType }
                  </option>
                )) }
            </select>
            <select
              name="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >

              { [alimentacao, 'Lazer', 'Trabalho', 'Transporte', 'Saúde']
                .map((tagType) => (
                  <option
                    key={ tagType }
                    value={ tagType }
                  >
                    { tagType }
                  </option>
                )) }
            </select>

          </Box>

          <LoadingButton
            loading={ isFetching }
            type="submit"
            variant="contained"
          >
            { editor ? 'Editar despesa' : 'Adicionar Despesas' }
          </LoadingButton>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  isFetching: wallet.isFetching,
  idToEdit: wallet.idToEdit,
  editor: wallet.editor,
  expenses: wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: func.isRequired,
  currencies: arrayOf(string).isRequired,
  isFetching: bool.isRequired,
  editor: bool.isRequired,
  idToEdit: number.isRequired,
  expenses: arrayOf(shape({ id: number })).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
