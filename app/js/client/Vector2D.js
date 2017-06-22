'use strict';

const
    MMath = require( './MMath' );

const util = require( 'util' );

class Vector2D extends MMath
{
    constructor( ...args )
    {
        const precision = args[ 0 ].precision || args[ 2 ] || Vector2D.HIGH_PRECISION;
        super( precision );
        this.precision = precision;

        if( args.length === 1 && !Array.isArray( args[ 0 ] ) )
            this.init( args[ 0 ].x || args[ 0 ].X, args[ 0 ].y || args[ 0 ].Y );
        else if( Array.isArray( args ) )
            this.init( args[ 0 ], args[ 1 ] );
        else
            this.error( 'Argument Error - must specify X and Y values' );
    }

    init( x, y )
    {
        this.x = x = +x;
        this.y = y = +y;
    }

    distance( p )
    {
        if( !( p instanceof Vector2D ) )
            this.error( 'Argument Error - Vector2D.distance must pass an instanceof Vector2D' );

        return this.MDistance( this.x, p.x, this.y, p.y );
    }

    error( arg )
    {
        throw `[Vector2D] ${args}`;
    }

    getX()
    {
        return this.x;
    }

    setX( x )
    {
        this.x = x;
    }

    getY()
    {
        return this.y;
    }

    setY( y )
    {
        this.y = y;
    }

    __noSuchMethod__( ) {
        console.log( 'ok' );
    }
}

var handler = {
    get: function(target, name) {
        return name in target ?
            target[name] :
            37;
    }
};


Vector2D.constructor.apply( () => {
    new Proxy( Vector2D, console.log );
} );

Vector2D.HIGH_PRECISION = MMath.HIGH_PRECISION;
Vector2D.MID_PRECISION  = MMath.MID_PRECISION;
Vector2D.LOW_PRECISION  = MMath.LOW_PRECISION;

const
    p1 = new Vector2D( 10, 10, Vector2D.HIGH_PRECISION ),
    p2 = new Vector2D( 20, 20 );

// Hmm...
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy

console.log( p1 + p1 );
//
// console.log( util.inspect( p1 , { depth: null, showHidden: true } ) );
