'use strict';

/**
 * CREATE THE PLAYER
 */

class Player
{
    constructor()
    {
        this.Graphic      = new PIXI.Graphics();
        this.fillColor    = 0xFF00BB;
        this.fillOpacity  = 0.25;
        this.lineWidth    = 1;
        this.lineColor    = 0xFF00FF;
        this._CanShoot    = true;
        this._Shooting    = false;
        this.WIDTH        = 16;
        this.HEIGHT       = 24;
        this.WIDTH_OFFSET = this.WIDTH / 4;
        this.PubSub       = {};

        this.Movement     = {
            _isMoving: false,
            get isMoving() {
                if( this.Movement.UP || this.Movement.DOWN || this.Movement.RIGHT || this.Movement.LEFT )
                    this.Movement._isMoving = true;
                return this.Movement._isMoving;
            },
            set isMoving( v ) {
                if( !v )
                    this.Movement.UP = this.Movement.DOWN = this.Movement.RIGHT = this.Movement.LEFT = false;
                this.Movement._isMoving = v;
            },
            UP: false,
            DOWN: false,
            RIGHT: false,
            LEFT: false,
            Speed: 10
        };

        this.Transform    = {
            X: ( SCREEN.WIDTH * 0.5 ) - ( this.WIDTH * 0.5 ),
            Y: ( SCREEN.HEIGHT * 0.95 ) - this.HEIGHT
        };

        Object.defineProperty( this, 'CanShoot', {
            get: () => this._CanShoot,
            set: v  => {
                this._CanShoot = v;

                setTimeout(
                    () => this._CanShoot = true,
                    100
                );
            }
        } );

        Object.defineProperty( this, 'Shooting', {
            get: () => this._Shooting,
            set: v  => {
                if( v && P.CanShoot ) {
                    this.CanShoot = false;
                    this.PubSub.shoot();
                }

                this._Shooting = v;
            }
        } );
    }

    subscribeEvent( name, action )
    {
        this.PubSub[ name ] = action || ( () => {} );
    }

    Render()
    {
        SCREEN.WIDTH  = view.offsetWidth;
        SCREEN.HEIGHT = view.offsetHeight;

        this.Graphic.clear();
        this.Graphic.beginFill( this.fillColor, this.fillOpacity );
        this.Graphic.lineStyle( 1, 0xFF00FF, 1 );
        this.Graphic.moveTo( this.Transform.X, this.Transform.Y );
        this.Graphic.lineTo( this.Transform.X + ( this.WIDTH * 0.5 ), this.Transform.Y - this.HEIGHT );
        this.Graphic.lineTo( this.Transform.X + this.WIDTH, this.Transform.Y );
        this.Graphic.lineTo( this.Transform.X, this.Transform.Y );
    }
}

module.exports = Player;
