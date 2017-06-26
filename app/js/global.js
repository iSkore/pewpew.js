'use strict';

// Ladies and gents,
// I know you're NEVER suppose to do this
// I don't care untill ES2018 comes out.
Array.prototype.remove = function( from, to ) {
    const rest = this.slice( ( to || from ) + 1 || this.length );
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply( this, rest );
};

const
    { version }    = require( '../../package.json' ),
    MMath          = require( './client/MMath' ),
    Vector2D       = require( './client/Vector2D' ),
    PIXI           = require( 'pixi.js' ),
    KeyboardAction = require( './client/KeyboardAction' ),
    view           = document.getElementById( 'board' ),
    SCREEN         = window.SCREEN = {
        WIDTH: view.offsetWidth,
        HEIGHT: view.offsetHeight
    },
    STATE          = {
        RUNNING: true
    },
    _              = new PIXI.Application( {
        backgroundColor: 0x222222,
        antialias: false,
        transparent: false,
        resolution: 1,
        width: SCREEN.WIDTH,
        height: SCREEN.HEIGHT,
        view
    } ),
    mobileCheck    = /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i,
    isMobile       = mobileCheck.test( navigator.userAgent ),
    vStyle         = new PIXI.TextStyle( {
        fontFamily: 'Arial',
        fontSize: 10,
        fill: 'white'
    } ),
    vText          = new PIXI.Text( `Pewpew.js v${version}`, vStyle ),
    padding        = 5;

_.autoResize = true;
_.stage.interactive = true;

document.body.appendChild( _.view );

vText.x = SCREEN.WIDTH - ( ( vText._text.length * vText._style._fontSize ) / 2 );
vText.y = SCREEN.HEIGHT - vText._style._fontSize - padding;
_.stage.addChild( vText );


window.MMath          = MMath;
window.Vector2D       = Vector2D;

window.PIXI           = PIXI;
window.KeyboardAction = KeyboardAction;
window.view           = view;
window.SCREEN         = SCREEN;
window.STATE          = STATE;
window._              = _;
window.isMobile       = isMobile;
