# Informe de Laboratorio 5.1 - Practica Individual

# Informe Técnico: Laboratorio 5.1

## Práctica Individual: Pipeline de CI para una API CRUD de inventario

---

# Portada

UNIVERSIDAD MAYOR, REAL Y PONTIFICIA DE SAN FRANCISCO XAVIER DE CHUQUISACA

FACULTAD DE CIENCIAS Y TECNOLOGÍA

![LOGO DE LA CARÁTULA](LOGO%20USFX/ESCUDO.png)

**Nombre:** VALDA PLAZA CAMILA MONSERRAT

**Carrera:** INGENIERÍA DE SISTEMAS

**Asignatura:** Trabajando en la Nube (COM610)

**Docente:** Ing. Marcelo Quispe Ortega

**Semestre:** 2/2026

SUCRE – BOLIVIA

---

## 1. Descripcion del proyecto

API CRUD de inventario desarrollada con **Node.js** y **Express**. La entidad de dominio es **Producto**, con los campos `id`, `nombre`, `precio` y `stock`.

Endpoints disponibles:

- `GET /health`: devuelve el estado del servicio.
- `GET /productos`: lista todos los productos.
- `GET /productos/:id`: obtiene un producto por su identificador.
- `POST /productos`: crea un producto nuevo.
- `PUT /productos/:id`: actualiza un producto existente.
- `DELETE /productos/:id`: elimina un producto.

Las pruebas de integracion estan hechas con **Jest** y **Supertest**. La suite contiene 10 pruebas y alcanza un 98.27 % de cobertura de sentencias.

## 2. Pipeline de integracion continua

El workflow `CI Inventario` se ejecuta en cada `push` a `main` y en cada `pull_request` dirigido a `main`. Tiene un unico job llamado `build-and-test` sobre `ubuntu-latest` con los siguientes pasos:

- **Checkout** del codigo con `actions/checkout@v6`.
- **Setup** de Node.js 20 con cache de npm usando `actions/setup-node@v6`.
- **Instalacion** de dependencias con `npm ci`.
- **Linting** con ESLint (`npm run lint`).
- **Pruebas** con cobertura usando `npm run test:coverage`.
- **Publicacion** del reporte de cobertura como artefacto (`coverage-report`).

**Nota:** el proyecto no requiere un paso de compilacion porque es JavaScript puro ejecutado con Node.js.

## 3. Proteccion de la rama `main`

Sobre la rama `main` se configuro una regla de proteccion con las siguientes opciones:

- **Se requiere una solicitud de extraccion (pull request) antes de la fusion**, por lo que no se permiten pushes directos a `main`.
- **Se exige que las comprobaciones de estado se superen antes de la fusion**, siendo la comprobacion obligatoria `CI Inventario / build-and-test`.
- Inicialmente se exigio 1 aprobacion. Como el repositorio tiene un solo colaborador, ese requisito se desactivo para poder fusionar, manteniendo la PR obligatoria y el check de CI.

Gracias a esta configuracion, cualquier cambio debe pasar por una rama, abrir una pull request y superar el workflow antes de integrarse.

## 4. Evidencias principales

### 4.1 Historial de ejecuciones en la pestana Actions

Se observan las cuatro ejecuciones del workflow: la ejecucion inicial exitosa, la ejecucion fallida de la pull request, la re-ejecucion corregida y la ejecucion del merge a `main`.

![Historial de ejecuciones](./img/acciones_historial.png)

### 4.2 Workflow exitoso

Ejecucion completa del job `build-and-test` con todos sus pasos en verde: checkout, configuracion de Node.js, instalacion de dependencias, linting, pruebas con cobertura y publicacion del artefacto.

![Workflow exitoso](./img/workflow_exitoso.png)

### 4.3 Reporte de cobertura

Resultado de `jest --coverage`, con 10 pruebas aprobadas y 98.27 % de cobertura de sentencias.

![Reporte de cobertura](./img/cobertura.png)

### 4.4 Workflow fallido

Fallo intencional de linting en la rama `feature/prueba-ci`: ESLint detecta una variable asignada pero no utilizada (`no-unused-vars`), por lo que el workflow se detiene y la pull request queda bloqueada.

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

## 5. Objetivos y aprendizajes del Laboratorio 5.1

El objetivo del Laboratorio 5.1 fue comprender y aplicar integracion continua (CI) con GitHub Actions sobre una API CRUD de inventario. Los aprendizajes esperados fueron:

- Comprender la estructura de un workflow de GitHub Actions: eventos, jobs, pasos y runners.
- Crear y configurar un archivo `.github/workflows/ci.yml` desde cero.
- Automatizar la instalacion de dependencias, el linting y las pruebas ante eventos de `push` y `pull_request`.
- Interpretar los resultados de ejecucion en la pestana Actions de GitHub.
- Aplicar buenas practicas de CI, como el linting, las pruebas con cobertura y las matrices de versiones.
- Configurar la proteccion de la rama `main` para exigir pull request y comprobaciones obligatorias.

Respecto al costo, GitHub Actions no consume minutos de ejecucion en repositorios publicos cuando se usan los runners estandar, por lo que este laboratorio se pudo ejecutar sin costo. GitLab CI tambien ofrece una capa gratuita, pero con una cantidad limitada de minutos de computo al mes. Por esa razon, GitHub resulta una opcion practica para un repositorio publico de practica.

## 6. Interfaz de visualizacion agregada al finalizar el laboratorio

Al finalizar el laboratorio se agrego una pagina informativa sencilla en la ruta raiz `/` de la API para tener una visualizacion del servicio en el navegador. La pagina no modifica la logica del CRUD: solo presenta una descripcion breve, enlaces a `/health` y `/productos`, y la tabla de endpoints.

Archivos modificados:

- `src/app.js`: se agrego la ruta `GET /`, que responde con una pagina HTML de estilos neutros.
- `tests/productos.test.js`: se agrego una prueba para la ruta `/`; la suite quedo con 11 pruebas.
- `README.md`: se documento la ruta `/` y la ejecucion local.
- `INFORME-LAB-5.1.md`: se agrego esta seccion y las capturas de evidencia.

Para ejecutarlo y verlo en el navegador:

```bash
npm install
npm start
```

Se abre `http://localhost:3000/` y se observa la pagina informativa de la API.

![Figura 6.1. Pagina informativa de la API](./img/anexo/46.png)

**Figura 6.1.** Pagina informativa agregada en `http://localhost:3000/`.

Tambien se verifica el estado del servicio en `http://localhost:3000/health`.

![Figura 6.2. Respuesta de /health](./img/anexo/47.png)

**Figura 6.2.** Endpoint `/health` respondiendo `{"status":"ok"}` en el navegador.

Para cargar dos productos de ejemplo se ejecutan las siguientes peticiones:

```bash
curl -X POST http://localhost:3000/productos -H "Content-Type: application/json" -d '{"nombre":"Laptop","precio":1200,"stock":5}'
curl -X POST http://localhost:3000/productos -H "Content-Type: application/json" -d '{"nombre":"Mouse","precio":20,"stock":10}'
```

![Figura 6.3. Creacion de dos productos](./img/anexo/48.png)

**Figura 6.3.** Terminal con las dos peticiones `POST /productos` que crean los productos Laptop y Mouse.

Despues se abre `http://localhost:3000/productos` y se observan los dos productos creados.

![Figura 6.4. Lista con dos productos](./img/anexo/49.png)

**Figura 6.4.** Endpoint `/productos` con los dos productos creados.

## 7. Conclusiones

La integracion continua permite detectar errores de linting y de pruebas antes de integrar cambios a `main`. La proteccion de rama obliga a que todo cambio pase por una pull request y que el workflow `CI Inventario` se ejecute correctamente antes de fusionar, lo que mejora la calidad del codigo y evita subir cambios incompletos o defectuosos.

El ejercicio tambien demuestra el flujo completo: se creo una rama, se provoco un fallo intencional, se verifico el bloqueo de la pull request, se corrigio el error y finalmente se fusiono el cambio solo cuando las comprobaciones estuvieron en verde.

## 8. Anexo: capturas completas del proceso

En esta seccion se incluyen las 49 capturas del proceso completo, en orden cronologico. Las evidencias principales estan resumidas en la seccion 4.

**Nota:** algunas capturas muestran la interfaz traducida automaticamente al espanol. El nombre real del check obligatorio es `build-and-test`.

### 8.1 Creacion y configuracion inicial (01-06)

- **01. Creacion del repositorio en GitHub.** Se observa el formulario de creacion con el nombre `inventario-ci` y la visibilidad publica del repositorio.

  ![01](./img/anexo/01.png)

- **02. Repositorio publico creado.** Se muestra la pagina principal del repositorio ya creado, con el boton para copiar la URL de clonacion.

  ![02](./img/anexo/02.png)

- **03. Clonacion del repositorio.** La terminal ejecuta `git clone` y descarga el repositorio en el equipo local.

  ![03](./img/anexo/03.png)

- **04. Instalacion de dependencias con npm.** La terminal ejecuta `npm install` e instala Express, Jest, Supertest y ESLint.

  ![04](./img/anexo/04.png)

- **05. Scripts de package.json.** Se muestran los scripts `start`, `test`, `test:coverage` y `lint`, ademas de la configuracion de Jest para la cobertura.

  ![05](./img/anexo/05.png)

- **06. Inicializacion de ESLint.** La terminal ejecuta la configuracion inicial de ESLint y genera el archivo `eslint.config.mjs`.

  ![06](./img/anexo/06.png)

### 8.2 Workflow y verificacion local (07-12)

- **07. Workflow ci.yml (parte 1).** Se muestra el nombre del workflow y los eventos que lo disparan: `push` y `pull_request` sobre la rama `main`.

  ![07](./img/anexo/07.png)

- **08. Workflow ci.yml (parte 2).** Se muestran los pasos del job: checkout, configuracion de Node.js, instalacion, linting, pruebas con cobertura y publicacion del artefacto.

  ![08](./img/anexo/08.png)

- **09. Ejecucion de pruebas.** La terminal ejecuta `npm test` y muestra las 10 pruebas aprobadas de la suite.

  ![09](./img/anexo/09.png)

- **10. Ejecucion de linting.** La terminal ejecuta `npm run lint` y finaliza sin errores.

  ![10](./img/anexo/10.png)

- **11. Pruebas con cobertura.** La terminal ejecuta `npm run test:coverage` y muestra las pruebas aprobadas junto con la tabla de cobertura.

  ![11](./img/anexo/11.png)

- **12. Reporte de cobertura (98.27 %).** Se observa el resumen de cobertura: 98.27 % de sentencias, 85.71 % de ramas y 100 % de funciones y lineas.

  ![12](./img/anexo/12.png)

### 8.3 Ejecuciones en Actions (13-16)

- **13. Historial de ejecuciones.** Se muestra la pestana Actions con el historial inicial de ejecuciones del workflow `CI Inventario`.

  ![13](./img/anexo/13.png)

- **14. Historial de ejecuciones (detalle).** Se observa la ejecucion inicial en verde, con su duracion y el commit que la origino.

  ![14](./img/anexo/14.png)

- **15. Resumen de la ejecucion exitosa.** Se muestra el commit `7cb6c27`, el estado «Exito», una duracion de 21 segundos y un artefacto generado.

  ![15](./img/anexo/15.png)

- **16. Pasos del job exitoso.** Se detalla el job `build-and-test` con todos sus pasos en verde, incluidos el linting y las pruebas con cobertura.

  ![16](./img/anexo/16.png)

### 8.4 Codigo de la aplicacion (17-22)

- **17. app.js - configuracion inicial.** Se muestra la creacion de la aplicacion Express y la ruta `/health` para verificar el estado del servicio.

  ![17](./img/anexo/17.png)

- **18. app.js - consultas.** Se muestran las rutas `GET /productos` y `GET /productos/:id` para listar y obtener productos.

  ![18](./img/anexo/18.png)

- **19. app.js - creacion.** Se muestra la ruta `POST /productos` con la validacion de los datos recibidos.

  ![19](./img/anexo/19.png)

- **20. app.js - actualizacion y borrado.** Se muestran las rutas `PUT /productos/:id` y `DELETE /productos/:id`.

  ![20](./img/anexo/20.png)

- **21. store.js - almacen en memoria.** Se muestra la estructura del almacen de productos y la funcion que lo reinicia.

  ![21](./img/anexo/21.png)

- **22. store.js - operaciones CRUD.** Se muestran las funciones `listar`, `obtener`, `crear`, `actualizar` y `eliminar`.

  ![22](./img/anexo/22.png)

### 8.5 Proteccion de rama (23-26)

- **23. Inicio de la configuracion.** Se muestra la seccion «Ramas» de la configuracion del repositorio y la opcion para agregar una regla clasica de proteccion.

  ![23](./img/anexo/23.png)

- **24. Patron de rama main.** Se observa el formulario de la regla con el patron `main` y la exigencia de una pull request antes de fusionar.

  ![24](./img/anexo/24.png)

- **25. Seleccion del check obligatorio.** Se muestra la seleccion del check `build-and-test` como comprobacion de estado obligatoria en la regla de proteccion.

  ![25](./img/anexo/25.png)

- **26. Regla de proteccion creada.** Se confirma que la regla de proteccion fue creada y aplicada a la rama `main`.

  ![26](./img/anexo/26.png)

### 8.6 Pull request, fallo y correccion (27-38)

- **27. Fallo intencional de linting (codigo).** Se muestra la variable asignada y no utilizada que se agrego intencionalmente para forzar el fallo de ESLint.

  ![27](./img/anexo/27.png)

- **28. Fallo de linting en local.** La terminal muestra el error `no-unused-vars` reportado por ESLint antes de subir el cambio.

  ![28](./img/anexo/28.png)

- **29. Creacion de la rama de funcion.** La terminal muestra la creacion y el push de la rama `feature/prueba-ci`.

  ![29](./img/anexo/29.png)

- **30. Comparacion y creacion de la pull request.** GitHub muestra la comparacion entre `feature/prueba-ci` y `main` antes de crear la pull request.

  ![30](./img/anexo/30.png)

- **31. Pull request creada.** Se muestra la pull request #1 con el cambio intencional y la ejecucion del workflow en curso.

  ![31](./img/anexo/31.png)

- **32. PR con revision requerida y check en curso.** La pull request indica que se requiere una revision y que la comprobacion de CI esta en progreso.

  ![32](./img/anexo/32.png)

- **33. PR bloqueada por checks fallidos.** GitHub muestra «All checks have failed» y marca el check `CI Inventario / build-and-test` como obligatorio, por lo que la fusion queda bloqueada.

  ![33](./img/anexo/33.png)

- **34. Detalle del workflow fallido.** Se muestra el detalle de la ejecucion fallida con el error de linting que impide la fusion.

  ![34](./img/anexo/34.png)

- **35. Correccion y verificacion local.** Se muestra la correccion del codigo y la ejecucion local de linting y pruebas, ambas exitosas.

  ![35](./img/anexo/35.png)

- **36. PR aun abierta con revision requerida.** La pull request sigue abierta mientras se espera la revision.

  ![36](./img/anexo/36.png)

- **37. Push de la correccion.** La terminal muestra el push del commit de correccion a la rama de funcion.

  ![37](./img/anexo/37.png)

- **38. Historial de commits de la PR.** Se observa el commit con el fallo y, despues, el commit corregido marcado en verde.

  ![38](./img/anexo/38.png)

### 8.7 Cierre: checks, merge e historial (39-45)

- **39. Regla de proteccion final.** Se muestra la regla definitiva: pull request obligatoria y comprobaciones de estado obligatorias, sin aprobaciones por ser un unico colaborador.

  ![39](./img/anexo/39.png)

- **40. PR con todos los checks superados.** La pull request muestra todas las comprobaciones en verde y el boton de fusion habilitado.

  ![40](./img/anexo/40.png)

- **41. PR lista para fusionar.** Se muestra el estado de fusion indicando que todas las comprobaciones fueron superadas y que no hay conflictos.

  ![41](./img/anexo/41.png)

- **42. Estado de fusion.** Se observa el panel de estado de fusion antes de confirmar el merge.

  ![42](./img/anexo/42.png)

- **43. Confirmacion del merge.** Se muestra la confirmacion del merge con el mensaje de commit generado por GitHub.

  ![43](./img/anexo/43.png)

- **44. PR fusionada correctamente.** La pull request aparece como fusionada en `main` mediante el commit `cb041d2`.

  ![44](./img/anexo/44.png)

- **45. Historial final de ejecuciones en Actions.** Se observan las cuatro ejecuciones finales: la inicial, la de la PR fallida, la de la PR corregida y la del merge a `main`.

  ![45](./img/anexo/45.png)

### 8.8 Interfaz de visualizacion (46-49)

- **46. Pagina informativa de la API.** Se observa la pagina agregada en `http://localhost:3000/`, con la descripcion, los enlaces y la tabla de endpoints.

  ![46](./img/anexo/46.png)

- **47. Respuesta de /health.** Se observa la respuesta `{"status":"ok"}` del endpoint de estado en el navegador.

  ![47](./img/anexo/47.png)

- **48. Creacion de dos productos.** Se observan las dos peticiones `POST /productos` ejecutadas con `curl` para crear los productos Laptop y Mouse.

  ![48](./img/anexo/48.png)

- **49. Lista con dos productos.** Se observa la respuesta de `http://localhost:3000/productos` con los dos productos creados.

  ![49](./img/anexo/49.png)
