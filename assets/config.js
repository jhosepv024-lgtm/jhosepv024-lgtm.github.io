window.PORTAL_CONFIG = {
  site: {
    brand: "JL Apps Studio",
    owner: "Jose Valladolid",
    githubUser: "jhosepv024-lgtm",
    github: "https://github.com/jhosepv024-lgtm",
    heroDescription: "Aplicaciones Android, juegos, servicios, políticas de privacidad y proyectos en desarrollo organizados automáticamente.",
    about: "Desarrollador independiente enfocado en aplicaciones Android, juegos creados con Unity, contenido multimedia, Firebase y soluciones digitales fáciles de usar.",
    skills: ["Android", "Kotlin", "Unity", "C#", "Firebase", "GitHub Pages", "HTML", "CSS", "JavaScript"]
  },

  // Proyectos que deseas mostrar primero con una presentación comercial mejorada.
  // Puedes editar, agregar o eliminar elementos sin tocar index.html.
  featured: [
    {
      repo: "xivora",
      title: "Xivora",
      category: "Aplicaciones",
      icon: "📻",
      status: "Publicado",
      description: "Aplicación de radio diseñada para descubrir y escuchar emisoras desde una experiencia rápida y organizada.",
      tags: ["Android", "Radio", "Firebase"],
      playStore: "",
      website: "https://jhosepv024-lgtm.github.io/xivora/"
    },
    {
      repo: "aplasta-hormigas-pro",
      title: "Aplasta Hormigas Pro",
      category: "Juegos",
      icon: "🐜",
      status: "En desarrollo",
      description: "Juego arcade por niveles con enemigos, objetivos, recompensas y dificultad progresiva.",
      tags: ["Unity", "Android", "Arcade"],
      playStore: "",
      website: "https://jhosepv024-lgtm.github.io/aplasta-hormigas-pro/"
    },
    {
      repo: "ajedrez-maestro",
      title: "Ajedrez Maestro",
      category: "Juegos",
      icon: "♟️",
      status: "Disponible",
      description: "Proyecto de ajedrez con una presentación adaptable para jugadores y páginas públicas del producto.",
      tags: ["Juego", "Web", "GitHub Pages"],
      playStore: "",
      website: "https://jhosepv024-lgtm.github.io/ajedrez-maestro/"
    },
    {
      repo: "vibraconnect-privacy",
      title: "VibraConnect",
      category: "Aplicaciones",
      icon: "💬",
      status: "Política disponible",
      description: "Aplicación social con historias, comentarios, mensajes y soporte para varios idiomas.",
      tags: ["Android", "Comunidad", "Privacidad"],
      playStore: "",
      website: "https://jhosepv024-lgtm.github.io/vibraconnect-privacy/"
    }
  ],

  // Reglas simples para clasificar automáticamente los repositorios.
  categories: {
    privacy: ["privacy", "privacidad", "policy", "politica"],
    games: ["game", "juego", "ajedrez", "hormiga", "solitaire", "pinball", "flappy", "tower", "alien", "bolts"],
    tools: ["tool", "util", "manager", "generator", "actualizador", "validator", "scraper"],
    apps: ["app", "radio", "tv", "xivora", "vibra", "nova", "receta", "saboria"]
  },

  // Repositorios que no deseas mostrar en el portal.
  hiddenRepositories: ["jhosepv024-lgtm.github.io"],

  // La API pública de GitHub admite hasta 100 repositorios por página.
  githubApi: {
    perPage: 100,
    includeForks: false,
    includeArchived: true
  }
};
