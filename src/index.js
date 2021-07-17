console.log('Webpack is working!');

const MovingObject = require('./moving_object')
const Asteroid = require('./asteroid')
const Game = require('./game')

window.MovingObject = MovingObject;
window.Asteroid = Asteroid;
window.Game = Game;

window.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
})