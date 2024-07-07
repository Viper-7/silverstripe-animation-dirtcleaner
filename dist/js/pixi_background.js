let app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight, backgroundColor: 0xFFFFFF });

let container = document.createElement('div');
container.id = 'pixi-container';
container.style.position = 'fixed';
container.style.top = '0';
container.style.left = '0';
container.style.width = '100%';
container.style.height = '100%';
container.style.zIndex = '-1';

document.body.appendChild(container);
container.appendChild(app.view);

let dirtSpots = [];
let pressureWasher;
let direction = 'right';
let row = 0;
var size = $CharacterSize;

function createDirtSpot() {
    let graphics = new PIXI.Graphics();
    let r = Math.floor(Math.random() * 56 + 100);  // Red component between 100 and 155
    let g = Math.floor(Math.random() * 56 + 50);   // Green component between 50 and 105
    let b = Math.floor(Math.random() * 26);        // Blue component between 0 and 25
    let color = (r << 16) + (g << 8) + b;  // Convert to hex
    let opacity = Math.random() * 0.8 + 0.2;  // Varying opacity
    graphics.beginFill(color, opacity);
    graphics.drawCircle(0, 0, Math.random() * $MaxDirtSize);  // Smaller circles
    graphics.endFill();
    graphics.x = Math.random() < 0.5 ? Math.random() * 0.1 * app.screen.width : (0.9 + (Math.random() * 0.1)) * app.screen.width;
    graphics.y = Math.random() * app.screen.height;
    app.stage.addChild(graphics);
    dirtSpots.push(graphics);
}

function createPressureWasher() {
    let texture = PIXI.Texture.from('$Sprite');
    let sprite = new PIXI.Sprite(texture);
    sprite.width = $CharacterSize;  // Adjust the size as needed
    sprite.height = $CharacterSize;  // Adjust the size as needed
    sprite.x = 0;
    sprite.y = 0;
    app.stage.addChild(sprite);
    return sprite;
}

for (let i = 0; i < $InitialDirt; i++) {
    createDirtSpot();
}

pressureWasher = createPressureWasher();

app.ticker.add(() => {
    // Move pressure washer in a zigzag pattern
    if (direction === 'right') {
        pressureWasher.x += $CharacterSpeed;
        if (pressureWasher.x > app.screen.width) {
            direction = 'left';
            if($FlipDirections) {
                pressureWasher.x += 100;
                pressureWasher.scale.x = -1;
            }
            row += $CharacterSize;
        }
    } else {
        pressureWasher.x -= $CharacterSpeed;
        if (pressureWasher.x < ($CharacterSize*-1)) {
            direction = 'right';
            row += $CharacterSize;
            pressureWasher.scale.x = 1;
        }
    }

    pressureWasher.y = row;
    if (pressureWasher.y > app.screen.height) {
        row = 0;
    }

    // Clean dirt spots
    dirtSpots.forEach((dirt, index) => {
        if(!$FlipDirections && direction != 'right') offset = $CharacterSize;
        else offset = 0;
        if (Math.abs(offset + pressureWasher.x - dirt.x) < ($CharacterSize/2) && Math.abs(($CharacterSize/2) + pressureWasher.y - dirt.y) < ($CharacterSize/2)) {
            app.stage.removeChild(dirt);
            dirtSpots.splice(index, 1);
        }
    });

    // Add new dirt spots
    if (Math.random() < ($DirtyRate / 100)) {  // Increase the probability to control the rate of new dirt spots
        createDirtSpot();
    }
});

window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});
