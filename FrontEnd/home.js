// Récupérer les données dans l'API et les stockées sous forme de chaine de caractères dans mon navigateur
fetch('http://localhost:5678/api/works')
    .then(dataListeProjets => dataListeProjets.json())
    .then(jsonListeProjets => {
        const listeProjets = JSON.stringify(jsonListeProjets)
        localStorage.setItem('projets', listeProjets)
    })

// Pour transformer ma chaine de caractères stockée en objet JS exploitable
const listeProjets = JSON.parse(localStorage.getItem('projets'))
console.table(listeProjets)

// relier fichier JS à la classe gallery du HTML
const galerieProjet = document.querySelector('.gallery')
// suppression galerie du HTML 
galerieProjet.innerHTML = ''

//Ajout de chaque élément de la galerie 
listeProjets.forEach(projet => {
    const figure = document.createElement('figure')
    const img = document.createElement('img')
    const figcaption = document.createElement('figcaption')

    img.src = projet.imageUrl
    img.alt = projet.title
    figcaption.textContent = projet.title

    galerieProjet.appendChild(figure)
    figure.appendChild(img)
    figure.appendChild(figcaption)
})

// ajout des filtres à partir de la route catégorie 
//j'importe mes données à partir de mon API et je les stocke sous forme de chaine de caractères
fetch('http://localhost:5678/api/categories')
    .then(dataListeFiltres => dataListeFiltres.json())
    .then(jsonListeFiltres => {
        const listeFiltres = JSON.stringify(jsonListeFiltres)
        localStorage.setItem('filtres', listeFiltres)
    })
//Je récupère mes données reconvertis en objet JSON
const listeFiltres = JSON.parse(localStorage.getItem('filtres'))
console.log(listeFiltres)

//je relie JS et HTML et suppression HTML
const filtreProjet = document.querySelector('.filtres')
filtreProjet.innerHTML=''

// je rajoute mon filtre TOUS
let filtreTous = document.createElement('button')
filtreTous.textContent = 'Tous'
filtreProjet.appendChild(filtreTous)
//Je rends mon filtre TOUS fonctionnel
filtreTous.addEventListener('click', function () {
    galerieProjet.innerHTML = ''
    listeProjets.forEach(projet => {
        const figure = document.createElement('figure')
        const img = document.createElement('img')
        const figcaption = document.createElement('figcaption')
    
        img.src = projet.imageUrl
        img.alt = projet.title
        figcaption.textContent = projet.title
    
        galerieProjet.appendChild(figure)
        figure.appendChild(img)
        figure.appendChild(figcaption)
    })
})

// je crée mes autres boutons filtres et les rends fonctionnel
listeFiltres.forEach(nomFiltre => {
    const boutonFiltre = document.createElement('button')
    boutonFiltre.textContent = nomFiltre.name
    filtreProjet.appendChild(boutonFiltre)
    if (nomFiltre.name === 'Objets') {
        boutonFiltre.addEventListener('click', function () {
            const listeFiltreeObjets = listeProjets.filter((projet) => projet.categoryId === 1)
            //je supprime la galerie importée dynamiquement pour importés seulement les projets Objets
            galerieProjet.innerHTML = ''
            //j'importe uniquement la liste de projet filtrée (Objets)
            listeFiltreeObjets.forEach(projet => {
                const figure = document.createElement('figure')
                const img = document.createElement('img')
                const figcaption = document.createElement('figcaption')

                img.src = projet.imageUrl
                img.alt = projet.title
                figcaption.textContent = projet.title

                galerieProjet.appendChild(figure)
                figure.appendChild(img)
                figure.appendChild(figcaption)
            })
        })
    } else if (nomFiltre.name === 'Appartements'){
        boutonFiltre.addEventListener('click', function () {
            const listeFiltreeAppartement = listeProjets.filter((projet) => projet.categoryId === 2)
            galerieProjet.innerHTML = ''
            listeFiltreeAppartement.forEach(projet => {
                const figure = document.createElement('figure')
                const img = document.createElement('img')
                const figcaption = document.createElement('figcaption')

                img.src = projet.imageUrl
                img.alt = projet.title
                figcaption.textContent = projet.title

                galerieProjet.appendChild(figure)
                figure.appendChild(img)
                figure.appendChild(figcaption)
            })
        })
    } else {
        boutonFiltre.addEventListener('click', function () {
            const listeFiltreeHotelRestaurant = listeProjets.filter((projet) => projet.categoryId === 3)
            galerieProjet.innerHTML = ''
            listeFiltreeHotelRestaurant.forEach(projet => {
                const figure = document.createElement('figure')
                const img = document.createElement('img')
                const figcaption = document.createElement('figcaption')

                img.src = projet.imageUrl
                img.alt = projet.title
                figcaption.textContent = projet.title

                galerieProjet.appendChild(figure)
                figure.appendChild(img)
                figure.appendChild(figcaption)
            })
        })
    }
})

//rendre mes filtres fonctionnels

//boucle remplacer par la fonction filter
/*listeProjets.forEach( projetObjetFiltrés =>{
    const listeFiltreObjets = []
    for (let i=0; i<listeProjets.length; i++){
        listeProjets[i].categoryId
        //console.log(listeProjets[i].categoryId)
        //console.log("bouton,"+boutonFiltreObjets.dataset.category)
        if (boutonFiltreObjets.dataset.category == listeProjets[i].categoryId){
            listeFiltreObjets.push(i)
            //console.log(boutonFiltreObjets.dataset.category)
        }
    }
})*/
