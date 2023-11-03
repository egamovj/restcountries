document.addEventListener('DOMContentLoaded', function() {
    const box = document.querySelector('.box');
    const loading = document.querySelector('.loading');
    const notFoundMessage = document.querySelector('.notFoundMessage');
    const input = document.querySelector('.search');
    const itemsPerPage = 8;
    let currentPage = 1;
    let totalItems = 0;
    let newData = [];

    const myData = fetch('https://restcountries.com/v3.1/all/');

    myData
        .then(function(response) {
            return response.json();
        })
        .then(function(datas) {
            totalItems = datas.length;
            newData = datas;

            generatePaginationLinks();
            updateCards('');
        });

    function updateCards(searchValue) {
        box.innerHTML = '';
        let found = false;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
        newData.slice(startIndex, endIndex).forEach((data) => {
            const dataTitle = data.name.common.toLowerCase();
            const searchData = searchValue.toLowerCase();
            if (dataTitle.includes(searchData)) {
                const mainDiv = document.createElement('div');
                mainDiv.classList.add('main-box');
                const textDiv = document.createElement('div');
                textDiv.classList.add('text-box');

                const image = document.createElement('img');
                image.src = data.flags.png;
                image.alt = data.flags.alt;
                mainDiv.appendChild(image);

                const common = document.createElement('h3');
                common.textContent = data.name.common;
                textDiv.appendChild(common);

                const population = document.createElement('h4');
                population.textContent = `Population: ${data.population.toLocaleString()}`;
                textDiv.appendChild(population);

                const region = document.createElement('h4');
                region.textContent = `Region: ${data.region}`;
                textDiv.appendChild(region);

                const capital = document.createElement('h4');
                capital.textContent = `Capital: ${data.capital}`;
                textDiv.appendChild(capital);

                const currencies = document.createElement('h4');
                currencies.textContent = `Currencies: ${Object.keys(data.currencies).join(', ')}`;
                textDiv.appendChild(currencies);

                box.appendChild(mainDiv);
                mainDiv.appendChild(textDiv);
                found = true;
            }
        });

        window.scrollTo(0, 0);
        loading.style.display = 'none';
        if (!found) {
            notFoundMessage.style.display = 'block';
        } else {
            notFoundMessage.style.display = 'none';
        }
    }

    const pagination = document.querySelector('.pagination');

    function generatePaginationLinks() {
        pagination.innerHTML = '';
        const totalPage = Math.ceil(totalItems / itemsPerPage);

        for (let i = 0; i < totalPage; i++) {
            const pageLink = document.createElement('li');
            pageLink.textContent = i + 1;

            if (i + 1 === currentPage) {
                pageLink.classList.add('active');
            }

            pagination.appendChild(pageLink);

            pageLink.addEventListener('click', () => {
                currentPage = i + 1;
                updateCards('');
                const pageLinks = pagination.querySelectorAll('li');
                pageLinks.forEach(link => link.classList.remove('active'));
                pageLink.classList.add('active');
            });
        }
    }

    input.addEventListener('input', () => {
        const searchValue = input.value;
        updateCards(searchValue);
    });
});