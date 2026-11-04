# JL Apps Studio — Portal del desarrollador

Sitio público: https://jhosepv024-lgtm.github.io/

Este repositorio contiene el portal público de proyectos de JL Apps Studio, publicado con GitHub Pages desde la rama `main` y la carpeta raíz.

## Estructura

- `index.html`: contenido y estructura del sitio.
- `assets/styles.css`: diseño adaptable.
- `assets/app.js`: interacción, filtros y consulta de repositorios públicos.
- `assets/config.js`: información pública del estudio y proyectos destacados.
- `google8808e4948b4b6a9f.html`: archivo de verificación de Google Search Console. No eliminar mientras se utilice este método de verificación.

## Publicación

En GitHub, abre **Settings → Pages** y comprueba que la fuente de publicación sea la rama `main` y la carpeta `/(root)`.

Los cambios confirmados en esa rama se publican mediante GitHub Pages. La publicación puede tardar unos minutos.

## Actualizar los proyectos destacados

Edita `assets/config.js`. Antes de añadir una dirección, comprueba que la página exista y utilice HTTPS. Mantén las descripciones y los estados actualizados. No anuncies una aplicación como publicada si todavía no está disponible para el público.

## Funcionamiento

El sitio consulta la API pública de GitHub para mostrar repositorios públicos. No utiliza tokens ni necesita que el visitante inicie sesión. Si la API no responde, el portal muestra un aviso y permite abrir el perfil público.

## Seguridad y privacidad

- Todo archivo de este repositorio que se publique mediante GitHub Pages puede ser leído y descargado por cualquier visitante.
- No guardes aquí contraseñas, tokens de acceso, claves privadas, archivos de firma, keystores, credenciales de Firebase ni datos personales de terceros.
- Los valores de `assets/config.js` y el código JavaScript son públicos; nunca los uses para almacenar secretos.
- Los enlaces externos se limitan a HTTPS y se abren con `noopener noreferrer`.
- La política CSP del documento restringe scripts, estilos y conexiones a los recursos necesarios. Al entregarse como etiqueta `meta`, no puede aplicar directivas que requieren encabezados HTTP, como `frame-ancestors`.
- GitHub Pages no ofrece configuración general de encabezados HTTP personalizados mediante un archivo del repositorio. Por ello, algunas protecciones de encabezado requieren otro servicio de alojamiento o un proxy compatible.
- La consulta a GitHub usa datos públicos y no envía información personal del visitante desde formularios; este portal no contiene formularios de envío.
- La verificación de Google Search Console depende del archivo HTML de verificación; no publiques ni compartas códigos adicionales de verificación de cuentas.

## Comprobaciones antes de publicar

1. Revisa que los enlaces de cada proyecto abran la página correcta.
2. Comprueba el sitio en móvil y escritorio.
3. Revisa la consola del navegador por errores JavaScript o bloqueos CSP.
4. Verifica que no se hayan añadido secretos ni datos personales a los archivos públicos.
5. Confirma que la página de GitHub Pages cargue por HTTPS.

