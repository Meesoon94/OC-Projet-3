let loginSubmit = document.querySelector('#login-form-submit')
loginSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    let emailLogin = document.getElementById('email')
    let passwordLogin = document.getElementById('password')
    if (emailLogin.value == "" && passwordLogin.value == "") {
        return alert('Mot de passe et/ou email erroné. Veuillez vérifier vos identifiants.')
    }
    let user = {
        email: emailLogin.value,
        password: passwordLogin.value
    }

    fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    })
        .then(reponse => reponse.json())
        .then(dataUser => {
            // Traitement de la réponse de l'API + stockage
            console.log(dataUser);
            let token = dataUser.token
            sessionStorage.setItem('token', token)
            console.log(dataUser.token)
            // Redirection vers la page d'accueil
            if (dataUser.token !== undefined ){
                window.location.href="index.html"; 
            } else {
                return alert ('Mot de passe et/ou email erroné. Veuillez vérifier vos identifiants.')
            }
        })
        .catch(error => {
            // Gestion des erreurs
            console.error(error);
        });
})

//let redirectionAccueil = document.location.href="index.html"

     

      

  
 /*
.then (reponseJson => {
    alert("clique");
    localStorage.setItem('user', token)
})
 let user = {}

    (async () => {
        let response = await fetch(`http://localhost:5678/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        })

        let result = await response.json();
        alert(result.message);
        
    })  
 const boutonSubmit = document.getElementById("login-form-submit")
boutonSubmit.addEventListener('click', function(){
    alert ("clique")
})
 })
    .then ( R => R.JSON)
    .then ( result => {
        console.table(result)
    })

 
let email = {}
let password = {}


  
let user = {}

    .then(response => response.json())
    .then(userJson => {
        const user = JSON.stringify(userJson)
        localStorage.setItem('token', user.token)
        console.log("userJson")
    })
    let result = await response.json();
  alert(result.message);

  let user = {
    name: 'John',
    surname: 'Smith'
  };
  
  let response = fetch('http://localhost:5678/api/users/login')
    .then (response => response.json)
    .then (result => {
        alert(result.message);
    })
    , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  });
  
  
/*
let response = await fetch(url, options); // se résout avec des en-têtes de réponse
let result = await response.json(); // lit le corps en tant que JSON
Ou, sans await :

fetch(url, options)
  .then(response => response.json())
  .then(result => /* process result */
  

/*fetch ()
    .then (responseUser => responseUser.json)
    .then ( reponseUserJson => {
        if (successResponse.status != 200) {
            return alert("Email ou mot de passe invalide(s)");
          } else {
            return successResponse.json();
          }
        },
        failResponse => {
            return alert("Email ou mot de passe invalide(s)");
        }
    )
    
*/
/*   async function getUsers(names) {
        let jobs = [];
      
        for(let name of names) {
          let job = fetch(`https://api.github.com/users/${name}`).then(
            successResponse => {
              if (successResponse.status != 200) {
                return alert("Email ou mot de passe invalide(s)");
              } else {
                return successResponse.json();
              }
            },
            failResponse => {
                return alert("Email ou mot de passe invalide(s)");
            }
          );
          jobs.push(job);
        }
      
        let results = await Promise.all(jobs);
      
        return results;
      }
  let response = await fetch('/article/fetch/post/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  });
  
  let result = await response.json();
  alert(result.message);

const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username;
    const password = loginForm.password;

    if (username === "user" && password === "web_dev") {
        alert("You have successfully logged in.");
        location.reload();
    } else {
        
    }
})
*/
