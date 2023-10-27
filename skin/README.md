# JUMP<span style="color:red">2</span>DIGITAL: BACKEND SKINS

Este proyecto realiza un CRUD sobre una entidad llamada skin, se consume a traves de una API la cual tiene mecanismos de autenticación y autorización a recursos; está implementado sobre el framework express con una conexión a base de datos postgresql.

Dante Espinoza dent007@gmail.com

# Estructura de directorios:

- ![Descripción de la imagen](./screenUtils/implementacion/scaffolding_img1.jpg "scaffolding del proyecto")

- El proyecto de modularizó en sub-capas a fin de que en cada capa se resuelva una funcionalidad de todo el sistema y que las responsabilidades sean independientes pero puedan dar servicios a las otras sub-capas adyacentes:

- Modulo server.js: Incia el enrutamiento de las peticiones http entrantes que se atienden en el puerto 4000 según requieran o no autorización o autenticación, para ello ejecuta un middleware que resuelve una determinada funcionalidad antes de acceder y retornar el recurso, en este:

![Descripción de la imagen](./screenUtils/implementacion/server-file.png "Contenido de server.js")

- <u>La ruta "/auth"</u> Contiene una funcnalidad que resuelve las rutas públicas que inicilizan la autentivación y autorización.
- <u>La ruta "/skins"</u> Contiene una funcnalidad que resuelve las rutas privadas a travez de las cuales se consume la API de skins

- Modulo /routes: Ofrede servicios a la capa server validando la estructura de los campos del formulario incluidos como contenido en el cuerpo o body de request.

- <u>auth.routes</u> Contiene la funcionalidad que resuelve las rutas públicas que inicilizan la autentivación y autorización.

![Descripción de la imagen](./screenUtils/implementacion/auth_routes.png "Contenido de fichero auth.routes.js")

- <u>skin.routes</u> Contiene una funcnalidad que resuelve las rutas privadas a travez de las cuales se consume la API de skins

![Descripción de la imagen](./screenUtils/implementacion/skin.routes.png "Contenido de fichero auth.routes.js")

\*\* Funcion validateSchema(schema) recibe un esquema que establece restricciones que deben cumplir los campos en el formulario recibido como son el tipo de dato, cantidad de caracteres, formato de email. etc. Con este esquema recibido valida el contenido del formulario.

![Descripción de la imagen](./screenUtils/implementacion/auth_schema.png "Contenido de fichero auth.routes.js")

\*\* Funcion authentication usada en los endpoints que necesitan autenticación, verifica las firmas al comparar la firma dentro del token recibido con la firma que se persiste en el servidor dentro de una variable de entorno TOKEN_SECRET. Si coinciden se ejecuta la funcion next() la cual sigue el flujo de ejecucuón del endpoit de la API.

![Descripción de la imagen](./screenUtils/implementacion/validateTOken.png "Contenido de fichero auth.routes.js")

- Modulo /controllers: Este modulo contiene las funcionalidades para acceder a la base de datos y obtener el recurso solicitado desde el servidor haciendo uso de consultas SQL que se serán envevidas en las funcionalidades del controlador pg

endpoin /register ,registro de usuario

![Descripción de la imagen](./screenUtils/implementacion/registro.png "Contenido de fichero auth.routes.js")

endpoin /login ,inicio de sesión de usuario

![Descripción de la imagen](./screenUtils/implementacion/login.png "Contenido de fichero auth.routes.js")

endpoin /logout ,cerrar sesion de usuario

![Descripción de la imagen](./screenUtils/implementacion/logout.png "Contenido de fichero auth.routes.js")

endpoin /createSkins , permite adquirir un skin, (Losiento por el nombre que no corresponde, tendría que haberse llamado adquirirSquin)

![Descripción de la imagen](./screenUtils/implementacion/adquirirSquin.png "Contenido de fichero auth.routes.js")

endpoin /getskins , permite listar todas las skins

![Descripción de la imagen](./screenUtils/implementacion/getSkins.png "Contenido de fichero auth.routes.js")

endpoin /getMyskins , permite listar solo las skins del usuario que está autenticado actualmente en el sistema

![Descripción de la imagen](./screenUtils/implementacion/getSkins.png "Contenido de fichero auth.routes.js")

endpoin /updateMySkins , permite actualizar solo las skins del usuario que está autenticado actualmente en el sistema

![Descripción de la imagen](./screenUtils/implementacion/updateMySkins.png "Contenido de fichero auth.routes.js")

endpoin /deleteMySkins , permite eliminar solo las skins del usuario que está autenticado actualmente en el sistema

![Descripción de la imagen](./screenUtils/implementacion/deleteMySkins.png "Contenido de fichero auth.routes.js")

endpoin /getSkinById , permite buscar y listar contenido de una skin según el id que le pasemos como parámetro.

![Descripción de la imagen](./screenUtils/implementacion/getSkinById.png "Contenido de fichero auth.routes.js")

endpoin /readJson , permite leer un fichero json el cual contiene un arreglo de objetos tipo skin, de este, el usuario podrá adquirir una skin

![Descripción de la imagen](./screenUtils/implementacion/readJson.png "Contenido de fichero auth.routes.js")

# Consumiendo el servicio:

- Para consumir los end point de la API, usamos cliente Thunder que mediante el protocolo http y tcp/ip resuelve la comuicación cliente servidor

- Levantar el servidor para que resuelva las peticiones del cliente, para lo cual se necesita abrir una instancia de terminal en el ide, para ese ejemplo uso visual studio code.

  ```js
  npm run dev
  ```

![Descripción de la imagen](./screenUtils/funcionalidad/applevantada-img4.jpg)

- Creación de nuevo usuario. Para que un usuario pueda usar el sistema, primero debe registrarse usando credeciales como son email y password. Por simplicidad se usó solo estos dos campos, pero deberían ser los necesarios según el requerimiento o caso se uso. Este proceso va acompañado de un hasheo de password

![Descripción de la imagen](./screenUtils/funcionalidad/creacionUser_img8.jpg)

\*\* El sistema permite validar los emails repetidos, cuando se pretende reusar un email ya existente para crear nueva cuenta, retorna un mensaje de error.

![Descripción de la imagen](./screenUtils/funcionalidad/email_repetido_img7.jpg)

- Login o Acceso al sistema. El usuario tendrá que hacer uso de sus credenciales para acceder al sistem y usar su funcionalidade. Luego que el sistema vertifica sus credenciales, este le retorna un token jwt el cual contiene información para autorizarle el uso de recursos como hacer uso de los endpoints del skiin

![Descripción de la imagen](./screenUtils/funcionalidad/login_img9.jpg)

- Listar un fichero JSON con la lista de los skins disponibles para que el usuario pueda elejir un skin

![Descripción de la imagen](./screenUtils/funcionalidad/leerjson.png)

- Seleccionar un skin para agregar a lista personal de usuario autenticado y autorizado actualmente en el sistema.

![Descripción de la imagen](./screenUtils/funcionalidad/miskin.png)

- listar todos los skins.

![Descripción de la imagen](./screenUtils/funcionalidad/listarSkins.png)

- listar solo los skins del usuario logeado .

![Descripción de la imagen](./screenUtils/funcionalidad/misSkins.png)

- Cambiar el contenido del atributo color a verde. El id sel skin se pasa como parámetro en la url

![Descripción de la imagen](./screenUtils/funcionalidad/update.png)

- Buscar y listar un skin según un id pasado como parámetro en la url.

![Descripción de la imagen](./screenUtils/funcionalidad/elskin.png)
