var url = 'https://restcountries.com/v2/all';                      //Url da API
/*--------------------------------------------------------------Area de Declaração dos elementos Html-------------------------------------------------------------------------*/
var ulPaises = document.querySelector('#tabCountries');            
var ulFav = document.querySelector('#tabFavorites')
var popuTot = document.querySelector('#totalPopulationList')
var totalP = document.querySelector('#countCountries')
var totalPF = document.querySelector('#countFav')
var popuTotF = document.querySelector('#totalPopulationFavorites')
var Search = document.querySelector('#pesquisar')
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------Declaração de Variaveis---------------------------------------------------------------------------*/

var populationGlob = 0;   
var contP = 0;
var favoritos = [];
var country = [];
var filtred = '';
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

carregar();

function carregar() {
    country = [];
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            for (var i = 0; i < result.length; i++) {
                country.push(result[i]);
            }
            popuTot.textContent = populationGlob;
            renderizar();
        })

        console.log(country);
}
function renderizar() {
    populationGlob = 0;
    contP = 0;
    filtred = '';
    var paises = `
    <tr>
        <th colspan='2'>Bandeira</th>
        <th>Nome</th>
        <th>População</th>
    </tr>`;

    country.forEach((countryItem, index) => {
        if(countryItem != ''){
            populationGlob += parseInt(countryItem.population);
            contP++;
            paises +=
                `<tr class='${countryItem.region}'>
                <td> <button class='add button' onclick="favoritar(${index})"> + </button></td><td> <img src='${countryItem.flag}'>  </td>
                <td> ${countryItem.nativeName}(${countryItem.name})</td>
                <td> ${countryItem.population}</td>
            </tr>`;
        }
       
    });
    ulPaises.innerHTML = paises;
    popuTot.innerHTML = populationGlob;
    totalP.innerHTML = contP;
}
function renderizarF() {
    populationGlob = 0;
    contP = 0;
    var paises = `
    <tr>
        <th colspan='2'>Bandeira</th>
        <th>Nome</th>
        <th>População</th>
    </tr>`;

    favoritos.forEach((FavItem, index) => {
        if(FavItem != ''){
        populationGlob += parseInt(FavItem.population);
        contP++;
        paises +=
            `<tr class='${FavItem.region}'>
            <td> <button class='remove' onclick="removeFav(${index})"> - </button></td><td> <img src='${FavItem.flag}'>  </td>
            <td> ${FavItem.nativeName}(${FavItem.name})</td>
            <td> ${FavItem.population}</td>
        </tr>`;
        }

    });
    ulFav.innerHTML = paises;
    totalPF.innerHTML = contP;
    popuTotF.innerHTML = populationGlob;
}
function renderizarFiltro(region) {
    populationGlob = 0;
    contP = 0;
    filtred = region;
    var paises = `
    <tr>
        <th colspan='2'>Bandeira</th>
        <th>Nome</th>
        <th>População</th>
    </tr>`;

    country.forEach((countryItem, index) => {
        if(countryItem != ''){
            if (countryItem.region == region) {
                populationGlob += parseInt(countryItem.population);
            contP++;
            paises +=
                `<tr class='${countryItem.region}'>
                <td> <button class='add' onclick="favoritar(${index})"> + </button></td><td> <img src='${countryItem.flag}'>  </td>
                <td> ${countryItem.nativeName}(${countryItem.name})</td>
                <td> ${countryItem.population}</td>
            </tr>`;
            }
            
        }
    });
    ulPaises.innerHTML = paises;
    popuTot.innerHTML = populationGlob;
    totalP.innerHTML = contP;
}
function renderizarPesquisa(letter){
    populationGlob = 0;
    contP = 0;
    var paises = `
    <tr>
        <th colspan='2'>Bandeira</th>
        <th>Nome</th>
        <th>População</th>
    </tr>`;

    country.forEach((countryItem, index) => {
        if(countryItem != ''){
            if (countryItem.name.toLowerCase().startsWith(letter.toLowerCase()) || countryItem.nativeName.toLowerCase().startsWith(letter.toLowerCase())) {
                populationGlob += parseInt(countryItem.population);
            contP++;
            paises +=
                `<tr class='${countryItem.region}'>
                <td> <button class='add' onclick="favoritar(${index})"> + </button></td><td> <img src='${countryItem.flag}'>  </td>
                <td> ${countryItem.nativeName}(${countryItem.name})</td>
                <td> ${countryItem.population}</td>
            </tr>`;
            }
            
        }
    });
    ulPaises.innerHTML = paises;
    popuTot.innerHTML = populationGlob;
    totalP.innerHTML = contP;  
}
function favoritar(indice) {

    favoritos[indice] = country[indice];
    country[indice] = '';
    Search.value = '';
    if(filtred != ''){
        renderizarFiltro(filtred);
    }else{
        renderizar();
    }
    renderizarF();
}
function removeFav(indice) {
    country[indice] = favoritos[indice];
    favoritos[indice] = '';

    if(filtred != ''){
        renderizarFiltro(filtred);
    }else{
        renderizar();
    }
    renderizarF();
    
}

Search.addEventListener('input', ()=>{
    renderizarPesquisa(Search.value)
})

