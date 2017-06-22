'use strict';

/*
 HELP:
 https://github.com/kittykatattack/learningPixi

 ASCII CODES:
 http://help.adobe.com/en_US/AS2LCR/Flash_10.0/help.html?content=00000520.html
 */

/**
 * On screen score
 */
const
    storeStyle     = new PIXI.TextStyle( {
        fontFamily: 'Arial',
        fontSize: 32,
        fill: 'white'
    } ),
    scoreText      = new PIXI.Text( '0', storeStyle );

scoreText.x = 10;
scoreText.y = 10;
_.stage.addChild( scoreText );

let
    score  = window.score  = {
        _score: 0,
        get points() {
            return score._score || 0;
        },
        set points( v ) {
            scoreText.text = ''+v;
            score._score = v;
        }
    };

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
    SHOTS   = [],
    ENEMIES = [];

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
 * Enemy rendering
 * We are going to have the shots track the enemies because that is
 * few to many as
 */
const enemy = window.enemy = new PIXI.Graphics();
enemy.beginFill( P.fillColor, P.fillOpacity );
enemy.lineStyle( 1, 0xFF00FF, 1 );
enemy.drawEllipse( 100, 100, 20, 40 );
enemy.endFill();
_.stage.addChild( enemy );

ENEMIES.push( enemy );

/**
 * PROJECTILE AREA
 */
const _shot = new PIXI.Graphics();
_shot.beginFill( P.fillColor, P.fillOpacity );
_shot.lineStyle( 1, 0xFF00FF, 1 );
_shot.drawEllipse( 0, 0, 2, 4 )
_shot.endFill();
_shot.speed = 10;

function shoot() {
    P.CanShoot = false;
    const a = _shot.clone();
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
        SHOTS[ i ].y -= _shot.speed * delta;

        if( SHOTS[ i ].y < 0 ) {
            deleteShot( i );
        }
    }
} );



/**
 * KEYBOARD INPUT AREA
 */
const
    KeyboardInput = {
        W: new KeyboardAction( 87 ),
        A: new KeyboardAction( 65 ),
        S: new KeyboardAction( 83 ),
        D: new KeyboardAction( 68 ),
        SPACE: new KeyboardAction( 32 )
    };

let _SPACE = false;

KeyboardInput.W.press       = () => P.Movement.UP    = true;
KeyboardInput.W.release     = () => P.Movement.UP    = false;

KeyboardInput.S.press       = () => P.Movement.DOWN  = true;
KeyboardInput.S.release     = () => P.Movement.DOWN  = false;

KeyboardInput.D.press       = () => P.Movement.RIGHT = true;
KeyboardInput.D.release     = () => P.Movement.RIGHT = false;

KeyboardInput.A.press       = () => P.Movement.LEFT  = true;
KeyboardInput.A.release     = () => P.Movement.LEFT  = false;

KeyboardInput.SPACE.press   = () => _SPACE = true;
KeyboardInput.SPACE.release = () => _SPACE = false;



/**
 * TOUCH INPUT AREA
 */

if( !isMobile ) {
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
} );
