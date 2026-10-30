# Artesanías Guapinol — Programación III

Proyecto académico con sitio web y API REST para administrar productos.

## Estructura

- `frontend/`: sitio web estático, catálogo y panel administrativo.
- `backend/`: API REST en NestJS + TypeScript.

## Ejecución local

1. Instalar Node.js.
2. En `backend/`, ejecutar `npm install` y `npm run start:dev`.
3. Abrir `frontend/index.html` con Live Server.

Consulta `backend/README.md` para detalles de los endpoints.

> Nota de seguridad: el proyecto recibido incluye credenciales de administrador y un token fijos en el código. Son adecuados únicamente como demostración local; no publicar la aplicación en producción sin sustituirlos por autenticación segura y secretos externos.
