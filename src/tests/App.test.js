import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Header from '../components/Header';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const EMAIL = 'email@email.com';

describe('Tela de Login', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

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

    userEvent.type(email, EMAIL);
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
    userEvent.click(screen.getByTestId('VisibilityIcon'));

    expect(button).toBeDisabled();

    userEvent.clear(email);
    userEvent.clear(password);
    userEvent.type(email, EMAIL);
    userEvent.type(password, '12456');

    expect(button).toBeDisabled();
  });

  it('Se feito login corretamente deve ser redirecionado para a página \'carteira\'', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button', { name: /entrar/i });
    const email = screen.getByRole('textbox', { name: /email/i });
    const password = screen.getByLabelText(/senha/i);

    userEvent.type(email, EMAIL);
    userEvent.type(password, '123456');
    userEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
  });

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
          email: EMAIL,
        },
      },
    };

    renderWithRouterAndRedux(<Header />, options);

    const email = screen.getByText(EMAIL);
    const expenses = screen.getByText(/0/i);

    expect(email).toBeInTheDocument();
    expect(expenses).toBeInTheDocument();

    userEvent.click(email);
    userEvent.click(screen.getByRole('menuitem', { name: /profile/i }));
  });

  it('100% coverage ', async () => {
    renderWithRouterAndRedux(<App />);

    const loginButton = screen.getByRole('button', { name: /entrar/i });
    const email = screen.getByRole('textbox', { name: /email/i });
    const password = screen.getByLabelText(/senha/i);

    userEvent.type(email, EMAIL);
    userEvent.type(password, '123456');
    userEvent.click(loginButton);

    const descriptionInput = await screen.findByRole('textbox');
    const valueInput = screen.getByRole('spinbutton');
    const selectCurrency = screen.getByTestId('currency-input');
    const selectMethod = screen.getByTestId('method-input');
    const selectTag = screen.getByTestId('tag-input');
    const submitButton = screen.getByRole('button', { name: /adicionar despesas/i });

    userEvent.type(descriptionInput, 'descrição');
    userEvent.type(valueInput, '12');
    userEvent.selectOptions(selectMethod, 'Cartão de crédito');
    userEvent.selectOptions(selectTag, 'Lazer');
    waitFor(() => {
      userEvent.selectOptions(selectCurrency, 'CAD');
      userEvent.click(submitButton);
    });

    expect(await screen.findByRole('cell', { name: /descrição/i })).toBeInTheDocument();

    const editButton = screen.getByTestId('EditIcon');

    userEvent.click(editButton);

    userEvent.clear(descriptionInput);
    userEvent.type(descriptionInput, 'despesa');
    userEvent.click(screen.getByRole('button', { name: /editar despesa/i }));

    expect(await screen.findByRole('cell', { name: /despesa/i })).toBeInTheDocument();
  });
});
