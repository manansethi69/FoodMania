document.getElementById("search").addEventListener("click", async () => {

    // getting user inputs
    const ingredients = document.getElementById("ingredients").value.trim();
    const diet = document.getElementById("diet").value;

    // ensure atleast one ingredient
    if (!ingredients) {
        alert("Please enter at least one ingredient.");
        return;
    }

    try {
        // making API request to backend
        const response =await fetch(`http://localhost:5000/api/recipes?ingredients=${ingredients}&diet=${diet}`);
        const data = await response.json();

        // getting the results
        const resultsDiv =document.getElementById("results");
        resultsDiv.innerHTML = "";

        // checking for any error
        if (data.error) {
            resultsDiv.innerHTML =`<p>${data.error}</p>`;
            return;
        }

        // displaying on page
        data.forEach(recipe => {
            resultsDiv.innerHTML +=`<div class='recipe'><h3>${recipe.title}</h3><img src='${recipe.image}' alt='${recipe.title}'></div>`;
        });
    } catch (error) {
        // errors during fetch request
        alert("Error fetching recipes. Try again later.");
    }
});
