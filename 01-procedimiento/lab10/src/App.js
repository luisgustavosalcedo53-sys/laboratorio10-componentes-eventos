import React, { Component } from 'react';
import './App.css';
const API = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/producto/';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { productos: [], recuperado: false, error: '' };
  }
  // Método vigente que reemplaza componentWillMount de la guía.
  componentDidMount() { this.recuperarProductos(); }
  componentWillUnmount() { this.controlador?.abort(); }

  recuperarProductos = async () => {
    this.controlador?.abort();
    this.controlador = new AbortController();
    this.setState({ recuperado: false, error: '' });
    try {
      const respuesta = await fetch(API, { signal: this.controlador.signal });
      if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
      const prod = await respuesta.json();
      this.setState({ productos: prod, recuperado: true });
    } catch (error) {
      if (error.name !== 'AbortError') this.setState({ error: 'No se pudo conectar con Django. Comprueba que esté iniciado en el puerto 8000.' });
    }
  };

  mostrarTabla() {
    return <>
      <p className="estado">Conexión completada · {this.state.productos.length} productos recibidos</p>
      <table>
        <caption>Productos obtenidos del servicio web de Django</caption>
        <thead><tr><th>Código</th><th>Descripción</th><th>Precio</th></tr></thead>
        <tbody>{this.state.productos.map(prod => (
          <tr key={prod.codigo}><td>{prod.codigo}</td><td>{prod.descripcion}</td><td>S/ {prod.precio.toFixed(2)}</td></tr>
        ))}</tbody>
      </table>
    </>;
  }

  render() {
    return <main>
      <header><span>LABORATORIO 10 / PROCEDIMIENTO</span><h1>Productos desde Django</h1>
        <p>Componentes de clase, estado y consumo de un servicio web.</p></header>
      <section>
        {this.state.error ? <p role="alert">{this.state.error}</p> : this.state.recuperado ? this.mostrarTabla() : <p role="status">recuperando datos...</p>}
        <button onClick={this.recuperarProductos}>Volver a consultar</button>
      </section>
      <footer>API: <a href={API} target="_blank" rel="noreferrer">{API}</a></footer>
    </main>;
  }
}
