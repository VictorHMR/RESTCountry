var url = 'https://restcountries.com/v2/all';                      //Url da API
/*--------------------------------------------------------------Area de Declaração dos elementos Html-------------------------------------------------------------------------*/
var ulPaises = document.querySelector('#tabCountries');
var ulFav = document.querySelector('#tabFavorites')
var popuTot = document.querySelector('#totalPopulationList')
var totalP = document.querySelector('#countCountries')
var totalPF = document.querySelector('#countFav')
var popuTotF = document.querySelector('#totalPopulationFavorites')
var Search = document.querySelector('#pesquisar')
var SearchF = document.querySelector('#pesquisarF')
var SLinguas = document.querySelector('#Linguas')

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------Declaração de Variaveis---------------------------------------------------------------------------*/

var populationGlob = 0;
var contP = 0;
var favoritos = [];
var country = [];
var filtred = '';
var lingua = 0;
var nome;
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
country = [];
fetch(url)
    .then((response) => {
        return response.json()
    })
    .then((result) => {
        for (var i = 0; i < result.length; i++) {
            country.push({
                name: [result[i].name, result[i].translations.br, result[i].translations.es, result[i].translations.ja],
                nativeName: result[i].nativeName,
                region: result[i].region,
                flag: result[i].flag,
                population: result[i].population
            });
        }
        popuTot.textContent = populationGlob;
        renderizar();
    })

console.log(country);

function renderizar(filter, type) { // Recebe como parametro um valor para o filtro e um tipo de filtro
    populationGlob = 0;
    contP = 0;
    filtred = '';
    var paises = `
    <tr>
        <th colspan='2'>Bandeira</th>
        <th>Nome(Nome Nativo)</th>
        <th>População</th>
    </tr>`;


    if (type == 'Letter') { // Verifica se o filtro recebido foi um Nome ou letra

        country.forEach((countryItem, index) => {

            if (countryItem != '') {
                if (countryItem.name[0].toLowerCase().startsWith(filter.toLowerCase()) || countryItem.name[lingua].toLowerCase().startsWith(filter.toLowerCase()) || countryItem.nativeName.toLowerCase().startsWith(filter.toLowerCase())) {
                    populationGlob += parseInt(countryItem.population);
                    contP++;
                    paises +=
                        `<tr class='${countryItem.region}'>
                        <td> <button class='add btn' onclick="favoritar(${index})"> + </button></td><td> <img src='${countryItem.flag}'>  </td>
                        <td> ${countryItem.name[lingua]}(${countryItem.nativeName})</td>
                        <td> ${Intl.NumberFormat('pt-BR').format(countryItem.population)}</td>
                    </tr>`;
                }

            }


        });
    } else if (type == 'Region') { // Verifica se o filtro recebido foi uma região

        filtred = filter
        country.forEach((countryItem, index) => {
            if (countryItem != '' && countryItem.region == filter) {
                populationGlob += parseInt(countryItem.population);
                contP++;
                paises +=
                    `<tr class='${countryItem.region}'>
                    <td> <button class='add btn' onclick="favoritar(${index})"> + </button></td><td> <img src='${countryItem.flag}'>  </td>
                    <td> ${countryItem.name[lingua]}(${countryItem.nativeName})</td>
                    <td> ${Intl.NumberFormat('pt-BR').format(countryItem.population)}</td>
                </tr>`;
            }
        });
    } else {
        country.forEach((countryItem, index) => { // Caso não exista filtro, renderiza tudo
            if (countryItem != '') {
                populationGlob += parseInt(countryItem.population);
                contP++;
                paises +=
                    `<tr class='${countryItem.region}'>
                    <td> <button class='add btn' onclick="favoritar(${index})"> + </button></td><td> <img src='${countryItem.flag}'>  </td>
                    <td> ${countryItem.name[lingua]}(${countryItem.nativeName})</td>
                    <td> ${Intl.NumberFormat('pt-BR').format(countryItem.population)}</td>
                </tr>`;
            }

        });
    }


    ulPaises.innerHTML = paises;
    popuTot.innerHTML = Intl.NumberFormat('pt-BR').format(populationGlob);
    totalP.innerHTML = contP;
}
function renderizarF(filterF, type) {
    populationGlob = 0;
    contP = 0;
    var paises = `
    <tr>
        <th colspan='2'>Bandeira</th>
        <th>Nome(Nome Nativo)</th>
        <th>População</th>
    </tr>`;

    if (type == 'Letter') { // Verifica se o filtro recebido foi um Nome ou letra

        filtred = filterF
        favoritos.forEach((FavItem, index) => {
            if (FavItem != '') {
                if (FavItem.name[0].toLowerCase().startsWith(filterF.toLowerCase()) || FavItem.name[lingua].toLowerCase().startsWith(filterF.toLowerCase()) || FavItem.nativeName.toLowerCase().startsWith(filterF.toLowerCase())) {
                    populationGlob += parseInt(FavItem.population);
                    contP++;
                    paises +=
                        `<tr class='${FavItem.region}'>
                <td> <button class='remove btn' onclick="removeFav(${index})"> - </button></td><td> <img src='${FavItem.flag}'>  </td>
                <td> ${FavItem.name[lingua]}(${FavItem.nativeName})</td>
                <td> ${Intl.NumberFormat('pt-BR').format(FavItem.population)}</td>
            </tr>`;
                }

            }

        });
    } else if (type == 'Region') { // Verifica se o filtro recebido foi uma região

        filtred = filterF
        favoritos.forEach((FavItem, index) => {
            if (FavItem != '' && FavItem.region == filterF) {
                populationGlob += parseInt(FavItem.population);
                contP++;
                paises +=
                    `<tr class='${FavItem.region}'>
            <td> <button class='remove btn' onclick="removeFav(${index})"> - </button></td><td> <img src='${FavItem.flag}'>  </td>
            <td> ${FavItem.name[lingua]}(${FavItem.nativeName})</td>
            <td> ${Intl.NumberFormat('pt-BR').format(FavItem.population)}</td>
        </tr>`;
            }

        });
    } else {
        favoritos.forEach((FavItem, index) => {
            if (FavItem != '') {
                populationGlob += parseInt(FavItem.population);
                contP++;
                paises +=
                    `<tr class='${FavItem.region}'>
            <td> <button class='remove btn' onclick="removeFav(${index})"> - </button></td><td> <img src='${FavItem.flag}'>  </td>
            <td> ${FavItem.name[lingua]}(${FavItem.nativeName})</td>
            <td> ${Intl.NumberFormat('pt-BR').format(FavItem.population)}</td>
        </tr>`;
            }

        });
    }
    ulFav.innerHTML = paises;
    totalPF.innerHTML = contP;
    popuTotF.innerHTML = Intl.NumberFormat('pt-BR').format(populationGlob);
}
function favoritar(indice) {
    Search.value = '';
    favoritos[indice] = country[indice];
    country[indice] = '';
    Search.value = '';
    if (filtred != '') {
        renderizar(filtred, 'Region');
    } else {
        renderizar();
    }
    renderizarF();
}
function removeFav(indice) {
    Search.value = '';
    country[indice] = favoritos[indice];
    favoritos[indice] = '';

    if (filtred != '') {
        renderizar(filtred, 'Region');
    } else {
        renderizar();
    }
    renderizarF();

}

Search.addEventListener('input', () => {
    renderizar(Search.value, 'Letter')
})
SearchF.addEventListener('input', () => {
    renderizarF(SearchF.value, 'Letter')
})

SLinguas.addEventListener('change', () => {
    lingua = parseInt(SLinguas.options[SLinguas.selectedIndex].value);
    renderizar();
    if(favoritos != ''){
        renderizarF();
    }
})