'use strict';

// TODO get offset of percentage to pixel per window width

// var redraw = function() {  // this function redraws the c object every frame (FPS)
//     ctx.clearRect( 0, 0, canvas.width, canvas.height ); // clear the canvas
//     ctx.beginPath();  //start the path
//     ctx.arc( c.x, c.y, c.r, 0, Math.PI * 2 ); //draw the circle
//     ctx.closePath(); //close the circle path
//     ctx.fillStyle = 'rgba(250,0,0,0.4)';
//     ctx.fill(); //fill the circle
//     requestAnimationFrame( redraw );//schedule this function to be run on the next frame
// };

// function move() {  // this function modifies the object
//     var decimal = Math.random(); // this returns a float between 0.0 and 1.0
//     c.x = decimal * canvas.width; // mulitple the random decimal by the canvas width and height to get a random pixel in the canvas;
//     c.y = decimal * canvas.height;
// }
//
// redraw(); //start the animation

// setInterval( move, 1000 );

class Board
{
    constructor( canvas )
    {
        this.canvas = canvas;
        this.ctx    = canvas.getContext( '2d' );

        this.objects = {};
    }

    addObject( obj )
    {
        this.objects[ obj.name ] = obj;
    }

    update()
    {
        const
            canvas  = this.canvas,
            ctx     = this.ctx,
            objects = this.objects;

        const render = () => {
            ctx.clearRect( 0, 0, canvas.width, canvas.height );

            Object.keys( objects ).map( c => {
                c = objects[ c ];
                ctx.beginPath();
                ctx.arc( c.x, c.y, c.radius, c.startAngle, c.endAngle );
                ctx.closePath();
                ctx.fillStyle = c.color;
                ctx.fill();
            } );
        };

        requestAnimationFrame( render );
    }
}

class Movement
{
    constructor( x, y )
    {
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

    moveX( x )
    {
        let xo  = parseInt( this.x, 10 ),
            dx = xo + x;

        this.x = ( xo - dx ).toFixed( 0 );
    }

    translateX( i )
    {
        if( this.left || this.right ) {
            this.moveX( i );
            setTimeout( this.translateX( i ), this.deltaTick );
        }
    }
}

class Player extends Movement
{
    constructor( x, y )
    {
        super( x, y );

        this.name = 'Player';
        this.radius = 5;
        this.startAngle = 0;
        this.endAngle = Math.PI * 2;
        this.anticlockwise = false;
        this.color = 'rgba( 250, 0, 0, 0.4 )';
    }
}




const
    board  = new Board( document.getElementById( 'board' ) ),
    player = new Player();

board.update();

board.addObject( player );

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


const
    boundX = ( x, left = true ) => ( x > 1 && left ) ? ( x - 1.5 ) : ( x < 97 && !left ) ? ( x + 1.5 ) : x,
    boundY = ( y, up = true ) => ( y > 1 && up ) ? ( y - 1.5 ) : ( y < 97 && !up ) ? ( y + 1.5 ) : y;

// ctx.translate(70,70);
// var can = document.getElementById('board');
// can.height = 1000; can.width = 1300;
// var ctx = can.getContext('2d');
// var x = 10, y = 100;
// ctx.fillStyle = "black";
// ctx.fillRect(700, 100, 100, 100);