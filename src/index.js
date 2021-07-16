console.log('Webpack is working!');

const MovingObject = require('./moving_object')
window.MovingObject = MovingObject;

window.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
})