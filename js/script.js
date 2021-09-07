// let elem
// window.addEventListener('load', () => {

//     elem = document.getElementById('test')

//     elem.innerHTML = "Salut"
// })
let grille = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0],
    [0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0],
    [0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 1, 1, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 1, 1, 0],
    [0, 0, 0, 0, 2, 0, 2, 0, 0, 1, 0, 0, 2, 0, 2, 0, 0, 0, 0],
    [2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 2],
    [0, 0, 0, 0, 2, 0, 2, 0, 0, 1, 0, 0, 2, 0, 2, 0, 0, 0, 0],
    [0, 1, 1, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 1, 1, 0],
    [0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0],
    [0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0],
    [0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0],
    [0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // 0 = mur /-/ 1 = sol /-/ 2 = bonbon
]

let pacman = {
    x: 5,
    y: 2,
    direction: null
}

let score = 0
let bonbon = 0
let interval

let plateau //création variable (plateau) pour lier html et js
window.addEventListener('load', () => {
    plateau = document.getElementById('contain') // on utilise la variable (plateau) pour récupérer la div (contain) dans le js

    interval = setInterval(tourDeJeu, 300) // gère la fonction tourDeJeu et la réactualise toutes les 500ms (boucle while infinie)

    document.addEventListener("keyup", clavier) // pour ajouter comme event le fait de cliquer sur les flèches avec la fonction clavier
})

function afficheGrille() {
    plateau.innerHTML = "";
    bonbon = 0
    for (i = 0; i < grille.length; i++) {
        for (j = 0; j < grille[i].length; j++) {
            let monElem = document.createElement('div'); // on créé une variable (monElem)pour créer les éléments (createElement('div'))
            if (grille[i][j] == 0) {
                monElem.classList.add('mur')
            }
            if (grille[i][j] == 1) {
                monElem.classList.add('sol')
            }
            if (grille[i][j] == 2) {
                monElem.classList.add('bonbon')
                bonbon++
            }
            plateau.appendChild(monElem) // ajoute un élément html
            monElem.style.gridArea = (i + 1) + "/" + (j + 1);
        }
    }
}

function tourDeJeu() {
    afficheGrille();
    afficherScore();
    affichePacman();
    // afficheFantomes();
    if (pacman.direction != null) {
        deplacerPacman();
        // deplacerFantomes();
        gererCollision();
    }
    manger();
    gagner();
}

function affichePacman() {
    let monPacman = document.createElement('div'); // on créé la div
    monPacman.classList.add('pacman'); // on lui met la classe (pacman)
    monPacman.style.gridArea = pacman.y + "/" + pacman.x; // on le place sur la grille (coordonnées Y + "/" + X)
    plateau.appendChild(monPacman) // on ajoute la div au plateau
}

function deplacerPacman() {
    if (pacman.direction == 0) {
        pacman.x++;
    }
    if (pacman.direction == 1) {
        pacman.y++;
    }
    if (pacman.direction == 2) {
        pacman.x--;
    }
    if (pacman.direction == 3) {
        pacman.y--;
    }
    if (pacman.x < 0) {
        pacman.x = 19
    }
    if (pacman.x > 19) {
        pacman.x = 0
    }
}

function gererCollision() {
    if (grille[pacman.y - 1][pacman.x - 1] == 0) {
        if (pacman.direction == 0) {
            pacman.x--;
        }
        if (pacman.direction == 1) {
            pacman.y--;
        }
        if (pacman.direction == 2) {
            pacman.x++;
        }
        if (pacman.direction == 3) {
            pacman.y++;
        }
    }
}

function clavier(event) {
    if (event.key == "ArrowUp") {
        pacman.direction = 3
    }
    if (event.key == "ArrowRight") {
        pacman.direction = 0
    }
    if (event.key == "ArrowDown") {
        pacman.direction = 1
    }
    if (event.key == "ArrowLeft") {
        pacman.direction = 2
    }
}

function manger() {
    if (grille[pacman.y - 1][pacman.x - 1] == 2) {
        grille[pacman.y - 1][pacman.x - 1] = 1
        score += 10
        bonbon--
    }
}

function afficherScore() {
    document.getElementById("score").innerHTML = "Score = " + score;
    // récupère id de la div score       affiche 
}

function gagner() {
    if (bonbon == 0) {
        alert("Vous avez gagné")
        clearInterval(interval)
    }
}

let tabFantomes = [
    {
        x: 11,
        y: 9,
        direction: 0
    },
    {
        x: 11,
        y: 11,
        direction: 2
    },
    {
        x: 10,
        y: 10,
        direction: 3
    },
    {
        x: 12,
        y: 12,
        direction: 1
    }
]

function afficheFantomes() {

}