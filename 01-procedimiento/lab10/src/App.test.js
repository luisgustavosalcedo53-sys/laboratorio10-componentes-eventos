import { render, screen } from '@testing-library/react';
import App from './App';
test('muestra carga y luego productos', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => [
    { codigo: 1, descripcion: 'Coca cola', precio: 2.33 },
    { codigo: 2, descripcion: 'Fanta', precio: 1.7 },
  ] });
  render(<App />);
  expect(screen.getByRole('status')).toHaveTextContent('recuperando datos...');
  expect(await screen.findByText('Coca cola')).toBeInTheDocument();
  expect(screen.getByText('Fanta')).toBeInTheDocument();
});
test('informa fallo de servicio', async () => {
  global.fetch = jest.fn().mockRejectedValue(new Error('Sin conexión'));
  render(<App />);
  expect(await screen.findByRole('alert')).toHaveTextContent('No se pudo conectar');
});
