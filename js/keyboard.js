'use strict';

class KeyboardAction
{
    constructor( code, onPress, onRelease )
    {
        this.code = code;
        this.isDown = false;
        this.isUp = true;
        this.press = onPress || ( () => {} );
        this.release = onRelease || ( () => {} );

        this.init();
    }

    init()
    {
        window.addEventListener(
            'keydown', this.onPressed.bind( this ), false
        );

        window.addEventListener(
            'keyup', this.onReleased.bind( this ), false
        );
    }

    onPressed( e )
    {
        e.preventDefault();

        if( e.keyCode === this.code ) {
            if( this.isUp && this.press )
                this.press();
            this.isDown = true;
            this.isUp = false;
        }
    }

    onReleased( e )
    {
        e.preventDefault();

        if( e.keyCode === this.code ) {
            if( this.isDown && this.release )
                this.release();
            this.isDown = false;
            this.isUp = true;
        }
    }
}
