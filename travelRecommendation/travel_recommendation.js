const btnSearch = document.getElementById('btnSearch');

function searchTravelRecommendation() {
    const input = document.getElementById('search').value.toLowerCase();
    const resultDiv = document.getElementById('result'); 
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        // Search for matching country, temple, or beach
        const country = data.countries.find(country => country.name.toLowerCase() === input);  
        const temple = data.temples.find(temple => temple.name.toLowerCase() === input);
        const beach = data.beaches.find(beach => beach.name.toLowerCase() === input);

        // Display the result based on the type of recommendation found
        if (country) {
            const cities = country.cities.join(', ');
            resultDiv.innerHTML += `<h2>Search Result:</h2>`;
            resultDiv.innerHTML += `<h3>${cities.name}</h3>`;
            resultDiv.innerHTML += `<img src="${cities.imageUrl}" alt="change this" id="resultImg">`;
            resultDiv.innerHTML += `<p><strong>Description:</strong> ${cities.description}</p>`;
            console.log(cities);

        } else if (temple) {
            resultDiv.innerHTML += `<h2>Search Result:</h2>`;
            resultDiv.innerHTML += `<h3>${temple.name}</h3>`;
            resultDiv.innerHTML += `<img src="${temple.imageUrl}" alt="change this" id="resultImg">`;
            resultDiv.innerHTML += `<p><strong>Description:</strong> ${temple.description}</p>`;
            console.log(temple);

        } else if (beach) {
            resultDiv.innerHTML += `<h2>Search Result:</h2>`;
            resultDiv.innerHTML += `<h3>${beach.name}</h3>`;
            resultDiv.innerHTML += `<img src="${beach.imageUrl}" alt="change this" id="resultImg">`;
            resultDiv.innerHTML += `<p><strong>Description:</strong> ${beach.description}</p>`;
            console.log(beach);

        } else {
            resultDiv.innerHTML = 'Destination not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
}
btnSearch.addEventListener('click', searchTravelRecommendation);

//This function clears the text input. 
const btnClear = document.getElementById('btnClear');

function clearInput() {
    document.getElementById('search').value = ''; // Set the value of the input field to an empty string
    const resultDiv = document.getElementById('result')
    resultDiv.innerHTML = '';
}
btnClear.addEventListener('click', clearInput);
