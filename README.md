# inventario-ci

API CRUD de inventario con integracion continua.

## Tecnologias

- Node.js y Express
- Jest y Supertest
- ESLint

## Endpoints

| Metodo | Ruta | Descripcion |
|---|---|---|
| GET | `/health` | Estado del servicio |
| GET | `/productos` | Lista todos los productos |
| GET | `/productos/:id` | Obtiene un producto por id |
| POST | `/productos` | Crea un producto |
| PUT | `/productos/:id` | Actualiza un producto |
| DELETE | `/productos/:id` | Elimina un producto |

## Ejecutar localmente

```bash
npm install
npm start
```

El servidor queda disponible en `http://localhost:3000`.

## Pruebas

```bash
npm test
npm run test:coverage
```

## Documentacion del Laboratorio

Puedes encontrar el informe completo con capturas de pantalla y evidencias en:

- [Ver informe del laboratorio](./INFORME.md)
