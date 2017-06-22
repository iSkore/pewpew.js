'use strict';

// Might impliment this for
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy

const
    MMath = require( './MMath' );

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

        this.getterX = args[ 0 ].getterX || ( () => {} );
        this.setterX = args[ 0 ].setterX || ( () => {} );

        this.getterY = args[ 0 ].getterY || ( () => {} );
        this.setterY = args[ 0 ].setterY || ( () => {} );
    }

    init( x, y )
    {
        this._x = x = +x;
        this._y = y = +y;

        this.x = {
            get () {
                this.getterX( this._x );
                return this._x;
            },
            set ( v ) {
                this.setterX( v );
                this._x = v;
            }
        };

        this.y = {
            get () {
                this.getterY( this._y );
                return this._y;
            },
            set ( v ) {
                this.setterY( v );
                this._y = v;
            }
        };
    }

    distance( p )
    {
        if( !( p instanceof Vector2D ) )
            this.error( 'Argument Error - Vector2D.distance must pass an instanceof Vector2D' );

        return this.MDistance( this.x, p.x, this.y, p.y );
    }

    magnitude()
    {
        return this.MMagnitude( this.x, this.y );
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

    set( x, y )
    {
        this.x = x;
        this.y = y;
        return this;
    }

    toString()
    {
        return `Vector2D( ${this.x}, ${this.y} )`;
    }

    error( arg )
    {
        throw `[Vector2D] ${args}`;
    }
}

Vector2D.HIGH_PRECISION = MMath.HIGH_PRECISION;
Vector2D.MID_PRECISION  = MMath.MID_PRECISION;
Vector2D.LOW_PRECISION  = MMath.LOW_PRECISION;

Vector2D.one   = new Vector2D( 1, 1 );
Vector2D.up    = new Vector2D( 0, 1 );
Vector2D.down  = new Vector2D( 0, -1 );
Vector2D.left  = new Vector2D( -1, 0 );
Vector2D.right = new Vector2D( 1, 0 );
Vector2D.zero  = new Vector2D( 0, 0 );

module.exports = Vector2D;
