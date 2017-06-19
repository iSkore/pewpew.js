'use strict';

/*
HELP:
    https://github.com/kittykatattack/learningPixi

ASCII CODES:
    http://help.adobe.com/en_US/AS2LCR/Flash_10.0/help.html?content=00000520.html
*/

// Ladies and gents,
// I know you're NEVER suppose to do this
// I don't care untill ES2018 comes out.
Array.prototype.remove = function( from, to ) {
    const rest = this.slice( ( to || from ) + 1 || this.length );
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply( this, rest );
};

/**
 * CREATE THE RENDER AREA
 */
const
    PIXI           = require( 'pixi.js' ),
    KeyboardAction = require( './KeyboardAction' ),
    view           = document.getElementById( 'board' ),
    SCREEN = window.SCREEN = {
        WIDTH: view.offsetWidth,
        HEIGHT: view.offsetHeight
    },
    _ =  window._  = new PIXI.Application( {
        backgroundColor: 0x222222,
        antialias: false,
        transparent: false,
        resolution: 1,
        width: SCREEN.WIDTH,
        height: SCREEN.HEIGHT,
        view
    } );

_.autoResize = true;
_.stage.interactive = true;

document.body.appendChild( _.view );



/**
 * CREATE THE PLAYER
 */
const
    P = window.P = {
        Graphic: new PIXI.Graphics(),
        fillColor: 0xFF00BB,
        fillOpacity: 0.25,
        lineWidth: 1,
        lineColor: 0xFF00FF,
        _CanShoot: true,
        get CanShoot() {
            return P._CanShoot;
        },
        set CanShoot( v ) {
            P._CanShoot = v;

            setTimeout(
                () => P._CanShoot = true,
                100
            );
        },
        _Shooting: false,
        get Shooting() {
            return P._Shooting;
        },
        set Shooting( v ) {
            if( v && P.CanShoot ) {
                P.CanShoot = false;
                shoot();
            }

            P._Shooting = v;
        },
        WIDTH: 16,
        HEIGHT: 24
    },
    SHOTS = [];

P.WIDTH_OFFSET = P.WIDTH / 4;

P.Movement = {
    _isMoving: false,
    get isMoving() {
        if( P.Movement.UP || P.Movement.DOWN || P.Movement.RIGHT || P.Movement.LEFT )
            P.Movement._isMoving = true;
        return P.Movement._isMoving;
    },
    set isMoving( v ) {
        if( !v )
            P.Movement.UP = P.Movement.DOWN = P.Movement.RIGHT = P.Movement.LEFT = false;
        P.Movement._isMoving = v;
    },
    UP: false,
    DOWN: false,
    RIGHT: false,
    LEFT: false,
    Speed: 10
};

P.Transform = {
    X: ( SCREEN.WIDTH * 0.5 ) - ( P.WIDTH * 0.5 ),
    Y: ( SCREEN.HEIGHT * 0.95 ) - P.HEIGHT
};

P.Render = () => {
    SCREEN.WIDTH  = view.offsetWidth;
    SCREEN.HEIGHT = view.offsetHeight;

    P.Graphic.clear();
    P.Graphic.beginFill( P.fillColor, P.fillOpacity );
    P.Graphic.lineStyle( 1, 0xFF00FF, 1 );
    P.Graphic.moveTo( P.Transform.X, P.Transform.Y );
    P.Graphic.lineTo( P.Transform.X + ( P.WIDTH * 0.5 ), P.Transform.Y - P.HEIGHT );
    P.Graphic.lineTo( P.Transform.X + P.WIDTH, P.Transform.Y );
    P.Graphic.lineTo( P.Transform.X, P.Transform.Y );
};

_.stage.addChild( P.Graphic );
P.Render();



/**
 * PROJECTILE AREA
 */
const shot = new PIXI.Graphics();
shot.beginFill( P.fillColor, P.fillOpacity );
shot.lineStyle( 1, 0xFF00FF, 1 );
shot.drawEllipse( 0, 0, 2, 4 )
shot.endFill();
shot.speed = 10;

function shoot() {
    P.CanShoot = false;
    const a = shot.clone();
    a.x = P.Transform.X + ( P.WIDTH / 2 );
    a.y = P.Transform.Y - P.HEIGHT;
    SHOTS.push( a );
    _.stage.addChild( a );
}

function deleteShot( i ) {
    _.stage.removeChild( SHOTS[ i ] );
    SHOTS.remove( i );
}

_.ticker.add( delta => {
    for( let i = 0; i < SHOTS.length; ++i ) {
        SHOTS[ i ].y -= shot.speed * delta;

        if( SHOTS[ i ].y < 0 ) {
            deleteShot( i );
        }
    }
} );



/**
 * INPUT AREA
 */
const Input = {
    W: new KeyboardAction( 87 ),
    A: new KeyboardAction( 65 ),
    S: new KeyboardAction( 83 ),
    D: new KeyboardAction( 68 ),
    SPACE: new KeyboardAction( 32 )
}

Input.W.press       = () => P.Movement.UP    = true;
Input.W.release     = () => P.Movement.UP    = false;

Input.S.press       = () => P.Movement.DOWN  = true;
Input.S.release     = () => P.Movement.DOWN  = false;

Input.D.press       = () => P.Movement.RIGHT = true;
Input.D.release     = () => P.Movement.RIGHT = false;

Input.A.press       = () => P.Movement.LEFT  = true;
Input.A.release     = () => P.Movement.LEFT  = false;

let _SPACE = false;
Input.SPACE.press   = () => _SPACE = true;
Input.SPACE.release = () => _SPACE = false;

_.ticker.add( delta => {
    P.Shooting = _SPACE;

    if( P.Movement.RIGHT && P.Transform.X < SCREEN.WIDTH - P.WIDTH - P.WIDTH_OFFSET )
        P.Transform.X += P.Movement.Speed * delta;

    if( P.Movement.LEFT && P.Transform.X > P.WIDTH_OFFSET )
        P.Transform.X -= P.Movement.Speed * delta;

    // Sanity check
    if( P.Transform.X < P.WIDTH_OFFSET )
        P.Transform.X = P.WIDTH_OFFSET;

    if( P.Transform.X > SCREEN.WIDTH )
        P.Transform.X = SCREEN.WIDTH - P.WIDTH_OFFSET;

    P.Render();
} );
