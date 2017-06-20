'use strict';

class HIGH_Math
{
    constructor() {}

    root( n )
    {
        return Math.sqrt( n );
    }
}

class MID_Math
{
    constructor() {}

    root( n )
    {
        let a = 0, o = n;
        while( a <= o )
        {
             const mid = ( ( a + o ) / 2 );
             if( mid * mid > n )
                o = mid - 1;
             else
                a = mid + 1;
        }

        return o;
    }
}

class LOW_Math
{
    constructor() {}

    root( n )
    {
        return n & ( n - 1 );
    }
}

class Vector2D
{
    constructor( ...args )
    {
        if( args.length === 1 && !Array.isArray( args[ 0 ] ) )
            this.init(
                args[ 0 ].x || args[ 0 ].X,
                args[ 0 ].y, args[ 0 ].Y,
                args[ 0 ].precision || Vector2D.HIGH_PRECISION
            );
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

    distance( point )
    {
        if( !( point instanceof Vector2D ) )
            error( 'Argument Error - Vector2D.distance must pass an instanceof Vector2D' );


    }

    error( arg )
    {
        throw `[Vector2D] ${args}`;
    }
}

Vector2D.HIGH_PRECISION = 2;
Vector2D.MID_PRECISION  = 1;
Vector2D.LOW_PRECISION  = 0;

const
    point1 = new Vector2D( 10, 10 ),
    point2 = new Vector2D( 20, 20 );

console.log( point1.distance( point2 ) );
console.log( point1.root( 12 ) );
console.log( new LOW_Math().root( 12 ) );
