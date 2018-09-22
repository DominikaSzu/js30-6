document.addEventListener('DOMContentLoaded', function(e) {
    
    const endpoint = 'https://gist.githubusercontent.com/erdem/8c7d26765831d0f9a8c62f02782ae00d/raw/248037cd701af0a4957cce340dabb0fd04e38f4c/countries.json'
    
    const cities = [];
    
    function checkFetchStatus (response) {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(
                new Error(response.statusText));
        }
    }
                
    function turnToJson (data) {
        return data.json();
    }
    
    
    fetch(endpoint)
        .then(checkFetchStatus)
        .then(turnToJson)
        .then(data => cities.push(data))
        .catch(error => console.log(`Uups, this is the trouble maker: ${error}`));
    
    console.log(cities);
            

    
});