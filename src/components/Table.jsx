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
import { shape, arrayOf, string, number } from 'prop-types';
import { Delete, Edit } from '@mui/icons-material';

class Table extends Component {
  convertValue = (value, exchangeRates, currency) => value * exchangeRates[currency].ask;

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
                <TableCell align="center" component="th" scope="row">
                  { description }
                </TableCell>
                <TableCell align="center">{ tag }</TableCell>
                <TableCell align="center">{ method }</TableCell>
                <TableCell align="center">{ value }</TableCell>
                <TableCell align="center">{ currency }</TableCell>
                <TableCell align="center">
                  { exchangeRates[currency].ask }
                </TableCell>
                <TableCell align="center">
                  { 'R$ ' }
                  { this.convertValue(value, exchangeRates, currency) }
                </TableCell>
                <TableCell align="center">BRL</TableCell>
                <TableCell align="center">
                  <IconButton>
                    <Delete />
                  </IconButton>
                  <IconButton>
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
