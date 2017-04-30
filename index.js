'use strict';

// TODO get offset of percentage to pixel per window width

class Movement
{
    constructor( obj, x, y ) {
        this.object = obj;

        this.x = x;
        this.y = y;

        this.deltaTick = 10;

        this._left = false;
        Object.defineProperty( this, 'left', {
            configurable: false,
            get: () => {
                return this._left;
            },
            set: l => {
                if( l )
                    this.translateX( -1 );
                this._left = l;
            }
        } );

        this._right = false;
        Object.defineProperty( this, 'right', {
            get: () => {
                return this._right;
            },
            set: r => {
                if( r )
                    this.translateX( 1 );
                else
                    this.translateX( 0 );
                this._right = r;
            }
        } );
    }

    css( element, property )
    {
        return window.getComputedStyle( element, null ).getPropertyValue( property );
    }

    moveX( x )
    {
        let left = parseInt( this.css( this.object, 'left' ), 10 ),
            dx   = left - x;
        this.object.style.left = ( left - dx ).toFixed( 0 ) + 'px';
    }

    // moveY( y )
    // {
    //     let top = parseInt( this.css( this.object, 'top' ), 10 ),
    //         dy  = top - y;
    //     this.object.style.top = ( top - dy ).toFixed( 0 ) + 'px';
    // }

    translateX( i )
    {
        const loop = x => {
            if( this.left || this.right ) {
                this.moveX( x );
                setTimeout( loop( x ), this.deltaTick );
            }
        };

        loop( i );
    }
}

class Player extends Movement
{
    constructor( playerObject )
    {
        super( 50, 10 );

        this.name = 'shooterjs';

        this.object = playerObject;
    }
}

const
    boundX = ( x, left = true ) => ( x > 1 && left ) ? ( x - 1.5 ) : ( x < 97 && !left ) ? ( x + 1.5 ) : x,
    boundY = ( y, up = true ) => ( y > 1 && up ) ? ( y - 1.5 ) : ( y < 97 && !up ) ? ( y + 1.5 ) : y;

const player = new Player( document.getElementById( 'player' ) );

function keydown( e ) {
    if( e.key === 'a' ) {
        player.left = true;
    } else if( e.key === 'd' ) {
        player.right = true;
    } else if( e.key === 'w' ) {
    } else if( e.key === 's' ) {
    } else if( e.key === ' ' ) {
    }
}

function keyup( e ) {
    if( e.key === 'a' ) {
        player.left = false;
    } else if( e.key === 'd' ) {
        player.right = false;
    } else if( e.key === 'w' ) {
    } else if( e.key === 's' ) {
    } else if( e.key === ' ' ) {
    }
}

document.addEventListener( 'keydown', keydown, false );
document.addEventListener( 'keyup',   keyup,   false );