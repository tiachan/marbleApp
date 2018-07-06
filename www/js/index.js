'use strict';

var canvas;
var context;
var bille;
var acceleration = {
    x : 1,
    y : 1
};

// Vérifie si on est dans l'environnement d'émulation Ripple
var IS_RIPPLE = window.parent && window.parent.ripple;

var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.startGame.bind(this), false);
    },

    startGame: function() {
        // Cette méthode "startGame" sera appelée lorsque l'événement "deviceready" aura été lancé
        canvas = document.getElementById('gamezone');
        context = canvas.getContext('2d');

        // Adapte la taille du canvas à la taille de l'écran
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Création de l'objet qui représentera notre bille de jeu
        bille = {
            x : 0,
            y : 0,
            image : document.getElementById('bille')
        };

        // Obtention des données de l'acceleromètre de l'appareil
        navigator.accelerometer.watchAcceleration(this.getAcceleration.bind(this), null, { frequency : 40 });

        requestAnimationFrame(this.animate.bind(this));
    },

    animate : function() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        bille.x += acceleration.x;
        bille.y += acceleration.y;

        // Si la bille déborde à droite de l'écran ...
        if (bille.x + bille.image.width > canvas.width) {
            acceleration.x *= -1;
            bille.x = canvas.width - bille.image.width; // repositionne la bille sur l'extrême droite
        }
        // ... ou à gauche
        else if (bille.x < 0) {
            acceleration.x *= -1;
            bille.x = 0; // repositionne la bille sur l'extrême gauche
        }
        // Si la bille déborde en bas de l'écran ...
        if (bille.y + bille.image.height > canvas.height) {
            acceleration.y *= -1;
            bille.y = canvas.height - bille.image.height; // repositionne la bille tout en bas
        }
        // ... ou en haut
        else if (bille.y < 0) {
            acceleration.y *= -1; // repositionne la bille tout en haut
            bille.y = 0;
        }

        // Dessiner la bille sur le canvas 
        context.drawImage(bille.image, bille.x, bille.y);

        requestAnimationFrame(this.animate.bind(this));
    },

    getAcceleration : function(acc) {
        var x = acc.x * -1;
        var y = acc.y;

        // Ripple n'est pas standard sur les valeurs renvoyées de l'acceleromètre.
        // Il inverse carrément x et y ... du coup, on multiplie par -1 pour ré-avoir qqch de cohérent
        if (IS_RIPPLE) {
            x *= -1;
            y *= -1;
        }

        acceleration.x += x;
        acceleration.y += y;
    }
};

app.initialize();