import {
  IconButton,
  Paper,
  Table as TableMUI,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shape, func, arrayOf, string, number } from 'prop-types';
import { Delete, Edit } from '@mui/icons-material';
import { actionDeleteExpense, actionStartEditExpense } from '../redux/actions';

class Table extends Component {
  convertValue = (value, exchangeRates, currency) => value * exchangeRates[currency].ask;

  handleDelete = (id) => {
    const { dispatch } = this.props;

    dispatch(actionDeleteExpense(id));
  };

  handleEdit = (id) => {
    const { dispatch } = this.props;

    dispatch(actionStartEditExpense(id));
  };

  render() {
    const { expenses } = this.props;

    return (
      <TableContainer sx={ { padding: 5 } } component={ Paper }>
        <TableMUI sx={ { minWidth: 650 } } aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Descrição</TableCell>
              <TableCell align="center">Tag</TableCell>
              <TableCell align="center">Método de pagamento</TableCell>
              <TableCell align="center">Valor</TableCell>
              <TableCell align="center">Moeda</TableCell>
              <TableCell align="center">Câmbio utilizado</TableCell>
              <TableCell align="center">Valor convertido</TableCell>
              <TableCell align="center">Moeda de conversão</TableCell>
              <TableCell align="center">Editar/Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { expenses.map(({
              id,
              value,
              description,
              currency,
              method,
              tag,
              exchangeRates,
            }) => (
              <TableRow
                key={ id }
                sx={ { '&:last-child td, &:last-child th': { border: 0 } } }
              >
                <TableCell align="center" scope="row">
                  { description }
                </TableCell>

                <TableCell align="center">{ tag }</TableCell>
                <TableCell align="center">{ method }</TableCell>
                <TableCell align="center">{ Number(value).toFixed(2) }</TableCell>

                <TableCell align="center">
                  { exchangeRates[currency].name }
                </TableCell>

                <TableCell align="center">
                  { Number(exchangeRates[currency].ask).toFixed(2) }
                </TableCell>

                <TableCell align="center">
                  { 'R$ ' }
                  { this.convertValue(value, exchangeRates, currency).toFixed(2) }
                </TableCell>

                <TableCell align="center">Real</TableCell>

                <TableCell align="center">
                  <IconButton
                    data-testid="delete-btn"
                    onClick={ () => this.handleDelete(id) }
                  >
                    <Delete />
                  </IconButton>

                  <IconButton
                    data-testid="edit-btn"
                    onClick={ () => this.handleEdit(id) }
                  >
                    <Edit />
                  </IconButton>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </TableMUI>
      </TableContainer>

    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

Table.propTypes = {
  dispatch: func.isRequired,
  expenses: arrayOf(shape({
    id: number,
    value: string,
    description: string,
    currency: string,
    method: string,
    tag: string,
    exchangesRates: shape({}),
  })).isRequired,
};

export default connect(mapStateToProps)(Table);
