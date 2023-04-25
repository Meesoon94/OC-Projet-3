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

// ajout des filtres index0
fetch ('http://localhost:5678/api/works')
    .then(dataListeProjets => dataListeProjets.json())
    .then(jsonListeProjets =>  {

        console.log(jsonListeProjets)

        const nomFiltre = jsonListeProjets.filter((projet, index)=> {
            return console.log(projet.category.name)  
        })

//je relie JS au filtres HTML et suppression button HTML
            const filtreGalerieProjet = document.querySelector('.filtres')
            filtreGalerieProjet.innerHTML = ''    

// j'ajoute les filtres
            
            const boutonFiltre = document.createElement('button')
            boutonFiltre.textContent = jsonListeProjets.nomFiltre
            filtreGalerieProjet.appendChild(boutonFiltre)
        
    })       

// TEST
/*fetch ('http://localhost:5678/api/works')
    .then(dataListeProjets => dataListeProjets.json())
    .then(jsonListeProjets => {
        console.log(jsonListeProjets)
       