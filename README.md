# Online Store API
Una simple API REST de una tiendita online diseñada como resultado del "[Curso de Backend con Node.js: API REST con Express.js](https://platzi.com/cursos/backend-nodejs/)" de Platzi.

### 📝 Documentación 📝
La URL Base para consumir la API REST es la siguiente: https://online-store-api.up.railway.app/

Toda la documentación aquí descrita solo es válida para la **versión 1** de la API REST, por tanto, es necesario agregar un "/api/v1/" después de la url base anterior para poder hacer uso de los Endpoints.

- /users
  - GET: Se obtienen todos los usuarios.
  - POST: Se crea un nuevo usuario.

- /users/{userId}
  - GET: Se obtiene el usuario especificado en el userId.
  - DELETE: Se elimina el usuario especificado en el userId.
  - PATCH: Se actualiza parcialmente la información del usuario especificado en el userId.
  - PUT: Se actualiza al completo toda la información del usuario especificado en el userId.

---

- /products
  - GET: Se obtienen todos los productos.
  - POST: Se crea un nuevo producto.

- /products/{productId}
  - GET: Se obtiene el producto especificado en el productId.
  - DELETE: Se elimina el producto especificado en el productId.
  - PATCH: Se actualiza parcialmente la información del producto especificado en el productId.
  - PUT: Se actualiza al completo toda la información del producto especificado en el productId.

---

- /categories
  - GET: Se obtienen todas las categorías.
  - POST: Se crea una nueva categoría.

- /categories/{categoryId}
  - GET: Se obtiene la categoría especificada en el categoryId.
  - DELETE: Se elimina la categoría especificada en el categoryId.
  - PATCH: Se actualiza parcialmente la información de la categoría especificada en el categoryId.
  - PUT: Se actualiza al completo toda la información de la categoría especificada en el categoryId.

- /categories/{categoryId}/products
  - GET: Se obtienen todas los productos de la categoría especificada en el categoryId.

- /categories/{categoryId}/products/{productId}
  - GET: Se obtiene el productos especificado en el productId siempre y cuando éste pertenezca a la categoría especificada en el categoryId.
