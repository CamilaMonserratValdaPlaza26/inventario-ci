// Importa Express y el almacen de productos
const express = require('express');
const store = require('./store');

// Crea la aplicacion
const app = express();
app.use(express.json());

// Ruta de estado del servicio
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Lista todos los productos
app.get('/productos', (req, res) => {
  res.status(200).json(store.listar());
});

// Obtiene un producto por id
app.get('/productos/:id', (req, res) => {
  const producto = store.obtener(Number(req.params.id));
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.status(200).json(producto);
});

// Crea un producto
app.post('/productos', (req, res) => {
  const { nombre, precio, stock } = req.body;

  // Valida los campos obligatorios
  if (!nombre || typeof precio !== 'number' || typeof stock !== 'number') {
    return res.status(400).json({ error: 'nombre, precio y stock son obligatorios' });
  }

  const producto = store.crear({ nombre, precio, stock });
  res.status(201).json(producto);
});

// Actualiza un producto
app.put('/productos/:id', (req, res) => {
  const producto = store.actualizar(Number(req.params.id), req.body);
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.status(200).json(producto);
});

// Elimina un producto
app.delete('/productos/:id', (req, res) => {
  const eliminado = store.eliminar(Number(req.params.id));
  if (!eliminado) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.status(204).send();
});

// Exporta la app para las pruebas
module.exports = app;
