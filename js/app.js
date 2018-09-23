    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    const cities = [];
    const searchInput = document.querySelector('.search-input');
    const searchList = document.querySelector('.search-list');

    function checkFetchStatus(response) {
        if (response.status === 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(
            new Error(response.statusText));
        }
    }

    function turnToJson(data) {
        return data.json();
    }


    fetch(endpoint)
        .then(checkFetchStatus)
        .then(turnToJson)
        .then(data => cities.push(...data))
        .catch(error => console.log(`Upss, that's the trobule reason: ${error}`))

    function matchWord(word, cities) {
        return cities.filter(city => {
            let regex = new RegExp(word, 'gi');
            return city.city.match(regex) || city.state.match(regex)
        })
    }

    function displayValue() {
        const userInput = this.value;
        let resultArray = matchWord(userInput, cities);
        let newInput = resultArray.map(place => {
            const regex = new RegExp(this.value, 'gi');
            const cityName = place.city.replace(regex, `<span class="bright">${this.value}</span>`);
            const stateName = place.state.replace(regex, `<span class="bright">${this.value}</span>`);
            return `
                <li>
                <span class="name">${cityName}, ${stateName}, </span>
                <span class="population">${place.population}</span>
                </li>`
        }).join('');
        searchList.innerHTML = newInput;
        
    }

    searchInput.addEventListener('input', displayValue);