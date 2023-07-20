//Récupérer les données dans l'API et les stockées sous forme de chaine de caractères dans mon navigateur
fetch('http://localhost:5678/api/works')
    .then(dataListeProjets => dataListeProjets.json())
    .then(jsonListeProjets => {
        const listeProjets = JSON.stringify(jsonListeProjets)
        console.table(jsonListeProjets)
        localStorage.setItem('projets', listeProjets)
    })

// Pour transformer ma chaine de caractères stockée en objet JS exploitable
let listeProjets = JSON.parse(localStorage.getItem('projets'))
console.log(listeProjets)

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

//Authentification administrateur
// Je vais chercher mon token stocké dans mon session storage
let token = sessionStorage.getItem('token')
console.log(token)

if (token) {
    let filtresCaches = document.querySelector('.filtres')
    filtresCaches.style.display = 'none'
    let adminElement = document.querySelectorAll('.admin')
    for (let i=0; i< adminElement.length; i++){
        adminElement[i].style.display='flex'
    }
} 
else {
    let adminElement = document.querySelectorAll('.admin')
    for (let i=0; i< adminElement.length; i++){
        adminElement[i].style.display='none'
    }  
} 

// Code modale
let modal = null

const ouvrirModal = function (e){
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', fermerModal)
    modal.querySelector('.fermerModalJS').addEventListener('click', fermerModal)
    modal.querySelector('.jsModalStop').addEventListener('click', stopPropagation)
}

const fermerModal = function(e){
    if (modal === null) return
    e.preventDefault()

    // Vérifier si la suppression du projet a été effectuée
    //const suppressionEffectuee = e.target.classList.contains('poubelle-icone');
    //if (suppressionEffectuee) return; // Arrêter l'exécution de la fonction si la suppression est effectuée

    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', fermerModal)
    modal.querySelector('.fermerModalJS').removeEventListener('click', fermerModal)
    modal.querySelector('.jsModalStop').removeEventListener('click', stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll('.modalJS').forEach ( a=> {
    a.addEventListener('click', ouvrirModal)
})

//importer la galerie dans la modale dynamiquement
const modalGalerieProjet = document.querySelector('.gallery')
modalGalerieProjet.innerHTML = ''

//Ajout des éléments de la galerie à la modale
listeProjets.forEach(projet => {
    const figure = document.createElement('figure')
    const img = document.createElement('img')
    const editer = document.createElement('p')
    const poubelle = document.createElement ('i')
    const move = document.createElement('i')
    
    img.src = projet.imageUrl
    img.alt = projet.title
    editer.textContent = 'éditer'

    // Ajout de la classe pour la mise en page dans la modale
    figure.classList.add('modal-figure')
    // Ajout des classes pour l'icône poubelle
    poubelle.classList.add('fa-solid', 'fa-trash-can', 'poubelle-icone')
    // Ajout de la classe pour l'icône déplacer
    move.classList.add('fa-solid', 'fa-up-down-left-right', 'move-icone', 'hidden') 

  // Récupérer l'ID du projet
    const projetId = projet.id
    console.log(projetId)

  // Stocker l'ID du projet comme attribut personnalisé
    figure.setAttribute('data-id', projetId)
  
    modalGalerieProjet.appendChild(figure)
    figure.appendChild(img)
    figure.appendChild(editer)
    figure.appendChild(poubelle)
    figure.appendChild(move)

  //Gestion de l'apparition de l'icône déplacer
    figure.addEventListener('mouseenter', () => {
       // Afficher l'icône déplacer au survol de l'image
        move.classList.remove('hidden')
    })
    figure.addEventListener('mouseleave', () => {
      // Masquer l'icône déplacer lorsque le curseur quitte l'image
        move.classList.add('hidden')
    })
})

// code suppression API
const iconesPoubelle = document.querySelectorAll('.poubelle-icone')

function supprimerProjet(id, event) {
  //Pour que la modale ne se ferme pas a la suppression des projets
  event.stopPropagation()
  // Vérifier si l'utilisateur est authentifié
  if (!token) {
    alert("Vous devez vous connecter pour supprimer un projet.")
    return
  }
  console.log(token)
  // Vérifier si l'id du projet est présent
  if (!id) {
    alert("Impossible de récupérer l'ID du projet.")
    return
  }
  console.log(id)

  // Effectuer une requête vers l'API pour supprimer le projet
  let url = "http://localhost:5678/api/works/" + id
  const response = fetch(url, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(response => {
      if (response.ok) {
        // Suppression réussie, faire les traitements nécessaires (par exemple, masquer le projet de l'interface)
        let projet = document.querySelector(`[data-id="${id}"]`)
        console.log(projet)
        mettreAJourListeProjets(id)
        alert("Le projet a été supprimé avec succès.")
      } else {
        // La suppression a échoué, afficher un message d'erreur approprié
        console.error("Une erreur s'est produite lors de la suppression du projet:", response.statusText)
        alert("Une erreur s'est produite lors de la suppression du projet.")
      }
    })

    .catch(error => {
      console.error("Une ERREUR s'est produite lors de la suppression du projet:", error.message)
      alert("Une ERREUR s'est produite lors de la suppression du projet.")
    })
  }

// Fonction pour mettre à jour la liste des projets après la suppression
function mettreAJourListeProjets(idProjetSupprime) {
  // Filtrer la liste existante pour exclure le projet supprimé
  listeProjets = listeProjets.filter(projet => projet.id !== idProjetSupprime)
}

  iconesPoubelle.forEach((poubelle, index) => {
    poubelle.addEventListener('click', (event) => {
      event.stopPropagation()
      // Récupérer l'élément figure parent de l'icône poubelle
      const figureElement = poubelle.closest('.modal-figure')
      // Récupérer l'ID du projet à partir de l'attribut personnalisé
      const projetId = figureElement.getAttribute('data-id')
      console.log(projetId)
      supprimerProjet(projetId, event)
      // Masquer l'élément du projet dans l'interface utilisateur
      figureElement.style.display = 'none'
    })
  })
