const recipeForm = document.getElementById('recipe-form');
const nameInput = document.getElementById('recipe-name');
const descriptionInput = document.getElementById('recipe-description');
const recipeList = document.getElementById('recipe-list');
const recipeCount = document.getElementById('recipe-count');

const initialRecipes = [
    {
        name: 'Lemon Tart',
        description: 'A crisp shell filled with tangy lemon curd and a dusting of powdered sugar.'
    },
    {
        name: 'Caprese Salad',
        description: 'Fresh tomatoes, mozzarella, basil, and a drizzle of balsamic glaze.'
    },
    {
        name: 'Coconut Curry',
        description: 'A creamy coconut curry with vegetables, ginger, and warm spices.'
    }
];

let recipes = [...initialRecipes];

function updateRecipeCount() {
    const count = recipes.length;
    recipeCount.textContent = `${count} recipe${count === 1 ? '' : 's'}`;
}

function createRecipeCard(recipe, index) {
    const listItem = document.createElement('li');
    listItem.className = 'recipe-card';

    const title = document.createElement('h3');
    title.textContent = recipe.name;

    const description = document.createElement('p');
    description.textContent = recipe.description;

    const meta = document.createElement('div');
    meta.className = 'recipe-meta';

    const created = document.createElement('span');
    created.textContent = `Recipe #${index + 1}`;
    created.style.color = 'var(--muted)';

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => removeRecipe(index));

    meta.append(created, deleteButton);
    listItem.append(title, description, meta);

    return listItem;
}

function renderRecipes() {
    recipeList.innerHTML = '';
    recipes.forEach((recipe, index) => {
        recipeList.appendChild(createRecipeCard(recipe, index));
    });
    updateRecipeCount();
}

function removeRecipe(index) {
    recipes = recipes.filter((_, i) => i !== index);
    renderRecipes();
}

recipeForm.addEventListener('submit', event => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();

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
