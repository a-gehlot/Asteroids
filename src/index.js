console.log('Webpack is working!');

const MovingObject = require('./moving_object')
const Asteroid = require('./asteroid')
const Game = require('./game')
const GameView = require('./game_view')


window.MovingObject = MovingObject;
window.Asteroid = Asteroid;
window.Game = Game;

window.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const optionsObject = {
        num_asteroids: 12
    }
    const gameView = new GameView(ctx, optionsObject);
    gameView.start(ctx);
})