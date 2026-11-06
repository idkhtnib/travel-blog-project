// ======================================================
// 1. БАЗА ДАННЫХ СТАТЕЙ (Практическая работа №5)
// ======================================================
const initialArticles = [
  {
    id: 1,
    title: "Магия Горного Алтая",
    date: "15 сентября 2026",
    isoDate: "2026-09-15",
    text: "В этой статье я расскажу о нашем недельном походе к подножию Белухи. Мы прошли более 50 километров по красивейшим местам. Горный Алтай запомнился чистым воздухом, горными реками и невероятными пейзажами.",
    tags: "#алтай #поход #путешествия"
  },
  {
    id: 2,
    title: "Выходные в Калининграде",
    date: "10 сентября 2026",
    isoDate: "2026-09-10",
    text: "Калининград встретил нас европейской архитектурой и запахом моря. Балтийская коса — обязательное место к посещению. В городе приятно гулять по старым улицам и пробовать местную кухню.",
    tags: "#калининград #балтика #море"
  },
  {
    id: 3,
    title: "Осенний Дагестан и каньоны",
    date: "05 сентября 2026",
    isoDate: "2026-09-05",
    text: "Сулакский каньон поражает своими масштабами. Бирюзовая вода реки Сулак и огромные скалы оставляют неизгладимое впечатление. Это направление подойдет тем, кто любит горы и активный отдых.",
    tags: "#дагестан #каньон #кавказ"
  }
];

// Сохраняем количество лайков и состояние раскрытия отдельно от HTML
const likesById = {};
const expandedById = {};

const postsContainer = document.getElementById("postsContainer");
const searchInput = document.getElementById("searchInput");

// ======================================================
// 2. ФУНКЦИЯ ДИНАМИЧЕСКОГО РЕНДЕРИНГА СТАТЕЙ
// ======================================================
function renderArticles(articlesArray) {
  postsContainer.innerHTML = "";

  if (articlesArray.length === 0) {
    postsContainer.innerHTML = '<p class="no-results">Ничего не найдено 😢</p>';
    return;
  }

  articlesArray.forEach((article) => {
    const likes = likesById[article.id] || 0;
    const isExpanded = Boolean(expandedById[article.id]);
    const textClass = isExpanded ? "article-text" : "article-text short";
    const readMoreText = isExpanded ? "Свернуть" : "Читать далее";

    const articleHtml = `
      <article data-id="${article.id}">
        <header>
          <h3>${article.title}</h3>
          <p>Опубликовано: <time datetime="${article.isoDate}">${article.date}</time></p>
        </header>

        <p class="${textClass}">${article.text}</p>

        <button class="read-more-btn" type="button" data-id="${article.id}">
          ${readMoreText}
        </button>

        <footer>
          <p>Теги: ${article.tags}</p>
          <div class="article-actions">
            <button class="like-btn" type="button" data-id="${article.id}">
              ❤ Лайк (<span class="like-count">${likes}</span>)
            </button>
          </div>
        </footer>
      </article>
    `;

    postsContainer.insertAdjacentHTML("beforeend", articleHtml);
  });

  addArticleButtonListeners();
}

// ======================================================
// 3. ЛАЙКИ И РАСКРЫТИЕ ТЕКСТА (Практическая работа №4)
// ======================================================
function addArticleButtonListeners() {
  const likeButtons = document.querySelectorAll(".like-btn");

  likeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const articleId = Number(button.dataset.id);
      likesById[articleId] = (likesById[articleId] || 0) + 1;
      const countSpan = button.querySelector(".like-count");
      countSpan.textContent = likesById[articleId];
      button.classList.add("liked");
    });
  });

  const readMoreButtons = document.querySelectorAll(".read-more-btn");

  readMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const articleId = Number(button.dataset.id);
      expandedById[articleId] = !expandedById[articleId];

      const currentSearch = searchInput.value.toLowerCase().trim();
      const filteredArticles = getFilteredArticles(currentSearch);
      renderArticles(filteredArticles);
    });
  });
}

// ======================================================
// 4. ЖИВОЙ ПОИСК ПО ЗАГОЛОВКУ, ТЕКСТУ И ТЕГАМ (ПР №5)
// ======================================================
function getFilteredArticles(searchText) {
  return initialArticles.filter((article) => {
    const inTitle = article.title.toLowerCase().includes(searchText);
    const inText = article.text.toLowerCase().includes(searchText);
    const inTags = article.tags.toLowerCase().includes(searchText);

    return inTitle || inText || inTags;
  });
}

searchInput.addEventListener("input", (event) => {
  const searchText = event.target.value.toLowerCase().trim();
  renderArticles(getFilteredArticles(searchText));
});

// ======================================================
// 5. ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ (Практическая работа №4)
// ======================================================
const themeButton = document.getElementById("themeBtn");

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  if (document.body.classList.contains("dark-theme")) {
    themeButton.textContent = "☀ Светлая тема";
  } else {
    themeButton.textContent = "🌙 Темная тема";
  }
});

// Первичная отрисовка статей при загрузке страницы
renderArticles(initialArticles);
