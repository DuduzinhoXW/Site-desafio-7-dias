// Dados das receitas atualizados
const recipes = [
    {
        title: "Pastel Saudável",
        videoId: "gzxQPPn1g1I",
        credits: "@cozinhasaudaveloficial"
    },
    {
        title: "Pudim Saudável",
        videoId: "i4vZ1mNWBOQ",
        credits: "@nutricionistacriativa"
    },
    {
        title: "Pizza Saudável",
        videoId: "i8KXQEXRS8A",
        credits: "@chefsaudavel"
    },
    {
        title: "Coxinha Saudável",
        videoId: "Ou6ZFBCHAHY",
        credits: "@receitasfitoficial"
    },
    {
        title: "Panqueca Saudável",
        videoId: "KeLqo5ukJA8",
        credits: "@cozinhaleve"
    },
    {
        title: "Brigadeiro Saudável",
        videoId: "CrOZZIDqfO0",
        credits: "@docesfit"
    },
    // Novas receitas adicionadas
    {
        title: "Torta de Frango Fit",
        videoId: "I1DMhL--uL8",
        credits: "@receitasfitfacil"
    },
    {
        title: "Smoothie Energético",
        videoId: "H9jHAso0qv4",
        credits: "@vidasaudaveloficial"
    },
    {
        title: "Cookie de Banana",
        videoId: "ADEgM2MpvqM",
        credits: "@cozinhasaudavel"
    },
    {
        title: "Omelete de Microondas",
        videoId: "eIwqZKy6AjQ",
        credits: "@praticasaude"
    },
    {
        title: "Pão de Queijo Fit",
        videoId: "FHnNntHciYU",
        credits: "@receitasleves"
    },
    {
        title: "Salada Cremosa",
        videoId: "hzA8ChxNE8A",
        credits: "@cozinhapratica"
    },
    {
        title: "Suco Detox",
        videoId: "lzDV4fUm3jQ",
        credits: "@nutricaopratica"
    },
    {
        title: "Bolo de Caneca Proteico",
        videoId: "oO2zoxhn32M",
        credits: "@receitasfitdoces"
    },
    {
        title: "Wrap de Frango",
        videoId: "VFwyL3b4SR0",
        credits: "@cozinhasaudaveloficial"
    }
];

// Restante do código permanece igual...
const recipesContainer = document.getElementById('recipesContainer');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadRecipes(recipes);
    setupSearch();
});

// Carrega todas as receitas
function loadRecipes(recipesToLoad) {
    recipesContainer.innerHTML = '';

    if (recipesToLoad.length === 0) {
        recipesContainer.innerHTML = '<p class="no-results">Nenhuma receita encontrada. Tente outro termo de pesquisa.</p>';
        return;
    }

    recipesToLoad.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <h2 class="recipe-title">${recipe.title}</h2>
            <div class="video-container">
                <iframe src="https://www.youtube.com/embed/${recipe.videoId}" frameborder="0" allowfullscreen></iframe>
            </div>
            <p class="video-credits">Receita por: <strong>${recipe.credits}</strong></p>
        `;
        recipesContainer.appendChild(recipeCard);
    });
}

// Configura o sistema de pesquisa
function setupSearch() {
    // Pesquisa ao clicar no botão
    searchButton.addEventListener('click', performSearch);
    
    // Pesquisa ao pressionar Enter
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        loadRecipes(recipes);
        return;
    }

    const filteredRecipes = recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm) || 
        recipe.credits.toLowerCase().includes(searchTerm)
    );

    loadRecipes(filteredRecipes);
}