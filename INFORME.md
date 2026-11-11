# Informe de Laboratorio 5.1 - Practica individual y ejercicios

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

## Repositorios del laboratorio

- Practica individual: <https://github.com/CamilaMonserratValdaPlaza26/inventario-ci>
- Ejercicios: <https://github.com/CamilaMonserratValdaPlaza26/github-actions-ci-demo>

La practica individual se desarrollo en el repositorio inventario-ci. Los ejercicios 3.1 a 3.4 se desarrollaron en el repositorio github-actions-ci-demo.

## Objetivo del laboratorio

El Laboratorio 5.1 busca comprender y aplicar integracion continua con GitHub Actions. Los objetivos son:

- Comprender la estructura de un workflow: eventos, jobs, pasos y runners.
- Crear y configurar un archivo de workflow desde cero.
- Automatizar la instalacion de dependencias, el linting y las pruebas ante push y pull request.
- Interpretar los resultados en la pestana Actions.
- Aplicar buenas practicas de CI, como linting, pruebas con cobertura y matrices de versiones.
- Configurar la proteccion de la rama main.

## Estructura del informe

El informe se divide en dos partes. Primero se presenta la practica individual y mas abajo, separados y numerados, los ejercicios 3.1 a 3.4, narrados como indica la guia. La Parte I reune las capturas de la practica individual y la Parte II las capturas de los ejercicios, sin omitir evidencias.

## Contenido

- Parte I: Practica individual
  - 1. Descripcion del proyecto
  - 2. Pipeline de integracion continua
  - 3. Proteccion de la rama main
  - 4. Evidencias principales
  - 5. Objetivos y aprendizajes del Laboratorio 5.1
  - 6. Interfaz de visualizacion
  - 7. Conclusiones y reflexion
  - 8. Anexo: capturas completas del proceso
- Parte II: Ejercicios del laboratorio
  - Introduccion
  - Ejercicio 3.1: Preparacion del repositorio y la aplicacion
  - Ejercicio 3.2: Creacion del workflow de CI
  - Ejercicio 3.3: Extension del pipeline con calidad de codigo
  - Ejercicio 3.4: Uso de matrices de ejecucion
  - Conclusiones de los ejercicios

# Parte I: Practica individual

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

El workflow CI Inventario se ejecuta en cada push a main y en cada pull request dirigido a main. Tiene un unico job llamado `build-and-test` sobre `ubuntu-latest` con los siguientes pasos:

- **Checkout** del codigo con `actions/checkout@v6`.
- **Setup** de Node.js 20 con cache de npm usando `actions/setup-node@v6`.
- **Instalacion** de dependencias con `npm ci`.
- **Linting** con ESLint (`npm run lint`).
- **Pruebas** con cobertura usando `npm run test:coverage`.
- **Publicacion** del reporte de cobertura como artefacto (`coverage-report`).

**Nota:** el proyecto no requiere un paso de compilacion porque es JavaScript puro ejecutado con Node.js.

## 3. Proteccion de la rama main

Sobre la rama main se configuro una regla de proteccion con las siguientes opciones:

- **Se requiere una solicitud de extraccion (pull request) antes de la fusion**, por lo que no se permiten pushes directos a main.
- **Se exige que las comprobaciones de estado se superen antes de la fusion**, siendo la comprobacion obligatoria `CI Inventario / build-and-test`.
- Inicialmente se exigio 1 aprobacion. Como el repositorio tiene un solo colaborador, ese requisito se desactivo para poder fusionar, manteniendo la PR obligatoria y el check de CI.

Gracias a esta configuracion, cualquier cambio debe pasar por una rama, abrir una pull request y superar el workflow antes de integrarse.

## 4. Evidencias principales

### 4.1 Historial de ejecuciones en la pestana Actions

Se observan las cuatro ejecuciones del workflow: la ejecucion inicial exitosa, la ejecucion fallida de la pull request, la re-ejecucion corregida y la ejecucion del merge a main.

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

La pull request #1 se fusiono correctamente en main mediante el commit de merge `cb041d2`.

![Pull request fusionada](./img/pr_merge.png)

### 4.8 Configuracion de la proteccion de rama

Regla activa sobre main: solicitud de extraccion obligatoria y comprobaciones de estado obligatorias.

![Proteccion de rama](./img/proteccion_rama.png)

## 5. Objetivos y aprendizajes del Laboratorio 5.1

El objetivo del Laboratorio 5.1 fue comprender y aplicar integracion continua (CI) con GitHub Actions sobre una API CRUD de inventario. Los aprendizajes esperados fueron:

- Comprender la estructura de un workflow de GitHub Actions: eventos, jobs, pasos y runners.
- Crear y configurar un archivo `.github/workflows/ci.yml` desde cero.
- Automatizar la instalacion de dependencias, el linting y las pruebas ante eventos de push y pull request.
- Interpretar los resultados de ejecucion en la pestana Actions de GitHub.
- Aplicar buenas practicas de CI, como el linting, las pruebas con cobertura y las matrices de versiones.
- Configurar la proteccion de la rama main para exigir pull request y comprobaciones obligatorias.

Respecto al costo, GitHub Actions no consume minutos de ejecucion en repositorios publicos cuando se usan los runners estandar, por lo que este laboratorio se pudo ejecutar sin costo. GitLab CI tambien ofrece una capa gratuita, pero con una cantidad limitada de minutos de computo al mes. Por esa razon, GitHub resulta una opcion practica para un repositorio publico de practica.

## 6. Interfaz de visualizacion agregada al finalizar el laboratorio

Al finalizar el laboratorio se agrego una pagina informativa sencilla en la ruta raiz `/` de la API para tener una visualizacion del servicio en el navegador. La pagina no modifica la logica del CRUD: solo presenta una descripcion breve, enlaces a `/health` y `/productos`, y la tabla de endpoints. La ruta se implemento en `src/app.js` con `res.type('html').send(...)`, por lo que el navegador recibe HTML en lugar de JSON.

Archivos modificados:

- `src/app.js`: se agrego la ruta `GET /`, que responde con una pagina HTML de estilos neutros.
- `tests/productos.test.js`: se agrego una prueba para la ruta `/`; la suite quedo con 11 pruebas.
- `README.md`: se documento la ruta `/` y la ejecucion local.
- `INFORME-LAB-5.1.md`: se agrego esta seccion y las capturas de evidencia.

### 6.1 Comandos de ejecucion

```bash
npm install
npm start
```

- `npm install` descarga e instala las dependencias declaradas en `package.json` (Express, Jest, Supertest y ESLint) dentro de `node_modules`. Se ejecuta una vez o cuando cambian las dependencias.
- `npm start` ejecuta el script `start` de `package.json`, que a su vez corre `node server.js`. El servidor queda escuchando en el puerto 3000 (o el que indique la variable `PORT`).

### 6.2 Pagina informativa

Se abre `http://localhost:3000/` y se observa la pagina informativa de la API.

![Figura 6.1. Pagina informativa de la API](./img/anexo/46.png)

**Figura 6.1.** Pagina informativa agregada en `http://localhost:3000/`. La ruta `GET /` devuelve una pagina HTML con el nombre de la API, una descripcion, dos botones de navegacion y la tabla de endpoints. No forma parte del CRUD; su unico objetivo es tener una visualizacion rapida del servicio.

### 6.3 Verificacion del estado del servicio

Se verifica el estado en `http://localhost:3000/health`.

![Figura 6.2. Respuesta de /health](./img/anexo/47.png)

**Figura 6.2.** Endpoint `/health` respondiendo `{"status":"ok"}` en el navegador. La ruta `GET /health` devuelve el codigo HTTP 200 y un JSON con el estado del servicio. Se usa para comprobar que el servidor esta vivo; en el Laboratorio 5.2 este mismo endpoint se usara como health check antes de desplegar un contenedor.

### 6.4 Creacion de productos con curl

Para cargar dos productos de ejemplo se ejecutan las siguientes peticiones:

```bash
curl -X POST http://localhost:3000/productos -H "Content-Type: application/json" -d '{"nombre":"Laptop","precio":1200,"stock":5}'
curl -X POST http://localhost:3000/productos -H "Content-Type: application/json" -d '{"nombre":"Mouse","precio":20,"stock":10}'
```

- `curl` es una herramienta de linea de comandos para hacer peticiones HTTP.
- `-X POST` indica el metodo HTTP POST, que en esta API se usa para crear un producto.
- `http://localhost:3000/productos` es la URL del endpoint de creacion.
- `-H "Content-Type: application/json"` indica que el cuerpo de la peticion esta en formato JSON; gracias a `express.json()` el servidor puede leerlo.
- `-d '{"nombre":"Laptop","precio":1200,"stock":5}'` envia los datos del producto: nombre, precio y stock.

La respuesta de cada peticion es el producto creado con su `id` asignado por el almacen en memoria (`{"id":1,...}` y `{"id":2,...}`).

![Figura 6.3. Creacion de dos productos](./img/anexo/48.png)

**Figura 6.3.** Terminal con las dos peticiones `POST /productos` y sus respuestas. Se observa que el primer producto (Laptop) recibe el `id` 1 y el segundo (Mouse) el `id` 2. Los productos se guardan en memoria, por lo que se pierden al reiniciar el servidor.

### 6.5 Lista de productos

Despues se abre `http://localhost:3000/productos` y se observan los dos productos creados.

![Figura 6.4. Lista con dos productos](./img/anexo/49.png)

**Figura 6.4.** Endpoint `/productos` con los dos productos creados. La ruta `GET /productos` devuelve un arreglo JSON con todos los productos del almacen en memoria. En este caso se ven Laptop y Mouse, creados con las peticiones anteriores.

### 6.6 Detalle adicional de las peticiones

![Figura 6.5. Detalle de las peticiones POST](./img/anexo/50.png)

**Figura 6.5.** Segunda captura de las peticiones `POST /productos`. Se incluye como evidencia adicional para mostrar con mas detalle los comandos ejecutados y las respuestas obtenidas al crear los dos productos.

## 7. Conclusiones y reflexion

La integracion continua aporta valor al proyecto porque automatiza verificaciones que antes se hacian manualmente. En cada push y en cada pull request, el workflow CI Inventario instala las dependencias, ejecuta ESLint y corre las pruebas con cobertura. Esto permite detectar errores de linting, fallos en los endpoints o cambios que rompen pruebas antes de que el codigo llegue a main.

La proteccion de rama complementa al workflow: obliga a pasar por una pull request y exige que la comprobacion `CI Inventario / build-and-test` termine en verde antes de fusionar. En el ejercicio se comprobo el flujo completo: se creo una rama, se provoco un fallo intencional de linting, GitHub bloqueo la pull request, se corrigio el error y la fusion se habilitó solo cuando las comprobaciones estuvieron correctas.

Desde la perspectiva del proyecto, CI reduce el riesgo de integrar codigo defectuoso y da confianza para refactorizar o agregar endpoints, porque la suite de pruebas y el linting actuan como una red de seguridad. Tambien deja un historial de ejecuciones que sirve como evidencia y facilita identificar en que commit se introdujo un problema.

Como reflexion, CI no reemplaza la revision de codigo ni las pruebas bien disenadas: el pipeline solo verifica lo que se le indica. Si una prueba no cubre un caso o el linting no detecta un problema logico, el workflow puede pasar en verde aunque exista un error. Por eso es importante mantener las pruebas actualizadas y complementar el pipeline con revisiones y, mas adelante, con analisis de seguridad.

Finalmente, GitHub Actions resulta una herramienta practica para este tipo de proyectos porque no consume minutos en repositorios publicos con runners estandar, a diferencia de otros servicios que limitan los minutos gratuitos. Esto permite practicar CI sin costo.

## 8. Anexo: capturas completas del proceso

En esta seccion se incluyen las 50 capturas del proceso completo, en orden cronologico. Las evidencias principales estan resumidas en la seccion 4.

**Nota:** algunas capturas muestran la interfaz traducida automaticamente al espanol. El nombre real del check obligatorio es `build-and-test`.

### 8.1 Creacion y configuracion inicial (01-06)

- **01. Creacion del repositorio en GitHub.** Se observa el formulario de creacion con el nombre inventario-ci y la visibilidad publica del repositorio.

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

- **07. Workflow ci.yml (parte 1).** Se muestra el nombre del workflow y los eventos que lo disparan: push y pull request sobre la rama main.

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

- **13. Historial de ejecuciones.** Se muestra la pestana Actions con el historial inicial de ejecuciones del workflow CI Inventario.

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

- **24. Patron de rama main.** Se observa el formulario de la regla con el patron main y la exigencia de una pull request antes de fusionar.

  ![24](./img/anexo/24.png)

- **25. Seleccion del check obligatorio.** Se muestra la seleccion del check `build-and-test` como comprobacion de estado obligatoria en la regla de proteccion.

  ![25](./img/anexo/25.png)

- **26. Regla de proteccion creada.** Se confirma que la regla de proteccion fue creada y aplicada a la rama main.

  ![26](./img/anexo/26.png)

### 8.6 Pull request, fallo y correccion (27-38)

- **27. Fallo intencional de linting (codigo).** Se muestra la variable asignada y no utilizada que se agrego intencionalmente para forzar el fallo de ESLint.

  ![27](./img/anexo/27.png)

- **28. Fallo de linting en local.** La terminal muestra el error `no-unused-vars` reportado por ESLint antes de subir el cambio.

  ![28](./img/anexo/28.png)

- **29. Creacion de la rama de funcion.** La terminal muestra la creacion y el push de la rama `feature/prueba-ci`.

  ![29](./img/anexo/29.png)

- **30. Comparacion y creacion de la pull request.** GitHub muestra la comparacion entre `feature/prueba-ci` y main antes de crear la pull request.

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

- **44. PR fusionada correctamente.** La pull request aparece como fusionada en main mediante el commit `cb041d2`.

  ![44](./img/anexo/44.png)

- **45. Historial final de ejecuciones en Actions.** Se observan las cuatro ejecuciones finales: la inicial, la de la PR fallida, la de la PR corregida y la del merge a main.

  ![45](./img/anexo/45.png)

### 8.8 Interfaz de visualizacion

- **46. Pagina informativa de la API.** Se observa la pagina agregada en `http://localhost:3000/`, con el nombre de la API, una descripcion breve, los botones hacia `/health` y `/productos`, y la tabla de endpoints. La ruta `GET /` devuelve HTML y no afecta la logica del CRUD.

  ![46](./img/anexo/46.png)

- **47. Respuesta de /health.** Se observa la respuesta `{"status":"ok"}` del endpoint de estado en el navegador. La ruta `GET /health` devuelve HTTP 200 y sirve para verificar que el servidor esta activo; en el Laboratorio 5.2 se usara como health check del contenedor.

  ![47](./img/anexo/47.png)

- **48. Creacion de dos productos.** Se observan las dos peticiones `POST /productos` ejecutadas con `curl`. El parametro `-X POST` define el metodo, `-H` indica que el cuerpo es JSON y `-d` envia los datos. Las respuestas muestran los productos creados con `id` 1 (Laptop) e `id` 2 (Mouse).

  ![48](./img/anexo/48.png)

- **49. Lista con dos productos.** Se observa la respuesta de `http://localhost:3000/productos` con los dos productos creados. La ruta `GET /productos` devuelve el arreglo JSON del almacen en memoria, por lo que la lista se reinicia al reiniciar el servidor.

  ![49](./img/anexo/49.png)

- **50. Detalle de las peticiones POST.** Se observa una segunda captura de los mismos comandos `curl` y de sus respuestas. Se incluye como evidencia adicional para mostrar con mas detalle el cuerpo JSON enviado y los identificadores asignados a cada producto.

  ![50](./img/anexo/50.png)


# Parte II: Ejercicios del laboratorio

Los ejercicios se desarrollaron en el repositorio <https://github.com/CamilaMonserratValdaPlaza26/github-actions-ci-demo>. Se presentan en orden y separados de la practica individual, con sus capturas como evidencia del proceso seguido.

## Introduccion

En este laboratorio se construyó, paso a paso, un flujo de integración continua (CI) con GitHub Actions sobre una aplicación sencilla de Node.js y Express. El objetivo fue entender cómo un **pipeline** automatiza una secuencia de tareas cada vez que se sube código al repositorio: descargar el código, preparar el entorno, instalar dependencias, revisar el estilo con ESLint y ejecutar las pruebas.

Un pipeline es, en términos simples, una cadena ordenada de pasos automáticos. Si un paso falla, la ejecución se detiene y el resultado queda marcado como fallido, lo que permite detectar errores antes de integrar cambios a la rama principal. En este laboratorio el pipeline se fue ampliando: primero solo ejecutaba pruebas, después incorporó el linting y finalmente se ejecutó en paralelo con una matriz de versiones de Node.js.

El repositorio utilizado fue `github-actions-ci-demo`. La aplicación expone dos rutas (`/health` y `/users`), las pruebas se escribieron con Jest y Supertest, y el análisis estático se realizó con ESLint.

**Nota sobre las capturas:** la numeración corresponde a los archivos originales del repositorio. La secuencia omite las imágenes 40 y 46, y algunas capturas se tomaron en momentos distintos, por lo que el orden de los archivos no siempre coincide exactamente con el orden cronológico de los hechos.

---

## Ejercicio 3.1: Preparación del repositorio y la aplicación

**Objetivo:** crear el repositorio `github-actions-ci-demo`, clonarlo, inicializar un proyecto Node.js con Express y agregar pruebas unitarias con Jest y Supertest.

## Desarrollo

**Figura 1. Creación del repositorio en GitHub.**
Qué se observa: el formulario de creación de un repositorio nuevo con el nombre `github-actions-ci-demo`, la visibilidad pública y la opción de agregar un archivo README.

![Figura 1](imgejercicios/1.png)

**Figura 2. Repositorio creado.**
Qué se observa: la página principal del repositorio ya creado, con la rama `main`, el archivo README y el botón para copiar la URL de clonación.

![Figura 2](imgejercicios/2.png)

**Figura 3. Clonación del repositorio.**
Qué se observa: una terminal de PowerShell ejecutando `git clone` sobre la URL del repositorio y mostrando el progreso de la descarga.

![Figura 3](imgejercicios/3.png)

**Figura 4. Configuración local de Git y estado del repositorio.**
Qué se observa: la terminal con la configuración de Git, la comprobación del estado del repositorio y la carpeta `img` todavía sin seguimiento.

![Figura 4](imgejercicios/4.png)

**Figura 5. Inicialización del proyecto Node.js.**
Qué se observa: la ejecución de `npm init -y` y el archivo `package.json` generado automáticamente, abierto en VS Code.

![Figura 5](imgejercicios/5.png)

**Figura 6. Instalación de Express, Jest y Supertest.**
Qué se observa: la instalación de las dependencias con `npm install express` y `npm install --save-dev jest supertest`, junto con el `package.json` actualizado.

![Figura 6](imgejercicios/6.png)

**Figura 7. Código de la aplicación Express.**
Qué se observa: el archivo `app.js` con la configuración de Express, la ruta `/health` y la ruta `/users`, además de la exportación de la aplicación.

![Figura 7](imgejercicios/7.png)

**Figura 8. Archivos `server.js` y `app.test.js`.**
Qué se observa: el archivo `server.js` que inicia el servidor y el archivo `app.test.js` con las dos pruebas de integración para `/health` y `/users`.

![Figura 8](imgejercicios/8.png)

**Figura 9. Ejecución local de las pruebas.**
Qué se observa: la terminal ejecutando `npm test` con las dos pruebas aprobadas y el mensaje de Jest indicando que la suite pasó correctamente.

![Figura 9](imgejercicios/9.png)

**Figura 10. Verificación de versiones instaladas.**
Qué se observa: la terminal con `npm list` mostrando las versiones de Express, Jest y Supertest instaladas en el proyecto.

![Figura 10](imgejercicios/10.png)

**Figura 11. Primer commit y push.**
Qué se observa: el archivo `.gitignore` y la terminal ejecutando `git add`, `git commit` y `git push` para subir la aplicación al repositorio.

![Figura 11](imgejercicios/11.png)

**Figura 12. Confirmación de los scripts y las pruebas.**
Qué se observa: el `package.json` con los scripts `start` y `test`, y una nueva ejecución de `npm test` confirmando que las pruebas siguen pasando.

![Figura 12](imgejercicios/12.png)

---

## Ejercicio 3.2: Creación del workflow de CI

**Objetivo:** crear el archivo `.github/workflows/ci.yml` y verificar que el workflow se ejecute automáticamente en la pestaña Actions.

## Desarrollo

**Figura 13. Estado del repositorio antes del workflow.**
Qué se observa: la terminal con `git status` y el proyecto abierto en VS Code, mostrando los archivos que forman parte de la aplicación.

![Figura 13](imgejercicios/13.png)

**Figura 14. Pruebas locales antes de crear el workflow.**
Qué se observa: el `package.json` con el script de pruebas y la terminal ejecutando `npm test` con las dos pruebas aprobadas.

![Figura 14](imgejercicios/14.png)

**Figura 15. Consulta de versiones disponibles.**
Qué se observa: la terminal consultando versiones de paquetes con `npm view` y el `package.json` con la configuración del proyecto.

![Figura 15](imgejercicios/15.png)

**Figura 16. Verificación final de las pruebas.**
Qué se observa: una nueva ejecución de `npm test` y el `package.json` con los scripts del proyecto, como comprobación previa al push.

![Figura 16](imgejercicios/16.png)

**Figura 17. Repositorio en GitHub con la aplicación subida.**
Qué se observa: la página del repositorio con los archivos `app.js`, `server.js`, `app.test.js`, `package.json` y el README, además de la lista de commits.

![Figura 17](imgejercicios/17.png)

**Figura 18. Historial de commits.**
Qué se observa: la página de commits del repositorio con el commit inicial de la aplicación Express y sus pruebas.

![Figura 18](imgejercicios/18.png)

**Figura 19. Creación y push del workflow.**
Qué se observa: la terminal ejecutando `git add`, `git commit` y `git push` del archivo `.github/workflows/ci.yml`.

![Figura 19](imgejercicios/19.png)

**Figura 20. Contenido inicial del workflow.**
Qué se observa: el archivo `ci.yml` con el nombre `CI Basico`, los eventos `push` y `pull_request` sobre `main` y los pasos de checkout, configuración de Node.js, instalación de dependencias y ejecución de pruebas.

![Figura 20](imgejercicios/20.png)

**Figura 21. Commit y push del workflow básico.**
Qué se observa: la terminal confirmando los cambios del workflow y subiéndolos a GitHub, junto con el archivo `ci.yml` en el editor.

![Figura 21](imgejercicios/21.png)

**Figura 22. Pestaña Actions con el workflow registrado.**
Qué se observa: la pestaña Actions mostrando el workflow `CI Basico` y su primera ejecución asociada al commit del workflow.

![Figura 22](imgejercicios/22.png)

**Figura 23. Vista inicial de ejecuciones.**
Qué se observa: la pestaña Actions con la lista de ejecuciones del repositorio, desde donde se puede abrir cada corrida del workflow.

![Figura 23](imgejercicios/23.png)

**Figura 24. Resumen de la ejecución del workflow.**
Qué se observa: el resumen de la ejecución con el commit que la originó, el estado, la duración total y el job `build-and-test`.

![Figura 24](imgejercicios/24.png)

**Figura 25. Detalle del job `build-and-test`.**
Qué se observa: la lista de pasos del job, desde la preparación del entorno hasta el checkout, la configuración de Node.js, la instalación de dependencias y la ejecución de pruebas.

![Figura 25](imgejercicios/25.png)

**Figura 26. Paso de checkout en detalle.**
Qué se observa: el log del paso `Checkout del codigo`, donde GitHub descarga el contenido del repositorio en el runner.

![Figura 26](imgejercicios/26.png)

**Figura 27. Paso de instalación de dependencias en detalle.**
Qué se observa: el log del paso `Instalar dependencias`, con la ejecución de `npm ci` y la instalación de los paquetes del proyecto.

![Figura 27](imgejercicios/27.png)

**Figura 28. Paso de pruebas en detalle.**
Qué se observa: el log del paso `Ejecutar pruebas`, con la salida de `npm test` y las dos pruebas aprobadas.

![Figura 28](imgejercicios/28.png)

**Figura 29. Resumen de todos los jobs.**
Qué se observa: la vista de todos los jobs de la ejecución, con el job `build-and-test` marcado en verde.

![Figura 29](imgejercicios/29.png)

**Figura 30. Ejecución exitosa del workflow básico.**
Qué se observa: el resumen final de la ejecución exitosa, con el job completado y la duración total del workflow.

![Figura 30](imgejercicios/30.png)

---

## Ejercicio 3.3: Extensión del pipeline con calidad de código

**Objetivo:** instalar ESLint, agregar el paso de linting al workflow y comprobar que el pipeline falla cuando se introduce un error intencional, para luego corregirlo.

## Desarrollo

**Figura 31. Instalación de ESLint.**
Qué se observa: la terminal ejecutando `npm install --save-dev eslint` y la instalación de ESLint junto con sus dependencias.

![Figura 31](imgejercicios/31.png)

**Figura 32. Configuración interactiva de ESLint.**
Qué se observa: la ejecución de `npx eslint --init` con las preguntas sobre el tipo de proyecto, el sistema de módulos, el framework y el estilo de configuración.

![Figura 32](imgejercicios/32.png)

**Figura 33. Archivo `eslint.config.mjs` generado.**
Qué se observa: el archivo de configuración de ESLint creado por el asistente y el `package.json` del proyecto en VS Code.

![Figura 33](imgejercicios/33.png)

**Figura 34. Script de linting en `package.json`.**
Qué se observa: el `package.json` con el script `lint` agregado, el archivo `eslint.config.mjs` y la terminal con el commit de los cambios.

![Figura 34](imgejercicios/34.png)

**Figura 35. Workflow actualizado con el paso de linting.**
Qué se observa: el archivo `ci.yml` con el nombre `CI con Linting` y el paso `Ejecutar linting` agregado antes de las pruebas.

![Figura 35](imgejercicios/35.png)

**Figura 36. Ejecución del workflow con linting.**
Qué se observa: la pestaña Actions con la ejecución del workflow `CI con Linting` correspondiente al commit que agregó el paso de linting.

![Figura 36](imgejercicios/36.png)

**Figura 37. Commit y push del paso de linting.**
Qué se observa: la terminal ejecutando el commit y el push de los cambios que incorporan ESLint y el paso de linting al pipeline.

![Figura 37](imgejercicios/37.png)

**Figura 38. Historial de ejecuciones con linting.**
Qué se observa: la lista de ejecuciones del workflow con la corrida correspondiente al paso de linting y su resultado.

![Figura 38](imgejercicios/38.png)

**Figura 39. Error de sintaxis intencional en `app.js`.**
Qué se observa: el archivo `app.js` con una llave de cierre adicional en la línea 25, introducida a propósito para que ESLint detecte un error de sintaxis.

![Figura 39](imgejercicios/39.png)

**Figura 41. Commit y push del error intencional.**
Qué se observa: la terminal ejecutando `git add`, `git commit` con el mensaje `test: fuerza un error de linting para probar el pipeline` y `git push`.

![Figura 41](imgejercicios/41.png)

**Figura 42. Ejecución fallida y corrección en curso.**
Qué se observa: la pestaña Actions con la ejecución del error intencional marcada en rojo y, encima, la ejecución de la corrección en progreso.

![Figura 42](imgejercicios/42.png)

**Figura 43. Detalle del job fallido.**
Qué se observa: el log del paso `Ejecutar linting` con el mensaje `Parsing error: Unexpected token }` y el proceso terminando con código de salida 1.

![Figura 43](imgejercicios/43.png)

**Figura 49. Verificación local de la corrección.**
Qué se observa: el archivo `app.js` sin la llave adicional y la terminal ejecutando las comprobaciones locales antes de subir la corrección.

![Figura 49](imgejercicios/49.png)

**Figura 50. Commit y push de la corrección.**
Qué se observa: la terminal ejecutando `git add app.js`, el commit `fix: corrige error de sintaxis intencional` y el push a `main`.

![Figura 50](imgejercicios/50.png)

---

## Ejercicio 3.4: Uso de matrices de ejecución

**Objetivo:** modificar el workflow para ejecutar el mismo job en paralelo con dos versiones de Node.js y verificar los dos jobs en la pestaña Actions.

## Desarrollo

**Figura 44. Workflow con matriz de versiones.**
Qué se observa: el archivo `ci.yml` con `strategy.matrix.node-version: [20, 22]` y el uso de `${{ matrix.node-version }}` en la configuración de Node.js.

![Figura 44](imgejercicios/44.png)

**Figura 45. Ejecución de la matriz en cola.**
Qué se observa: la pestaña Actions con la ejecución del commit `ci: agrega matriz de versiones de node.js` en estado de cola.

![Figura 45](imgejercicios/45.png)

**Figura 47. Historial con la ejecución de la matriz.**
Qué se observa: la lista de ejecuciones del workflow donde aparece la corrida de la matriz y las ejecuciones anteriores del pipeline.

![Figura 47](imgejercicios/47.png)

**Figura 48. Detalle de las ejecuciones.**
Qué se observa: la lista de ejecuciones con el commit de la matriz, el commit de corrección, el error intencional y las ejecuciones exitosas previas.

![Figura 48](imgejercicios/48.png)

**Figura 51. Seguimiento de la matriz.**
Qué se observa: la pestaña Actions con la ejecución de la matriz registrada y su estado dentro del historial de workflows.

![Figura 51](imgejercicios/51.png)

**Figura 52. Resumen de la matriz con dos jobs.**
Qué se observa: el resumen de la ejecución con los dos jobs de la matriz, `build-and-test (20)` y `build-and-test (22)`, ambos completados correctamente.

![Figura 52](imgejercicios/52.png)

**Figura 53. Historial final de ejecuciones.**
Qué se observa: la lista final de ejecuciones del workflow con la matriz, la corrección del error y las ejecuciones anteriores.

![Figura 53](imgejercicios/53.png)

**Figura 54. Resultado final de la matriz.**
Qué se observa: el resumen de la ejecución exitosa de la matriz con los dos trabajos completados y la duración total del workflow.

![Figura 54](imgejercicios/54.png)

---

## Conclusiones de los ejercicios

La integración continua permitió comprobar, de forma automática, que la aplicación se instala, se analiza y se prueba correctamente cada vez que se sube un cambio. El pipeline comenzó con un único paso de pruebas y fue creciendo hasta incluir el linting y una matriz de versiones de Node.js, lo que demuestra que un workflow puede adaptarse a medida que el proyecto lo necesita.

El fallo intencional fue especialmente útil: al introducir una llave adicional en `app.js`, ESLint detuvo el pipeline y GitHub mostró el error exacto con el archivo y la línea. Después de corregir el código, el workflow volvió a pasar, lo que confirma que el pipeline no solo informa el error, sino que también verifica la corrección.

La matriz de ejecución mostró otra ventaja de CI: el mismo conjunto de pruebas se ejecutó en paralelo con Node.js 20 y Node.js 22, sin duplicar trabajo manual. Esto ayuda a detectar incompatibilidades entre versiones antes de que el código llegue a producción.

En conjunto, el laboratorio demuestra que GitHub Actions permite automatizar la calidad del código con poco esfuerzo de configuración y que las capturas de cada etapa sirven como evidencia de que el pipeline funcionó de principio a fin.
