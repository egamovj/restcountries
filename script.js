const box = document.querySelector('.box');
const countries = fetch('https://restcountries.com/v3.1/all');
const searchInput = document.getElementById('search');

// Функция для фильтрации стран по введенному тексту
function filterCountries(text) {
    const mainBoxes = document.querySelectorAll('.main-box');
    mainBoxes.forEach(mainBox => {
        const countryName = mainBox.querySelector('h3').textContent.toLowerCase();
        if (countryName.includes(text.toLowerCase())) {
            mainBox.style.display = 'block';
        } else {
            mainBox.style.display = 'none';
        }
    });
}

countries.then((response) => response.json()).then((countries) => {
    countries.forEach((country) => {

        const mainDiv = document.createElement('div')
        mainDiv.classList.add('main-box')
        const textDiv = document.createElement('div')
        textDiv.classList.add('text-box')

        const image = document.createElement('img');
        image.src = country.flags.png;
        image.alt = country.flags.alt;
        mainDiv.appendChild(image);

        const common = document.createElement('h3');
        common.textContent = country.name.common;
        textDiv.appendChild(common);

        const population = document.createElement('h4');
        population.textContent = `Population: ${country.population.toLocaleString()}`;
        textDiv.appendChild(population)

        const region = document.createElement('h4');
        region.textContent = `Region: ${country.region}`;
        textDiv.appendChild(region);

        const capital = document.createElement('h4');
        capital.textContent = `Capital: ${country.capital}`;
        textDiv.appendChild(capital);

        const currencies = document.createElement('h4');
        currencies.textContent = `Currencies: ${Object.keys(country.currencies).join(', ')}`;
        textDiv.appendChild(currencies)

        box.appendChild(mainDiv)
        mainDiv.appendChild(textDiv)

    })
}).catch((error) => console.log(error))

searchInput.addEventListener('input', () => {
    filterCountries(searchInput.value);
});