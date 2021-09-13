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

    interval = setInterval(tourDeJeu, 400) // gère la fonction tourDeJeu et la réactualise toutes les 500ms (boucle while infinie)

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
    afficheFantomes();
    if (pacman.direction != null) {
        deplacerPacman();
        deplacerFantomes();
        gererCollision();
        collisionFantomes();
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
    if (pacman.y < 0) {
        pacman.y = 22
    }
    if (pacman.y > 22) {
        pacman.y = 0
    }
}

function gererCollision() {
    if (grille[pacman.y - 1][pacman.x - 1] == 0) { // si pacman arrive sur un mur
        if (pacman.direction == 0) { // si le mur est à droite, il recule de 1 vers la gauche
            pacman.x--;
        }
        if (pacman.direction == 1) { // si le mur est en bas, il remonte de 1
            pacman.y--;
        }
        if (pacman.direction == 2) { // si le mur est à gauche, il recule de 1 vers la droite
            pacman.x++;
        }
        if (pacman.direction == 3) { // si le mur est en haut, il descend de 1
            pacman.y++;
        }
    }
    for (f = 0; f < tabFantomes.length; f++) {
        if (tabFantomes[f].y == pacman.y && tabFantomes[f].x == pacman.x) { // test de collision au déplacement de pacman
            alert("Perdu !")
            clearInterval(interval)
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
    if (grille[pacman.y - 1][pacman.x - 1] == 2) { // si pacman arrive sur une case 2 (bonbon)
        grille[pacman.y - 1][pacman.x - 1] = 1 // l'emplacement devient 1 (sol)
        score += 10 // le score augmente de 10 
        bonbon-- // et il y a un bonbon de moins 
    }
}

function afficherScore() {
    document.getElementById("score").innerHTML = "Score : " + score;
    // récupère id de la div score       affiche score
}

function gagner() {
    if (bonbon == 0) { // si le nombre de bonbon arrive à 0
        alert("Vous avez gagné")
        clearInterval(interval) // arrête le jeu 
    }
}

let tabFantomes = [
    { // bleu
        x: 9,
        y: 11,
        direction: 0
    },
    { // orange
        x: 10,
        y: 12,
        direction: 0
    },
    { // rouge
        x: 10,
        y: 10,
        direction: 0
    },
    { // vert
        x: 11,
        y: 11,
        direction: 0
    }
]

function afficheFantomes() {
    for (f = 0; f < tabFantomes.length; f++) { // boucle pour chaque fantôme dans le tableau
        let monFantome = document.createElement('div'); // créer div
        monFantome.classList.add('fantome' + f); // met la classe avec numéro de fantôme
        monFantome.style.gridArea = tabFantomes[f].y + "/" + tabFantomes[f].x; // place le fantôme selon coordonnées tableau de fantômes
        plateau.appendChild(monFantome) // ajout de la div sur le plateau 
    }
}

function deplacerFantomes() {
    for (f = 0; f < tabFantomes.length; f++) {
        tabFantomes[f].direction = Math.floor(Math.random() * 4);
        // Math.floor(Math.random() * 4); => random allant de 0 à 3
        if (tabFantomes[f].direction == 0) {
            tabFantomes[f].x++;
        }
        if (tabFantomes[f].direction == 1) {
            tabFantomes[f].y++;
        }
        if (tabFantomes[f].direction == 2) {
            tabFantomes[f].x--;
        }
        if (tabFantomes[f].direction == 3) {
            tabFantomes[f].y--;
        }
    }
}

function collisionFantomes() {
    for (f = 0; f < tabFantomes.length; f++) {
        if (grille[tabFantomes[f].y - 1][tabFantomes[f].x - 1] == 0) {
            if (tabFantomes[f].direction == 0) {
                tabFantomes[f].x--;
            }
            if (tabFantomes[f].direction == 1) {
                tabFantomes[f].y--;
            }
            if (tabFantomes[f].direction == 2) {
                tabFantomes[f].x++;
            }
            if (tabFantomes[f].direction == 3) {
                tabFantomes[f].y++;
            }
            if (tabFantomes[f].x < 0) {
                tabFantomes[f].x = 19
            }
            if (tabFantomes[f].x > 19) {
                tabFantomes[f].x = 0
            }
            if (tabFantomes[f].y < 0) {
                tabFantomes[f].y = 22
            }
            if (tabFantomes[f].y > 22) {
                tabFantomes[f].y = 0
            }
        }
        if (tabFantomes[f].y == pacman.y && tabFantomes[f].x == pacman.x) { // test de collision au déplacement des fantômes
            alert("Perdu !")
            clearInterval(interval)
        }
    }
}
