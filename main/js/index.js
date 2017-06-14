'use strict';

/*
HELP:
    https://github.com/kittykatattack/learningPixi

ASCII CODES:
    http://help.adobe.com/en_US/AS2LCR/Flash_10.0/help.html?content=00000520.html
*/

const
    PIXI           = require( 'pixi.js' ),
    KeyboardAction = require( './KeyboardAction' ),
    _ =  window._  = new PIXI.Application( {
        backgroundColor: 0x222222,
        antialias: false,
        transparent: false,
        resolution: 1,
        view: document.getElementById( 'board' )
    } );

_.autoResize = true;
_.stage.interactive = true;

document.body.appendChild( _.view );

const
    P = window.P = {
        Graphic: new PIXI.Graphics(),
        fillColor: 0xFF00BB,
        fillOpacity: 0.25,
        lineWidth: 1,
        lineColor: 0xFF00FF,
        WIDTH: 16,
        HEIGHT: 24
    };

P.WIDTH_OFFSET = P.WIDTH / 4;

// window.P = P;

P.Movement = {
    _isMoving: false,
    get isMoving() {
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
    X: ( _.screen.width * 0.5 ) - ( P.WIDTH * 0.5 ),
    Y: ( _.screen.height * 0.95 ) - P.HEIGHT
};

P.Render = () => {
    P.Graphic.clear();
    P.Graphic.beginFill( P.fillColor, P.fillOpacity );
    P.Graphic.lineStyle( 1, 0xFF00FF, 1 );
    P.Graphic.moveTo( P.Transform.X, P.Transform.Y );
    P.Graphic.lineTo( P.Transform.X + ( P.WIDTH * 0.5 ), P.Transform.Y - P.HEIGHT );
    P.Graphic.lineTo( P.Transform.X + P.WIDTH, P.Transform.Y );
    P.Graphic.lineTo( P.Transform.X, P.Transform.Y );
};

_.stage.addChild( P.Graphic );


// Register Keyboard Commands
const Input = {
    W: new KeyboardAction( 87 ),
    A: new KeyboardAction( 65 ),
    S: new KeyboardAction( 83 ),
    D: new KeyboardAction( 68 ),
    SPACE: new KeyboardAction( 32 )
}

Input.W.press   = () => P.Movement.UP    = true;
Input.W.release = () => P.Movement.UP    = false;

Input.S.press   = () => P.Movement.DOWN  = true;
Input.S.release = () => P.Movement.DOWN  = false;

Input.D.press   = () => P.Movement.RIGHT = true;
Input.D.release = () => P.Movement.RIGHT = false;

Input.A.press   = () => P.Movement.LEFT  = true;
Input.A.release = () => P.Movement.LEFT  = false;

_.ticker.add( delta => {
    // lets deactivate UP & DOWN for now
    // if( P.Movement.UP )
    //     P.Transform.Y -= P.Movement.Speed * delta;
    //
    //if( P.Movement.DOWN )
    //    P.Transform.Y += P.Movement.Speed * delta;

    if( P.Movement.RIGHT && P.Transform.X < _.view.offsetWidth - P.WIDTH_OFFSET )
        P.Transform.X += P.Movement.Speed * delta;

    if( P.Movement.LEFT && P.Transform.X > P.WIDTH_OFFSET )
        P.Transform.X -= P.Movement.Speed * delta;

    // Sanity check
    if( P.Transform.X < P.WIDTH_OFFSET )
        P.Transform.X = P.WIDTH_OFFSET;

    if( P.Transform.X > _.view.offsetWidth )
        P.Transform.X = _.view.offsetWidth - P.WIDTH_OFFSET;

    P.Render();
} );

P.Render();
