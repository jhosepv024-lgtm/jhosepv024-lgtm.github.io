# Portal principal de GitHub — JL Apps Studio

Web profesional preparada para funcionar como repositorio padre de la cuenta:

`jhosepv024-lgtm`

## Nombre recomendado del repositorio

Crea un repositorio público con este nombre exacto:

`jhosepv024-lgtm.github.io`

La dirección principal será:

`https://jhosepv024-lgtm.github.io/`

## Publicación en GitHub Pages

1. Crea el repositorio `jhosepv024-lgtm.github.io`.
2. Descomprime este ZIP.
3. Sube directamente `index.html`, `README.md` y la carpeta `assets` a la raíz del repositorio.
4. En GitHub abre `Settings` → `Pages`.
5. En `Build and deployment`, selecciona `Deploy from a branch`.
6. Selecciona la rama `main` y la carpeta `/root`.
7. Guarda los cambios.

## Cómo funciona

La web consulta automáticamente:

`https://api.github.com/users/jhosepv024-lgtm/repos`

Cada repositorio público nuevo aparecerá automáticamente. La web muestra:

- Nombre y descripción.
- Lenguaje principal.
- Última actualización.
- Estrellas y licencia, cuando existan.
- Estado archivado.
- Enlace al repositorio.
- Enlace a GitHub Pages, cuando esté activado.
- Buscador, filtros y ordenamiento.

## Archivo principal de configuración

Edita:

`assets/config.js`

Desde allí puedes cambiar:

- Nombre del portal.
- Nombre del desarrollador.
- Correo.
- Usuario de GitHub.
- Descripción profesional.
- Habilidades.
- Proyectos destacados.
- Categorías automáticas.
- Repositorios ocultos.

## Correo pendiente

Reemplaza en `assets/config.js`:

No publiques una dirección personal si no deseas recibir mensajes no solicitados. El botón de correo permanece oculto cuando no se configura una dirección pública válida.

## Agregar una aplicación destacada

Dentro de `featured`, agrega un objeto similar a este:

```javascript
{
  repo: "nombre-del-repositorio",
  title: "Nombre comercial",
  category: "Aplicaciones",
  icon: "📱",
  status: "Publicado",
  description: "Descripción profesional de la aplicación.",
  tags: ["Android", "Kotlin", "Firebase"],
  playStore: "https://play.google.com/store/apps/details?id=...",
  website: ""
}
```

## Seguridad y privacidad

- No agregues tokens, contraseñas, claves API privadas ni datos de cuentas en `app.js` o `config.js`.
- Todo archivo publicado en GitHub Pages es público y descargable.
- El portal muestra el nombre abreviado `Jose Valladolid`; evita publicar nombres legales completos, teléfonos, direcciones o correos personales si no son necesarios.
- La consulta de repositorios usa únicamente la API pública de GitHub y no necesita credenciales.
- Se añadió una política CSP mediante meta etiqueta, una política de referencia restrictiva y se eliminó la carga de Google Fonts para reducir solicitudes a terceros.
- GitHub Pages no permite configurar todos los encabezados HTTP desde archivos estáticos. Para controles como HSTS, `X-Content-Type-Options`, `Permissions-Policy` y protección anti-iframe por encabezado, se necesitaría un proxy/CDN o un hosting que permita definir encabezados.
- La CSP insertada como meta etiqueta es una defensa adicional del navegador; no sustituye los encabezados HTTP del servidor.
