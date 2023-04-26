// Récupérer les données dans l'API

 fetch('http://localhost:5678/api/works')
     .then(dataListeProjets => dataListeProjets.json())
     .then(jsonListeProjets => {
         console.table(jsonListeProjets)

// relier fichier JS à la classe gallery du HTML
         const galerieProjet = document.querySelector('.gallery')
// suppression galerie du HTML 
         galerieProjet.innerHTML = ''

//Ajout de chaque élément de la galerie 
         jsonListeProjets.map(projet => {
             const figure = document.createElement('figure')
             const img = document.createElement('img')
             const figcaption = document.createElement('figcaption')

             img.src = projet.imageUrl
             img.alt = projet.title
             figcaption.textContent = projet.title

             galerieProjet.appendChild(figure)
             figure.appendChild(img)
             figure.appendChild(figcaption)
         });
     })

// ajout des filtres 
fetch('http://localhost:5678/api/categories')
     .then(dataListeFiltres => dataListeFiltres.json())
     .then(jsonListeFiltres => {
        console.log(jsonListeFiltres)

        //je relie JS et HTML et suppression HTML
        const filtreProjet = document.querySelector('.filtres')
        filtreProjet.innerHTML=''

        // je rajoute mon filtre TOUS
        let filtreTous = document.createElement('button')
            filtreTous.textContent = 'Tous'
            filtreProjet.appendChild(filtreTous)

        // je crée mes élements filtres
        jsonListeFiltres.forEach( nomFiltre => {
            const bouttonFiltre = document.createElement('button')
            bouttonFiltre.textContent = nomFiltre.name
            filtreProjet.appendChild(bouttonFiltre)
        })

     })

        