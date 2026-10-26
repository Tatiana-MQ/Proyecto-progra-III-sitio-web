# Backend Artesanías Guapinol

Backend de nuestro proyecto de Programación III, hecho con NestJS y TypeScript. Le da los productos al sitio web y permite al administrador agregarlos, editarlos y eliminarlos.

## Cómo instalarlo y ejecutarlo

Se necesita tener Node.js instalado.

Dentro de la carpeta `backend`:

```
npm install
npm run start:dev
```

El servidor queda corriendo en http://localhost:3000

Si en Windows PowerShell no deja correr `npm`, se puede usar `npm.cmd run start:dev` o abrir la terminal CMD.

Después se abre el sitio (`Proyecto-progra-III-sitio-web-final/index.html`) con Live Server. El catálogo se carga desde este servidor, así que tiene que estar encendido.

## Recurso: productos

Son las pulseras, collares y llaveros que vende la tienda. Cada producto tiene:

- id
- nombre
- linea
- categoria (pulseras, collares o llaveros)
- material (Semillas, Madera, Macramé o Cuencas)
- precio
- foto
- disponible

Por ahora los productos se guardan en un arreglo en memoria, así que si se reinicia el servidor se vuelven a cargar los 16 productos iniciales.

## Administrador

El panel está en `admin.html` (enlace "Administración" al final del sitio).

- Usuario: `admin`
- Contraseña: `guapinol123`

Al iniciar sesión el servidor devuelve un token. Las peticiones que modifican datos tienen que enviarlo en el header:

```
Authorization: Bearer guapinol-admin-token
```

## Endpoints

- GET /productos --> muestra todos los productos
- GET /productos/:id --> muestra un producto
- POST /productos --> agrega un producto (necesita token)
- PATCH /productos/:id --> modifica un producto (necesita token)
- DELETE /productos/:id --> elimina un producto (necesita token)
- POST /auth/login --> inicia sesión y devuelve el token
- POST /upload --> sube la foto de un producto (necesita token)

Las fotos subidas se guardan en la carpeta `uploads` y se ven en http://localhost:3000/uploads/nombre-de-la-foto.jpg

Ejemplo para el POST:

```json
{
  "nombre": "Pulsera de guapinol natural",
  "linea": "Pulsera de semillas",
  "categoria": "pulseras",
  "material": "Semillas",
  "precio": 4500,
  "foto": "pulsera-semilla-guapinol.jpg"
}
```

Si se mandan datos incorrectos responde 400, si falta el token o la contraseña está mal responde 401, si el id no existe responde 404 y si la foto ya la tiene otro producto responde 409.

## Pruebas

Las pruebas están en el archivo Artesanias-Guapinol.postman_collection.json, que se puede importar en Postman. La primera petición inicia sesión y guarda el token para las demás. Las capturas están en la carpeta evidencias (la que está junto a backend).
