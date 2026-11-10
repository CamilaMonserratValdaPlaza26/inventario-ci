# Informe de Laboratorio 5.1 - Practica Individual

## 1. Descripcion del proyecto

API CRUD de inventario desarrollada con **Node.js** y **Express**. La entidad de dominio es **Producto**, con los campos `id`, `nombre`, `precio` y `stock`.

Endpoints disponibles:

| Metodo | Ruta | Descripcion |
|---|---|---|
| GET | `/health` | Estado del servicio |
| GET | `/productos` | Lista todos los productos |
| GET | `/productos/:id` | Obtiene un producto por id |
| POST | `/productos` | Crea un producto |
| PUT | `/productos/:id` | Actualiza un producto |
| DELETE | `/productos/:id` | Elimina un producto |

Las pruebas de integracion estan hechas con **Jest** y **Supertest**. La suite contiene 10 pruebas y alcanza un 98.27 % de cobertura de sentencias.

## 2. Pipeline de integracion continua

El workflow `CI Inventario` se ejecuta en cada `push` a `main` y en cada `pull_request` dirigido a `main`. Tiene un unico job llamado `build-and-test` sobre `ubuntu-latest` con los siguientes pasos:

- **Checkout** del codigo con `actions/checkout@v6`.
- **Setup** de Node.js 20 con cache de npm usando `actions/setup-node@v6`.
- **Instalacion** de dependencias con `npm ci`.
- **Linting** con ESLint (`npm run lint`).
- **Pruebas** con cobertura usando `npm run test:coverage`.
- **Publicacion** del reporte de cobertura como artefacto (`coverage-report`).

> El proyecto no requiere un paso de compilacion porque es JavaScript puro ejecutado con Node.js.

## 3. Proteccion de la rama `main`

Sobre la rama `main` se configuro una regla de proteccion con las siguientes opciones:

- **Se requiere una solicitud de extraccion (pull request) antes de la fusion**, por lo que no se permiten pushes directos a `main`.
- **Se exige que las comprobaciones de estado se superen antes de la fusion**, siendo la comprobacion obligatoria `CI Inventario / build-and-test`.
- Inicialmente se exigio 1 aprobacion. Como el repositorio tiene un solo colaborador, ese requisito se desactivo para poder fusionar, manteniendo la PR obligatoria y el check de CI.

Gracias a esta configuracion, cualquier cambio debe pasar por una rama, abrir una pull request y superar el workflow antes de integrarse.

## 4. Evidencias

### 4.1 Historial de ejecuciones en la pestana Actions

Se observan las cuatro ejecuciones: la inicial exitosa, la ejecucion fallida de la pull request, la re-ejecucion corregida y la ejecucion del merge a `main`.

![Historial de ejecuciones](./img/acciones_historial.png)

### 4.2 Workflow exitoso

Ejecucion completa del job `build-and-test` con todos sus pasos en verde.

![Workflow exitoso](./img/workflow_exitoso.png)

### 4.3 Reporte de cobertura

Resultado de `jest --coverage`, con 10 pruebas aprobadas y 98.27 % de cobertura de sentencias.

![Reporte de cobertura](./img/cobertura.png)

### 4.4 Workflow fallido

Fallo intencional de linting en la rama `feature/prueba-ci`: ESLint detecta una variable asignada pero no utilizada (`no-unused-vars`).

![Workflow fallido](./img/workflow_fallido.png)

### 4.5 Pull request bloqueada

La pull request no se puede fusionar porque las comprobaciones fallaron y, en ese momento, tambien se requeria una aprobacion.

![Pull request bloqueada](./img/pr_bloqueado.png)

### 4.6 Pull request con comprobaciones superadas

Tras corregir el error de linting, la comprobacion `build-and-test` pasa y GitHub habilita la fusion.

![Comprobaciones superadas](./img/pr_checks_ok.png)

### 4.7 Pull request fusionada

La pull request #1 se fusiono correctamente en `main` mediante el commit de merge `cb041d2`.

![Pull request fusionada](./img/pr_merge.png)

### 4.8 Configuracion de la proteccion de rama

Regla activa sobre `main`: solicitud de extraccion obligatoria y comprobaciones de estado obligatorias.

![Proteccion de rama](./img/proteccion_rama.png)

## 5. Conclusiones

La integracion continua permite detectar errores de linting y de pruebas antes de integrar cambios a `main`. La proteccion de rama obliga a que todo cambio pase por una pull request y que el workflow `CI Inventario` se ejecute correctamente antes de fusionar, lo que mejora la calidad del codigo y evita subir cambios incompletos o defectuosos.

El ejercicio tambien demuestra el flujo completo: se creo una rama, se provoco un fallo intencional, se verifico el bloqueo de la pull request, se corrigio el error y finalmente se fusiono el cambio solo cuando las comprobaciones estuvieron en verde.
