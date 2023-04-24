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
         jsonListeProjets.forEach(projet => {
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

        jsonListeProjets.forEach( afficherProjet => {
//Je vais chercher le nom de mes filtres
            let projetTableau = Object.values(jsonListeProjets)

            let tableau = Object.values(afficherProjet)

            let tableauBis = Object.values(tableau[5])
            console.log(tableauBis[1])

//je relie JS au filtres HTML et suppression button HTML
            let filtreGalerieProjet = document.querySelector('.filtres')
            filtreGalerieProjet.innerHTML = '' 

// j'ajoute les filtres
            for (let i in projetTableau) {
                let boutonFiltre = document.createElement('button')
                boutonFiltre.textContent = tableauBis[1]
                filtreGalerieProjet.appendChild(boutonFiltre)
            }

        })
            
            


         

// Je vais chercher le nom du filtre
/*for (let i=0; i<jsonListeProjets.lenght; i++){

       jsonListeProjets[i] = new Array[i]
       console.log(jsonListeProjets[i])
        }*/
    })    
        //console.log(tableauBis[5])
    
        /*let tableauTer = Object.values(tableauBis[5])
        console.log(tableauTer[1])
        
// relier JS au filtres HTML et suppression button HTML
        const filtreGalerieProjet = document.querySelector('.filtres')
        filtreGalerieProjet.innerHTML = '' 

// ajout des filtres
        const boutonFiltre = document.createElement('button')
        boutonFiltre.textContent = tableauTer[1]
        filtreGalerieProjet.appendChild(boutonFiltre)
        }    
    })
    

// TEST
/*fetch ('http://localhost:5678/api/works')
    .then(dataListeProjets => dataListeProjets.json())
    .then(jsonListeProjets => {
        console.log(jsonListeProjets)
        let tableau = Object.values()
            for (let i=0; i< jsonListeProjets.lenght; i++){
            console.log(jsonListeProjets[i])
            }*/
