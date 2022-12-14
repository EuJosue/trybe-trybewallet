import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Header from '../components/Header';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Tela de Login', () => {
  it('O pathname deve ser \'/\'', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');
  });

  it('Deve ter 1 input do tipo \'text\', 1 input do tipo \'password\' e 1 botão', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByRole('textbox', { name: /email/i });
    const password = screen.getByLabelText(/senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('O botão deve estar inicialmente desabilitado', () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toBeDisabled();
  });

  it('Se o email for preenchido com um email válido e a senha com uma senha válida, o botão deve ser habilitado', () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button', { name: /entrar/i });
    const email = screen.getByRole('textbox', { name: /email/i });
    const password = screen.getByLabelText(/senha/i);

    userEvent.type(email, 'email@email.com');
    userEvent.type(password, '123456');

    expect(button).not.toBeDisabled();
  });

  it('Se inserido um email e/ou senha inválido o botão não é habilitado', () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button', { name: /entrar/i });
    const email = screen.getByRole('textbox', { name: /email/i });
    const password = screen.getByLabelText(/senha/i);

    userEvent.type(email, 'email.com');
    userEvent.type(password, '123456');

    expect(button).toBeDisabled();

    userEvent.clear(email);
    userEvent.clear(password);
    userEvent.type(email, 'teste@email.com');
    userEvent.type(password, '12456');

    expect(button).toBeDisabled();
  });

  it('Se feito login corretamente deve ser redirecionado para a página \'carteira\'', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button', { name: /entrar/i });
    const email = screen.getByRole('textbox', { name: /email/i });
    const password = screen.getByLabelText(/senha/i);

    userEvent.type(email, 'email@email.com');
    userEvent.type(password, '123456');
    userEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
  });
});

describe.only('Header', () => {
  it('Deve exibir o email da pessoa usuária e o totalExpense', () => {
    const options = {
      initialState: {
        wallet: {
          currencies: [],
          expenses: [],
          editor: false,
          idToEdit: 0,
          totalExpense: '0',
        },
        user: {
          email: 'teste@teste.com',
        },
      },
    };

    renderWithRouterAndRedux(<Header />, options);

    const email = screen.getByText(/teste@teste\.com/i);
    const expenses = screen.getByText(/0/i);

    expect(email).toBeInTheDocument();
    expect(expenses).toBeInTheDocument();
  });

  it.skip('', () => {
    const options = {
      initialState: {
        wallet: {
          currencies: [],
          expenses: [],
          editor: false,
          idToEdit: 0,
          totalExpense: '0',
        },
        user: {
          email: 'teste@teste.com',
        },
      },
    };

    renderWithRouterAndRedux(<App />, options);
  });
});

describe('Carteira', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('', () => {
    renderWithRouterAndRedux(<App />, options);
  });

  it.skip('', () => {
    renderWithRouterAndRedux(<App />, options);
  });
});
