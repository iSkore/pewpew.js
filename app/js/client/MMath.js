'use strict';

class MMath
{
    constructor( precision )
    {
        if( precision === MMath.LOW_PRECISION ) {
            this.MRoot      = this.l_root;
            this.MDistance  = this.l_distance;
            this.MMagnitude = this.l_magnitude;
            this.MSqrMagnitude = this.l_sqrMagnitude;
        } else if( precision === MMath.MID_PRECISION ) {
            this.MRoot      = this.m_root;
            this.MDistance  = this.m_distance;
            this.MMagnitude = this.m_magnitude;
            this.MSqrMagnitude = this.m_sqrMagnitude;
        } else {
            this.MRoot      = this.h_root;
            this.MDistance  = this.h_distance;
            this.MMagnitude = this.h_magnitude;
            this.MSqrMagnitude = this.h_sqrMagnitude;
        }
    }

    h_root( n ) // 0.086ms
    {
        return Math.sqrt( n );
    }

    m_root( n ) // 0.053ms
    {
        let a = 0, o = n;
        while( a <= o ) {
             const mid = ( ( a + o ) / 2 );
             if( mid * mid > n ) {
                 o = mid - 1;
             } else {
                 a = mid + 1;
             }
        }

        a = n = null;

        return o;
    }

    l_root( n ) // 0.022ms
    {
        let m   = 0,
            bit = 1 << 30; // JS is a 32-bit language. Layout 31 bits and a sign

        while( bit > n ) bit >>= 2; // scoot the powers till we find the closest

        while( bit != 0 ) {
            if( n >= m + bit ) {
                n -= m + bit;
                m = ( m >> 1 ) + bit;
            } else {
                m >>= 1;
            }

            bit >>= 2;
        }

        m = bit = null;
        return n;
    }

    h_distance( x1, x2, y1, y2 )
    {
        return Math.hypot( x2 - x1, y2 - y1 );
    }

    m_distance( x1, x2, y1, y2 )
    {
        const
            x = x2 - x1,
            y = y2 - y1;

        return this.m_root( ( x ** 2 ) + ( y ** 2 ) );
    }

    l_distance( x1, x2, y1, y2 )
    {
        const
            x = x2 - x1,
            y = y2 - y1;

        return this.l_root( ( x ** 2 ) + ( y ** 2 ) );
    }

    h_magnitude( x, y )
    {
        return this.h_root( ( x ** 2 ) + ( y ** 2 ) );
    }

    m_magnitude( x, y )
    {
        return this.m_root( ( x ** 2 ) + ( y ** 2 ) );
    }

    l_magnitude( x, y )
    {
        return this.l_root( ( x ** 2 ) + ( y ** 2 ) );
    }
}

MMath.HIGH_PRECISION = 3;
MMath.MID_PRECISION  = 2;
MMath.LOW_PRECISION  = 1;

module.exports = MMath;
