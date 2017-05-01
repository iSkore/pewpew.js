'use strict';

// TODO get offset of percentage to pixel per window width


class Board
{
    constructor( canvas )
    {
        this.canvas = canvas;
        this.ctx    = canvas.getContext( '2d' );

        this.objects = {};

        this.init();
    }

    init()
    {
        this.canvas.width  = this.width  = Board.width;
        this.canvas.height = this.height = Board.height;
    }

    addObject( obj )
    {
        this.objects[ obj.name ] = obj;
    }

    clear()
    {
        this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
    }

    render()
    {
        Object.keys( this.objects ).map( c => {
            c = this.objects[ c ];
            this.ctx.beginPath();
            this.ctx.moveTo( c.x, c.y );

            if( c.isCircle ) {
                this.ctx.arc( c.x, c.y, c.radius, c.startAngle, c.endAngle );
            } else if( c.isTriangle ) {
                this.ctx.lineTo( c.x + 15, c.y + 50 );
                this.ctx.lineTo( c.x - 15, c.y + 50 );
            }

            this.ctx.closePath();
            this.ctx.fillStyle = c.color;
            this.ctx.fill();

            this.move( c );
        } );
    }

    move( obj )
    {
        if( obj.left )
            obj.x -= obj.speed;
        if( obj.right )
            obj.x += obj.speed;
        if( obj.up )
            obj.y -= obj.speed;
        if( obj.down )
            obj.y += obj.speed;
    }

    update()
    {
        const update = () => {
            this.clear();
            this.render();
            requestAnimationFrame( update );
        };

        update();
    }
}

Board.width  = window.innerWidth;
Board.height = window.innerHeight;


class Movement
{
    constructor( x, y )
    {
        this._x = x;
        this._y = y;

        Object.defineProperty( this, 'x', {
            get: () => {
                return this._x;
            },
            set: x => {
                this._x = this.clamp( x, 0, Board.width );
            }
        } );

        const ymargin = Board.height / 25;

        Object.defineProperty( this, 'y', {
            get: () => {
                return this._y;
            },
            set: y => {
                this._y = this.clamp( y, ymargin, Board.height - ymargin );
            }
        } );

        this.left  = false;
        this.right = false;
        this.up    = false;
        this.down  = false;
    }

    clamp( num, min, max )
    {
        return num <= min ? min : num >= max ? max : num;
    }
}

class Player extends Movement
{
    constructor( x, y )
    {
        super( x, y );

        this.name = 'Player';
        this.speed = 5;

        this.isCircle = false;
        // this.radius = 5;
        // this.startAngle = 0;
        // this.endAngle = Math.PI * 2;
        // this.anticlockwise = false;

        this.isTriangle = true;

        this.color = 'rgba( 250, 0, 0, 0.4 )';

        // ctx.beginPath();
        // ctx.moveTo(x,y);
        // ctx.lineTo(x+15,y+50);
        // ctx.lineTo(x-15,y+50);
        // ctx.fill();
    }
}


const
    board  = new Board( document.getElementById( 'board' ) ),
    player = new Player( Board.width / 2, Board.height - ( Board.height / 10 ) );

board.update();
board.addObject( player );

console.log( board );

function keydown( e ) {
    if( e.key === 'a' )
        player.left = true;
    else if( e.key === 'd' )
        player.right = true;
    else if( e.key === 'w' )
        player.up = true;
    else if( e.key === 's' )
        player.down = true;
    else if( e.key === ' ' ) {}
}

function keyup( e ) {
    if( e.key === 'a' )
        player.left = false;
    else if( e.key === 'd' )
        player.right = false;
    else if( e.key === 'w' )
        player.up = false;
    else if( e.key === 's' )
        player.down = false;
    else if( e.key === ' ' ) {}
}

document.addEventListener( 'keydown', keydown, false );
document.addEventListener( 'keyup',   keyup,   false );


const
    boundX = ( x, left = true ) => ( x > 1 && left ) ? ( x - 1.5 ) : ( x < 97 && !left ) ? ( x + 1.5 ) : x,
    boundY = ( y, up = true ) => ( y > 1 && up ) ? ( y - 1.5 ) : ( y < 97 && !up ) ? ( y + 1.5 ) : y;

if (window.PointerEvent) {
    // Add Pointer Event Listener
    swipeFrontElement.addEventListener('pointerdown', this.handleGestureStart, true);
    swipeFrontElement.addEventListener('pointermove', this.handleGestureMove, true);
    swipeFrontElement.addEventListener('pointerup', this.handleGestureEnd, true);
    swipeFrontElement.addEventListener('pointercancel', this.handleGestureEnd, true);
} else {
    // Add Touch Listener
    swipeFrontElement.addEventListener('touchstart', this.handleGestureStart, true);
    swipeFrontElement.addEventListener('touchmove', this.handleGestureMove, true);
    swipeFrontElement.addEventListener('touchend', this.handleGestureEnd, true);
    swipeFrontElement.addEventListener('touchcancel', this.handleGestureEnd, true);

    // Add Mouse Listener
    swipeFrontElement.addEventListener('mousedown', this.handleGestureStart, true);
}