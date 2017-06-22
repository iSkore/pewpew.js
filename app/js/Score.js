'use strict';

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
    _points = 0,
    score   = {
        get points() {
            return _points || 0;
        },
        set points( v ) {
            scoreText.text = ''+v;
            _points = v;
        }
    };

window.score = score;
