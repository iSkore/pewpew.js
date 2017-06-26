'use strict';

/*
 HELP:
 https://github.com/kittykatattack/learningPixi

 ASCII CODES:
 http://help.adobe.com/en_US/AS2LCR/Flash_10.0/help.html?content=00000520.html
 */

require( './Score' );

const
    Player = require( './Player' ),
    P       = new Player(),
    SHOTS   = window.SHOTS = [],
    ENEMIES = window.ENEMIES = [];

window.P    = P;

_.stage.addChild( P.Graphic );
P.Render();

/**
 * PROJECTILE AREA
 */
const
    _shot = new PIXI.Graphics();

_shot.beginFill( P.fillColor, P.fillOpacity );
_shot.lineStyle( 1, 0xFF00FF, 1 );
_shot.drawEllipse( 0, 0, 2, 4 )
_shot.endFill();
_shot.speed = 10;

function shoot() {
    const a = _shot.clone();
    a.x = P.Transform.X + ( P.WIDTH / 2 );
    a.y = P.Transform.Y - P.HEIGHT;

    a._delete = () => _.stage.removeChild( a );

    _.stage.addChild( a );
}

P.subscribeEvent( 'shoot', shoot );




/**
 * Enemy rendering
 * We are going to have the shots track the enemies because that is
 * few to many as
 */
const _enemy = new PIXI.Graphics();
_enemy.beginFill( 0xE74C3C, 0.5 );
_enemy.lineStyle( 1, 0xC0392B, 1 );
_enemy._width = 20;
_enemy._height = 40;
_enemy.drawEllipse( 0, 0, _enemy._width, _enemy._height );
_enemy.endFill();

function getRandom( min, max ) {
    return ~~( ( Math.random() * max ) + min );
}

function getRandomX() {
    return getRandom( _enemy._width, SCREEN.WIDTH - _enemy._width );
}

function SpawnEnemy() {
    const a = _enemy.clone();
    a.x = getRandomX();
    a.y = -( _enemy._height ) * 2;

    a.health = 3;
    a.speed = 5;
    a.movementType = 'FLAT';

    a.localDestroy = () => {
        _.stage.removeChild( a );
    };

    a.localHit = () => {
        a.health--;
        if( a.health < 0 )
            a.destroy();
    };

    a.localRender = delta => {
        a.y += a.speed * delta;

        if( a.y >= SCREEN.HEIGHT ) {
            a.localDestroy();
        }
    }

    a.lineWidth = a.health;
    a.index = ENEMIES.length;

    ENEMIES.push( a );
    _.stage.addChild( a );
}

function spawnHandle() {
    SpawnEnemy();
    spawner();
}

function spawner() {
    if( STATE.RUNNING ) {
        setTimeout(
            spawnHandle,
            getRandom( 500, 2000 )
        );
    }
}

spawnHandle();

setTimeout(
    console.log( ENEMIES ),
    2020
);

/**
 * INPUT REGION
 */

let _SPACE = false;

if( isMobile ) {
    /**
     * TOUCH INPUT AREA
     */

    console.log( 'Starting up for TouchInput' );

    const
        leftMovement  = new PIXI.Graphics(),
        rightMovement = new PIXI.Graphics(),
        hWIDTH        = SCREEN.WIDTH / 2,
        TOUCH         = {
            LEFT: 1,
            EXIT_LEFT: 2,
            RIGHT: 3,
            EXIT_RIGHT: 4
        };

    function t_move( direction ) {
        if( direction === TOUCH.LEFT ) {
            P.Movement.LEFT  = _SPACE = true;
            P.Movement.RIGHT = false;
        } else if( direction === TOUCH.RIGHT ) {
            P.Movement.RIGHT = _SPACE = true;
            P.Movement.LEFT  = false;
        } else if( direction === TOUCH.EXIT_LEFT ) {
            P.Movement.LEFT  = P.Movement.RIGHT = _SPACE = false;
        } else if( direction === TOUCH.EXIT_RIGHT ) {
            P.Movement.RIGHT = P.Movement.LEFT  = _SPACE = false;
        } else {
            P.Movement.RIGHT = P.Movement.LEFT  = _SPACE = false;
        }
    }

    leftMovement.beginFill( 0x000000, 0 );
    leftMovement.lineStyle( 0 );
    leftMovement.moveTo( 0, 0 );
    leftMovement.lineTo( hWIDTH, 0 );
    leftMovement.lineTo( hWIDTH, SCREEN.HEIGHT );
    leftMovement.lineTo( 0, SCREEN.HEIGHT );
    leftMovement.lineTo( 0, 0 );
    leftMovement.endFill();

    leftMovement.buttonMode  = true;
    leftMovement.interactive = true;

    leftMovement
        .on( 'touchstart', () => t_move( TOUCH.LEFT ) )
        .on( 'touchend', () => t_move( TOUCH.EXIT_LEFT ) )
        .on( 'touchendoutsite', () => t_move( TOUCH.EXIT_LEFT ) )
        .on( 'touchleave', () => t_move( TOUCH.EXIT_LEFT ) )
        .on( 'touchcancel', () => t_move( TOUCH.EXIT_LEFT ) );

    window.leftMovement = leftMovement;

    rightMovement.beginFill( 0x000000, 0 );
    rightMovement.lineStyle( 0 );
    rightMovement.moveTo( hWIDTH, 0 );
    rightMovement.lineTo( SCREEN.WIDTH, 0 );
    rightMovement.lineTo( SCREEN.WIDTH, SCREEN.HEIGHT );
    rightMovement.lineTo( hWIDTH, SCREEN.HEIGHT );
    rightMovement.lineTo( 0, 0 );
    rightMovement.endFill();

    rightMovement.buttonMode  = true;
    rightMovement.interactive = true;

    rightMovement
        .on( 'touchstart', () => t_move( TOUCH.RIGHT ) )
        .on( 'touchend', () => t_move( TOUCH.EXIT_RIGHT ) )
        .on( 'touchendoutsite', () => t_move( TOUCH.EXIT_RIGHT ) )
        .on( 'touchleave', () => t_move( TOUCH.EXIT_RIGHT ) )
        .on( 'touchcancel', () => t_move( TOUCH.EXIT_RIGHT ) );

    _.stage.addChild( leftMovement );
    _.stage.addChild( rightMovement );

} else {
    /**
     * KEYBOARD INPUT AREA
     */

    console.log( 'Starting up for KeyboardInput' );

    const
        KeyboardInput = {
            W: new KeyboardAction( 87 ),
            A: new KeyboardAction( 65 ),
            S: new KeyboardAction( 83 ),
            D: new KeyboardAction( 68 ),
            SPACE: new KeyboardAction( 32 )
        };

    // Not used yet - might not be implemented
    KeyboardInput.W.press       = () => P.Movement.UP    = true;
    KeyboardInput.W.release     = () => P.Movement.UP    = false;

    // Not used yet - might not be implemented
    KeyboardInput.S.press       = () => P.Movement.DOWN  = true;
    KeyboardInput.S.release     = () => P.Movement.DOWN  = false;

    KeyboardInput.D.press       = () => P.Movement.RIGHT = true;
    KeyboardInput.D.release     = () => P.Movement.RIGHT = false;

    KeyboardInput.A.press       = () => P.Movement.LEFT  = true;
    KeyboardInput.A.release     = () => P.Movement.LEFT  = false;

    KeyboardInput.SPACE.press   = () => _SPACE = true;
    KeyboardInput.SPACE.release = () => _SPACE = false;
}



/**
 * void UPDATE()
 */
_.ticker.add( delta => {
    P.Shooting = _SPACE;

    if( P.Movement.RIGHT && P.Transform.X < SCREEN.WIDTH - P.WIDTH - P.WIDTH_OFFSET ) {
        P.Transform.X += P.Movement.Speed * delta;
    }

    if( P.Movement.LEFT && P.Transform.X > P.WIDTH_OFFSET ) {
        P.Transform.X -= P.Movement.Speed * delta;
    }

    P.Render();

    let i;

    for( i = 0; i < SHOTS.length; ++i ) {
        SHOTS[ i ].y -= SHOTS[ i ].speed * delta;

        if( SHOTS[ i ].y < 0 ) {
            deleteShot( i );
        }
    }

    for( i = 0; i < _.stage.children.length; ++i ) {
        const localObj = _.stage.children[ i ];
        //if( localObj instanceof Player )
        //    localObj.localRender();
    }
} );
