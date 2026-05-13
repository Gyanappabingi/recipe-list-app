const recipeForm = document.getElementById('recipe-form');
const nameInput = document.getElementById('recipe-name');
const descriptionInput = document.getElementById('recipe-description');
const recipeList = document.getElementById('recipe-list');
const recipeCount = document.getElementById('recipe-count');

const initialRecipes = [
    {
        name: 'Lemon Tart',
        description: 'A crisp shell filled with tangy lemon curd and a dusting of powdered sugar.',
        favorite: false
    },
    {
        name: 'Caprese Salad',
        description: 'Fresh tomatoes, mozzarella, basil, and a drizzle of balsamic glaze.',
        favorite: false
    },
    {
        name: 'Coconut Curry',
        description: 'A creamy coconut curry with vegetables, ginger, and warm spices.',
        favorite: false
    }
];

let recipes = [...initialRecipes];

function updateRecipeCount() {
    const count = recipes.length;
    recipeCount.textContent = `${count} recipe${count === 1 ? '' : 's'}`;
}

function createRecipeCard(recipe, originalIndex) {
    const listItem = document.createElement('li');
    listItem.className = 'recipe-card';

    const header = document.createElement('div');
    header.className = 'recipe-header';

    const title = document.createElement('h3');
    title.textContent = recipe.name;

    const starButton = document.createElement('button');
    starButton.type = 'button';
    starButton.className = 'star-btn';
    starButton.setAttribute('aria-label', recipe.favorite ? 'Remove from favorites' : 'Add to favorites');
    starButton.innerHTML = recipe.favorite ? '★' : '☆';
    starButton.classList.toggle('favorite', recipe.favorite);
    starButton.addEventListener('click', () => toggleFavorite(originalIndex));

    header.append(title, starButton);

    const description = document.createElement('p');
    description.textContent = recipe.description;

    const meta = document.createElement('div');
    meta.className = 'recipe-meta';

    const created = document.createElement('span');
    created.textContent = `Recipe #${originalIndex + 1}`;
    created.style.color = 'var(--muted)';

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => removeRecipe(originalIndex));

    meta.append(created, deleteButton);
    listItem.append(header, description, meta);

    return listItem;
}

function renderRecipes() {
    recipeList.innerHTML = '';
    
    // Create array with original indices
    const sortedRecipes = recipes.map((recipe, index) => ({ recipe, index }));
    
    // Sort so favorites appear first
    sortedRecipes.sort((a, b) => {
        if (a.recipe.favorite === b.recipe.favorite) return a.index - b.index;
        return b.recipe.favorite ? 1 : -1;
    });
    
    // Render sorted recipes
    sortedRecipes.forEach(({ recipe, index }) => {
        recipeList.appendChild(createRecipeCard(recipe, index));
    });
    updateRecipeCount();
}

function removeRecipe(index) {
    recipes = recipes.filter((_, i) => i !== index);
    renderRecipes();
}

function toggleFavorite(index) {
    if (recipes[index]) {
        recipes[index].favorite = !recipes[index].favorite;
        renderRecipes();
    }
}

recipeForm.addEventListener('submit', event => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const description = des, favorite: falsecriptionInput.value.trim();

    if (!name || !description) {
        return;
    }

    recipes = [
        { name, description },
        ...recipes
    ];
    recipeForm.reset();
    renderRecipes();
});

renderRecipes();
