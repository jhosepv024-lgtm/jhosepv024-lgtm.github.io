const config = window.PORTAL_CONFIG;
const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

let repositories = [];

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeUrl(url) {
  if (!url) return "";
  try {
    const parsed = new URL(url, window.location.href);
    return ["http:", "https:", "mailto:"].includes(parsed.protocol) ? parsed.href : "";
  } catch {
    return "";
  }
}

function formatName(name) {
  return name
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\b\w/g, letter => letter.toUpperCase());
}

function formatDate(date) {
  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(date));
}

function classifyRepository(repo) {
  const text = `${repo.name} ${repo.description || ""} ${(repo.topics || []).join(" ")}`.toLowerCase();
  const includesAny = words => words.some(word => text.includes(word));
  if (includesAny(config.categories.privacy)) return "Privacidad";
  if (includesAny(config.categories.games)) return "Juegos";
  if (includesAny(config.categories.tools)) return "Herramientas";
  if (includesAny(config.categories.apps)) return "Aplicaciones";
  return "Otros";
}

function defaultPagesUrl(repo) {
  return `https://${config.site.githubUser}.github.io/${repo.name}/`;
}

function loadSiteData() {
  const { site } = config;
  document.title = `${site.brand} | Portal de proyectos`;
  $("#brandName").textContent = site.brand;
  $("#footerBrand").textContent = site.brand;
  $("#developerName").textContent = site.owner;
  $("#footerOwner").textContent = site.owner;
  $("#heroDescription").textContent = site.heroDescription;
  $("#aboutText").textContent = site.about;
  $("#skills").innerHTML = site.skills.map(skill => `<span>${escapeHtml(skill)}</span>`).join("");
  ["#githubNav", "#githubHero", "#githubButton"].forEach(id => $(id).href = site.github);
  $("#emailButton").href = `mailto:${site.email}?subject=${encodeURIComponent(`Contacto desde ${site.brand}`)}`;
  $("#year").textContent = new Date().getFullYear();
}

function renderMetrics(total = "—") {
  const privacyCount = repositories.filter(repo => classifyRepository(repo) === "Privacidad").length;
  const pagesCount = repositories.filter(repo => repo.has_pages).length;
  $("#metrics").innerHTML = `
    <div class="metric"><strong>${total}</strong><span>Repositorios públicos</span></div>
    <div class="metric"><strong>${privacyCount || "—"}</strong><span>Páginas de privacidad</span></div>
    <div class="metric"><strong>${pagesCount || "—"}</strong><span>Sitios GitHub Pages</span></div>
  `;
}

function renderFeatured() {
  const grid = $("#featuredGrid");
  const template = $("#featuredTemplate");
  grid.innerHTML = "";

  config.featured.forEach(project => {
    const fragment = template.content.cloneNode(true);
    const repoUrl = safeUrl(`${config.site.github}/${project.repo}`);
    const repo = repositories.find(item => item.name.toLowerCase() === project.repo.toLowerCase());
    // Solo mostramos una web pública cuando fue configurada manualmente o
    // cuando el repositorio declara una homepage válida. Esto evita enlaces
    // de GitHub Pages que todavía no han sido publicados y terminan en 404.
    const pageUrl = safeUrl(project.website) || safeUrl(repo?.homepage);

    $(".featured-icon", fragment).textContent = project.icon;
    $(".featured-status", fragment).textContent = project.status;
    $(".featured-category", fragment).textContent = project.category;
    $(".featured-title", fragment).textContent = project.title;
    $(".featured-description", fragment).textContent = project.description;
    $(".featured-tags", fragment).innerHTML = project.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("");

    const actions = [
      `<a class="action-button action-primary" href="${repoUrl}" target="_blank" rel="noopener" aria-label="Abrir repositorio de ${escapeHtml(project.title)}">Ver repositorio en GitHub <span>↗</span></a>`
    ];
    if (pageUrl) actions.push(`<a class="action-button" href="${pageUrl}" target="_blank" rel="noopener">Abrir página web <span>↗</span></a>`);
    if (safeUrl(project.playStore)) actions.push(`<a class="action-button" href="${safeUrl(project.playStore)}" target="_blank" rel="noopener">Ver en Google Play <span>↗</span></a>`);
    $(".featured-actions", fragment).innerHTML = actions.join("");

    grid.appendChild(fragment);
  });
  activateReveals();
}

async function fetchRepositories() {
  const status = $("#repoStatus");
  const api = `https://api.github.com/users/${encodeURIComponent(config.site.githubUser)}/repos?per_page=${config.githubApi.perPage}&sort=updated&type=owner`;

  try {
    const response = await fetch(api, { headers: { Accept: "application/vnd.github+json" } });
    if (!response.ok) throw new Error(`GitHub respondió con código ${response.status}`);

    const data = await response.json();
    repositories = data.filter(repo => {
      if (config.hiddenRepositories.includes(repo.name)) return false;
      if (!config.githubApi.includeForks && repo.fork) return false;
      if (!config.githubApi.includeArchived && repo.archived) return false;
      return true;
    });

    status.textContent = `${repositories.length} repositorios cargados desde GitHub.`;
    renderMetrics(repositories.length);
    renderFeatured();
    applyRepositoryFilters();
  } catch (error) {
    console.error(error);
    status.innerHTML = `No fue posible consultar GitHub en este momento. <a href="${config.site.github}" target="_blank" rel="noopener">Abrir el perfil directamente</a>.`;
    $("#repositoryGrid").innerHTML = "";
    $("#emptyState").hidden = true;
    renderMetrics("—");
  }
}

function applyRepositoryFilters() {
  const query = $("#repoSearch").value.trim().toLowerCase();
  const category = $("#repoCategory").value;
  const sort = $("#repoSort").value;

  let filtered = repositories.filter(repo => {
    const repoCategory = classifyRepository(repo);
    const searchable = `${repo.name} ${repo.description || ""} ${repo.language || ""} ${(repo.topics || []).join(" ")}`.toLowerCase();
    return (!query || searchable.includes(query)) && (category === "Todos" || repoCategory === category);
  });

  filtered.sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name, "es");
    if (sort === "stars") return b.stargazers_count - a.stargazers_count;
    return new Date(b.updated_at) - new Date(a.updated_at);
  });

  renderRepositories(filtered);
}

function renderRepositories(items) {
  const grid = $("#repositoryGrid");
  const template = $("#repoTemplate");
  const empty = $("#emptyState");
  grid.innerHTML = "";
  empty.hidden = items.length !== 0;

  items.forEach(repo => {
    const fragment = template.content.cloneNode(true);
    const category = classifyRepository(repo);
    const description = repo.description || "Repositorio público del portafolio de JL Apps Studio.";
    const language = repo.language || "Proyecto web";

    $(".repo-category", fragment).textContent = category;
    $(".repo-name", fragment).textContent = formatName(repo.name);
    $(".repo-description", fragment).textContent = description;
    $(".repo-language", fragment).textContent = language;
    $(".repo-updated", fragment).textContent = `Actualizado ${formatDate(repo.updated_at)}`;

    const badges = [];
    if (repo.archived) badges.push("Archivado");
    if (repo.fork) badges.push("Fork");
    if (repo.stargazers_count) badges.push(`★ ${repo.stargazers_count}`);
    if (repo.license?.spdx_id) badges.push(repo.license.spdx_id);
    $(".repo-badges", fragment).innerHTML = badges.map(item => `<span>${escapeHtml(item)}</span>`).join("");

    const actions = [
      `<a class="action-button action-primary" href="${safeUrl(repo.html_url)}" target="_blank" rel="noopener">Ver repositorio en GitHub <span>↗</span></a>`
    ];
    // La homepage configurada en GitHub es más fiable que asumir que Pages
    // ya está desplegado únicamente porque has_pages sea verdadero.
    if (repo.homepage && safeUrl(repo.homepage)) {
      actions.push(`<a class="action-button" href="${safeUrl(repo.homepage)}" target="_blank" rel="noopener">Abrir página web <span>↗</span></a>`);
    }
    $(".repo-actions", fragment).innerHTML = actions.join("");

    grid.appendChild(fragment);
  });
  activateReveals();
}

function initControls() {
  $("#repoSearch").addEventListener("input", applyRepositoryFilters);
  $("#repoCategory").addEventListener("change", applyRepositoryFilters);
  $("#repoSort").addEventListener("change", applyRepositoryFilters);

  const toggle = $("#menuToggle");
  const nav = $("#mainNav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$("a", nav).forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}

function activateReveals() {
  const elements = $$(".reveal:not(.visible)");
  if (!("IntersectionObserver" in window)) {
    elements.forEach(element => element.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  elements.forEach(element => observer.observe(element));
}

loadSiteData();
renderMetrics();
renderFeatured();
initControls();
activateReveals();
fetchRepositories();
