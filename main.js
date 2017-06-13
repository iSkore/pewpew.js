'use strict';

// https://github.com/kittykatattack/learningPixi

const
    _ = new PIXI.Application( 800, 600, {
        backgroundColor: 0x222222,
        antialias: false,
        transparent: false,
        resolution: 1,
        view: document.getElementById( 'board' )
    } );

_.autoResize = true;
_.stage.interactive = true;

document.body.appendChild( _.view );


const
    P = {
        graphic: new PIXI.Graphics(),
        fillColor: 0xFF00BB,
        fillOpacity: 0.25,
        lineWidth: 1,
        lineColor: 0xFF00FF,
        WIDTH: 16,
        HEIGHT: 24
    };

P.Transform = {
    X: ( _.screen.width * 0.5 ) - ( P.WIDTH * 0.5 ),
    Y: ( _.screen.height * 0.95 ) - P.HEIGHT
};

P.Render = () => {
    P.graphic.clear();
    P.graphic.beginFill( P.fillColor, P.fillOpacity );
    P.graphic.lineStyle( 1, 0xFF00FF, 1 );
    P.graphic.moveTo( P.Transform.X, P.Transform.Y );
    P.graphic.lineTo( P.Transform.X + ( P.WIDTH * 0.5 ), P.Transform.Y - P.HEIGHT );
    P.graphic.lineTo( P.Transform.X + P.WIDTH, P.Transform.Y );
    P.graphic.lineTo( P.Transform.X, P.Transform.Y );
};

_.stage.addChild( P.graphic );


_.ticker.add( delta => {
//     // just for fun, let's rotate mr rabbit a little
//     // delta is 1 if running at 100% performance
//     // creates frame-independent tranformation
    P.Transform.X += 0.1 * delta;
    // P.Render();
} );

P.Render();
