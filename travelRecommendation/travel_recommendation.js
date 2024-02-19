const btnSearch = document.getElementById('btnSearch');

//This function fetches the travel recommendation data from the travel_recommendation_api.json file and searches for a matching recommendation based on user input
function searchTravelRecommendation() {
    const input = document.getElementById('search').value.toLowerCase(); //This retrieves the value entered into the input field with the ID search. It converts the entered text to lowercase to ensure case-insensitive comparison.
    const resultDiv = document.getElementById('result'); 
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
      .then(response => response.json()) //Converts the fetched response into JSON format.
      .then(data => {
        const country = data.countries.find(item => item.name.toLowerCase() === input); // This searches within the JSON data for a travel recommendation whose name matches the entered input.

        if (country) {
            const description = country.description;

          resultDiv.innerHTML += `<h2>${country.name}</h2>`;
          resultDiv.innerHTML += `<img src="${country.imagesrc}" alt="Change image here">`;
          resultDiv.innerHTML += `<p><strong>Description:</strong> ${description}</p>`;
        } else {
          resultDiv.innerHTML = 'Destination not found.';
        }
      })

      //This handles any errors that might occur during the fetch request or data processing.
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });

    btnSearch.addEventListener('click', searchTravelRecommendation);
}