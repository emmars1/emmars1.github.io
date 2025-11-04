// categories array with Font Awesome classes
const categories = [
    { id: 1, name: 'DESIGN' },
    { id: 2, name: 'READING' },
    { id: 3, name: 'FUN' },
    { id: 4, name: 'MUSIC' },
    { id: 5, name: 'MISC' }
];

// create my bookmarks array, categorize them
let bookmarks = [
    { id: 1, categoryId: 3, url: 'https://hellostreetcat.framer.website/', shortDescription: 'hello street cat', longDescription: "a stray cat feeder app and website where you can donate money to feed strays in shanghai, China. it used to be pretty popular in 2023/24 after it initially released, but i think the hype died down. adopt don’t shop!" },

    { id: 2, categoryId: 2, url: 'https://www.bylinebyline.com/', shortDescription: 'byline byline', longDescription: "online editorial based in New York City, each issue reflects one theme, including the stories and articles included." },

    { id: 3, categoryId: 3, url: 'https://mynoise.net/', shortDescription: 'mynoise', longDescription: "collection of soundscapes, makes good asmr." },

    { id: 4, categoryId: 3, url: 'https://www.cameronsworld.net/', shortDescription: 'cameron\'s world', longDescription: "elaborate web collage made by Cameron Askin, hosting old geocities websites on a single platform." },

    { id: 5, categoryId: 1, url: 'https://ilovecreatives.com/internet-gems?epik=dj0yJnU9Q2lZOHFicjJJUkVyUEY0MjNaMUJad0U1a2RPdjVESGkmcD0wJm49RklERWl1RklBSE9INmloVVR3Q3JKQSZ0PUFBQUFBR2pxa0FV#email-gems', shortDescription: 'internet gems - i love creatives', longDescription: "this website offers courses and hosts a collection of websites made by people taking them, very nice for inpsiration." },

    { id: 6, categoryId: 2, url: 'https://inactual.it/', shortDescription: 'inactual', longDescription: "online italian magazine focusing on visual studies and undisciplined art forms." },

    { id: 7, categoryId: 4, url: 'https://linktr.ee/soundinvestments', shortDescription: 'sound investments', longDescription: "collection of playlists based on spotify." },

    { id: 8, categoryId: 3, url: 'https://www.myretrotvs.com/', shortDescription: 'my retro tv', longDescription: "mimics pre-2000s television." },

    { id: 9, categoryId: 2, url: 'https://ishi.place/', shortDescription: 'ishi magazine', longDescription: "cute online magazine." },

    { id: 10, categoryId: 1, url: 'https://eyecannndy.com/', shortDescription: 'eye cannndy', longDescription: "image archive and collection, filtered into multiple different categories to choose from." },

    { id: 11, categoryId: 3, url: 'https://melonland.net/', shortDescription: 'melon land', longDescription: "online art community project emulating and hosting early 2000s web spaces." },

    { id: 12, categoryId: 2, url: 'https://www.digitization.wiki/', shortDescription: 'digitization wiki', longDescription: "really visually beautiful plant and bug archive with interactive 3D models and facts." },

    { id: 13, categoryId: 5, url: 'https://recipesforfood.net/', shortDescription: 'recipes for food', longDescription: "random collection of recipes from online." },

    { id: 14, categoryId: 3, url: 'https://sandspiel.club/', shortDescription: 'sandspiel game', longDescription: "game based on early internet 'faling sand' games, where you make your own small environment." },

    { id: 15, categoryId: 5, url: 'https://www.myfridgefood.com/', shortDescription: 'my fridge food', longDescription: "gives you recipes based on what you already have in your fridge." },
   
    { id: 16, categoryId: 1, url: 'https://www.grillitype.com/', shortDescription: 'grillitype foundry', longDescription: "type foundry based in Switzerland, established in 2009." },

    { id: 17, categoryId: 1, url: 'https://typotheque.genderfluid.space/fr', shortDescription: 'typotheque foundry', longDescription: "type library collecting post-binary typefaces." }
];

// track active filter (null means show all)
let activeFilter = null;

// find a category with id
function getCategoryById(categoryId) {
    return categories.find(cat => cat.id === categoryId);
}

// render the category dropdown and the bookmarks
function init() {
    populateCategoryDropdown();
    renderBookmarks();
}

// Populate the category dropdown
function populateCategoryDropdown() {
    const select = document.getElementById('categorySelect');

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        select.appendChild(option);
    });

    // Add change event listener
    select.addEventListener('change', (e) => {
        activeFilter = e.target.value ? parseInt(e.target.value) : null;
        renderBookmarks();
    });
}

// Render bookmarks list
function renderBookmarks() {
    const bookmarkList = document.getElementById('bookmark-list');
    bookmarkList.innerHTML = '';

    // Filter bookmarks based on active filter
    const filteredBookmarks = activeFilter === null
        ? bookmarks
        : bookmarks.filter(bookmark => bookmark.categoryId === activeFilter);

    if (filteredBookmarks.length === 0) {
        bookmarkList.innerHTML = '<p>No bookmarks to display.</p>';
        return;
    }

    filteredBookmarks.forEach(bookmark => {
        const category = getCategoryById(bookmark.categoryId);
        const bookmarkItem = document.createElement('div');
        bookmarkItem.className = 'bookmark-item';

        bookmarkItem.innerHTML = `
            <div class="bookmark-info">
                <span class="bookmark-link-wrapper">
                    <a href="${bookmark.url}" target="_blank" class="bookmark-url">
                        <i class="fa-solid fa-arrow-right"></i></i> ${bookmark.shortDescription}</a>
                    <span class="tooltip">${bookmark.longDescription}</span>
                </span>
                <span class="category-label">${category.name}</span>
            </div>
        `;

        bookmarkList.appendChild(bookmarkItem);
    });
}

// DOM is loaded, call init
document.addEventListener('DOMContentLoaded', init);