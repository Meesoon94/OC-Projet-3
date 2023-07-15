// Récupérer les données dans l'API et les stockées sous forme de chaine de caractères dans mon navigateur
fetch('http://localhost:5678/api/works')
    .then(dataListeProjets => dataListeProjets.json())
    .then(jsonListeProjets => {
        const listeProjets = JSON.stringify(jsonListeProjets)
        console.log(jsonListeProjets)
        localStorage.setItem('projets', listeProjets)
    })

// Pour transformer ma chaine de caractères stockée en objet JS exploitable
const listeProjets = JSON.parse(localStorage.getItem('projets'))
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
// relier fichier JS à la classe modal-galerie du HTML
const modalGalerieProjet = document.querySelector('.gallery')
// suppression galerie du HTML 
modalGalerieProjet.innerHTML = ''

//Ajout de chaque élément de la galerie 
listeProjets.forEach(projet => {
    const figure = document.createElement('figure')
    const img = document.createElement('img')
    const editer = document.createElement('p')
    const poubelle = document.createElement ('i')
    const move = document.createElement('i')
    
    img.src = projet.imageUrl
    img.alt = projet.title
    editer.textContent = 'éditer'

    figure.classList.add('modal-figure'); // Ajout de la classe pour la mise en page dans la modale

    poubelle.classList.add('fa-solid', 'fa-trash-can', 'poubelle-icone'); // Ajout des classes pour l'icône poubelle

    move.classList.add('fa-solid', 'fa-up-down-left-right', 'move-icone', 'hidden')

    galerieProjet.appendChild(figure)
    figure.appendChild(img)
    figure.appendChild(editer)
    figure.appendChild(poubelle)
    figure.appendChild(move)

    figure.addEventListener('mouseenter', () => {
        move.classList.remove('hidden'); // Afficher l'icône déplacer au survol de l'image
    });
    
    figure.addEventListener('mouseleave', () => {
        move.classList.add('hidden'); // Masquer l'icône déplacer lorsque le curseur quitte l'image
    });
})

// code suppression API
//const ids = listeProjets.map(projet => projet.id);
//console.log(ids);

//const boutonSupprimer = document.querySelector('.supression');
const iconesPoubelle = document.querySelectorAll('.poubelle-icone');

function supprimerProjet(id) {
  // Vérifier si l'utilisateur est authentifié (vous devez mettre votre propre logique d'authentification ici)
  if (!token) {
    alert("Vous devez vous connecter pour supprimer un projet.");
    return;
  }

  // Vérifier si l'id du projet est présent
  if (!id) {
    alert("Impossible de récupérer l'ID du projet.");
    return;
  }
console.log(id)

  /*// Vérifier si l'élément projet existe
  
  if (!projet) {
    alert("L'élément projet avec l'ID " + id + " n'existe pas.");
    return;
  }*/
  // Effectuer une requête vers l'API pour supprimer le projet
  let url = "http://localhost:5678/api/works/" + id;
  fetch(url, {
    method: "DELETE",
    headers: {
        "Authorization": `Bearer ${token}`
    }
  })
    .then(response => {
      if (response.ok) {
        // Suppression réussie, faire les traitements nécessaires (par exemple, masquer le projet de l'interface)
        let projet = document.getElementById("projet-" + id);
        projet.style.display = "none";
        alert("Le projet a été supprimé avec succès.");
      } else {
        // La suppression a échoué, afficher un message d'erreur approprié
        alert("Une erreur s'est produite lors de la suppression du projet.");
      }
    })
    .catch(error => {
      console.log(error.message);
      alert("Une ERREUR s'est produite lors de la suppression du projet.");
    });
}

iconesPoubelle.forEach( (poubelle,index) => {
    poubelle.addEventListener('click',()=>{
        const idProjet = listeProjets[index].id
        supprimerProjet(idProjet)
    })
})


/*boutonSupprimer.addEventListener('click', () => {
  if (token && ids.length > 0) {
    const premierId = ids[0];
    supprimerProjet(premierId);
  }
});*/

/*iconesPoubelle.forEach((icon, index) => {
  icon.addEventListener('click', () => {
    if (token) {
      const id = ids[index];
      supprimerProjet(id);
    }
  });
});*/

// Code suppression page web 

iconesPoubelle.forEach(icon => {
    icon.addEventListener('click', function (e) {
        icon.parentElement.remove()
    })
})

/*//const boutonSupprimer = document.querySelector('.supression')
boutonSupprimer.addEventListener('click', () =>{
    const imageContainers = document.querySelectorAll('.image-container')
    imageContainers.forEach( container => (
        container.remove()
    ))
})
*/


/*const ids = listeProjets.map(projet => projet.id)
console.log(ids)
const boutonSupprimer = document.querySelector('.supression')
let iconesPoubelle = document.querySelectorAll('.poubelle')


function supprimerProjet(id) {
  // Vérifier si l'utilisateur est authentifié (vous devez mettre votre propre logique d'authentification ici)
  if (!token) {
    alert("Vous devez vous connecter pour supprimer un projet.");
    return;
  }

  // Vérifier si l'id du projet est présent
  if (!id) {
    alert("Impossible de récupérer l'ID du projet.");
    return;
  }

  // Effectuer une requête vers l'API pour supprimer le projet
  var url = "http://localhost:5678/api/works/" + id;
  fetch(url, {
    method: "DELETE",
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4OTMyMDc3NSwiZXhwIjoxNjg5NDA3MTc1fQ.dw2554WKJDInJ6n9FBfa13YgWG0pBlAFQDiTtpQA9lA"
    }
  })
    .then(response => {
      if (response.ok) {
        // Suppression réussie, faire les traitements nécessaires (par exemple, masquer le projet de l'interface)
        console.log(id)
        let projet = document.getElementById("projet-" + id);
        projet.style.display = "none";
        alert("Le projet a été supprimé avec succès.");
      } else {
        // La suppression a échoué, afficher un message d'erreur approprié
        alert("Une erreur s'est produite lors de la suppression du projet.");
      }
    })
    .catch(error => {
      console.log(error);
      alert("Une erreur s'est produite lors de la suppression du projet.");
    });
}

// Appel de la fonction supprimerProjet avec un ID spécifique
boutonSupprimer.addEventListener('click', () =>{
        
        if (token){
        supprimerProjet()
        }
    
})


iconesPoubelle.forEach(icon => {
    icon.addEventListener('click', function (e) {
        
            if (token){
            supprimerProjet()
            }
        
    })
}); // Supprime le premier projet de la liste
*/

/*boutonSupprimer.addEventListener('click', () =>{
function supprimerProjet(element) {
    // Vérifier si l'utilisateur est authentifié (vous devez mettre votre propre logique d'authentification ici)
    if (token === null) {
      alert("Vous devez vous connecter pour supprimer un projet.");
      return;
    }
  
    // Vérifier si l'id du projet est présent
    if (!id) {
      alert("Impossible de récupérer l'ID du projet.");
      return;
    }

    let id = element.getAttribute("data-id")
  
    // Effectuer une requête vers l'API pour supprimer le projet
    let url = "http://localhost:5678/api/works/" + id;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4OTMyMDc3NSwiZXhwIjoxNjg5NDA3MTc1fQ.dw2554WKJDInJ6n9FBfa13YgWG0pBlAFQDiTtpQA9lA"
      }
    })
      .then(response => {
        if (response.ok) {
          // Suppression réussie, faire les traitements nécessaires (par exemple, masquer le projet de l'interface)
          var projet = document.getElementById("projet");
          projet.style.display = "none";
          alert("Le projet a été supprimé avec succès.");
        } else {
          // La suppression a échoué, afficher un message d'erreur approprié
          alert("Une erreur s'est produite lors de la suppression du projet.");
        }
      })
      .catch(error => {
        console.log(error);
        alert("Une erreur s'est produite lors de la suppression du projet.");
      });
  }
})*/
  
  

//const url = `http://localhost:5678/api/works/${ids}`; // URL de la route de suppression


/*const iconesPoubelle = document.querySelectorAll('.poubelle')

iconesPoubelle.forEach(icon => {
    icon.addEventListener('click', () => {
for (let id of ids)
        if (token && ids) {
            // L'utilisateur est authentifié, envoyer la requête DELETE à l'API pour supprimer le projet
            const url = `http://localhost:5678/api/works/${ids}`; // URL de la route de suppression

            fetch(url, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        console.log('Projet supprimé avec succès');
                    } else {
                        console.log('Erreur lors de la suppression du projet');
                    }
                })
                .catch(error => {
                    console.error('Erreur lors de l\'envoi de la requête:', error);
                });
        } else {
            // L'utilisateur n'est pas authentifié, afficher un message d'erreur
            console.log('Vous devez être authentifié pour supprimer un projet');
        }
    });
      var element = event.target;
  var id = element.parentNode.getAttribute("data-id");
})*/
    









//rendre mes filtres fonctionnels

//boucle remplacer par la fonction filter
/*
let projetId
let nomDuProjet
for (const projet of listeProjets) {
    if (projet.nom === nomDuProjet) {
      projetId = projet.id;
      break;
    }
  }
let imagesProjetASupprimer = document.querySelector('.image-container')

iconePoubelle.addEventListener('click', function(e){
    e.preventDefault()
    imagesProjetASupprimer.forEach(function(image){
        image.remove()
    })else {
    document.querySelectorAll('.admin').classList.add('hidden')
}

listeProjets.forEach( projetObjetFiltrés =>{
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
