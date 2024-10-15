/* import { render, screen } from '@testing-library/react';
import Index from './Index'; // Asegúrate de la ruta correcta
import { expect } from 'vitest';

describe('Index Component', () => {
  test('renders without crashing', () => {
    render(<Index auth={{ user: {} }} clients={[]} />);
    
    const heading = screen.getByRole('heading', { name: /crear pedidos/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders the client selection', () => {
    render(<Index auth={{ user: {} }} clients={[{ id: 1, full_name: 'Test Client', identification_number: '123456' }]} />);
    
    const client = screen.getByText('Test Client');
    expect(client).toBeInTheDocument();
  });
});
 */