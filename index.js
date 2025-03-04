const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const container = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const closeBtn = document.querySelector(".recipe-close-btn");



const fetchRecipe = async (query) => {
    container.innerHTML = 'fatching recipe....';

    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    
    
    container.innerHTML = '';

    if (response.meals) {
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p>${meal.strArea} dish</p>
                <p><b>${meal.strCategory}</b></p>
            `;
            const button = document.createElement('button');
            button.textContent = "view recipes"
            recipeDiv.appendChild(button)
            container.appendChild(recipeDiv);
            button.addEventListener('click', ()=>{
                openRecipePopup(meal);
            })
        });
    } else {
        const noResultMessage = document.createElement('p');
        noResultMessage.textContent = 'No recipes found. Please try another search.';
        container.appendChild(noResultMessage);
    }
};
const fetchIngredents = (meal)=>{
    let ingredentList = ""
    for(let i=1; i<=20; i++){
        const ingredent = meal[`strIngredient${i}`]
        if(ingredent){
            const measure = meal[`strMeasure${i}`]
            ingredentList += `<li>${measure} ${ingredent}</li>`
        }
        else{
            break;
        }
    }
    return ingredentList;
}
const openRecipePopup = (meal)=>{
    recipeDetailsContent.innerHTML = `
      <h2 class="recipeName">${meal.strMeal} </h2>
      <h3>ingredents:</h3>
      <ul class="ingredentList">${fetchIngredents(meal)}</ul>
      <div>
      <h3>instructions:</h3>
      <p class="instructions">${meal.strInstructions}</p>
      </div>
    `
    recipeDetailsContent.parentElement.style.display = "block";
}

closeBtn.addEventListener('click', ()=>{
    recipeDetailsContent.parentElement.style.display = "none";
})
 
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchT = searchBox.value.trim();
    if (searchT) {
        fetchRecipe(searchT);
    } else {
        const noResultMessage = document.createElement('p');
        noResultMessage.textContent = 'Please enter a search term.';
        container.appendChild(noResultMessage);
    }
});
