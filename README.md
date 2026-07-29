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

`TU-CORREO@EJEMPLO.COM`

por tu correo real de soporte.

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

## Seguridad

No agregues tokens personales de GitHub en `app.js` o `config.js`. Todo el contenido de una web pública puede ser visto por cualquier visitante.
