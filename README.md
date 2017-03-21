Colorsmith
========

[![Latest NPM release][npm-badge]][npm-badge-url]
[![License][license-badge]][license-badge-url]

#### Color library based on Chroma-Complexion-Coloration (CCC) model ####

The aim of the project is to help create variations of base color and to fully exploit CCC model.

<b>Chroma</b>: If the chroma of red is 0, green is 1/3 and blue is 2/3 then the chroma for yellow is 1/6.

<b>Complexion</b>: The color code for yellow is #ffff00 which means it is twice brighter than red, #ff0000 or green #00ff00 alone.

<b>Surface complexion</b>: Even though yellow's color code is #ffff00 and red is only #ff0000, both have same surface complexion in the sense that they represent brightest color in their own directions as they lie on the surface of the color cube.

<b>Coloration</b>: It is analogous the the amount of color pigments. If diminished, the color is reduced to a shade of grey.

  <img src="https://raw.githubusercontent.com/ajyand/colorsmith/master/test/output.png"/>

## Installation

### Node.js

`colorsmith` is available on [npm](http://npmjs.org). To install it, type:

    $ npm install colorsmith

## Usage

Import the library in your code and you can do basic transformations

```js
const Cs = require('colorsmith')

var color = '#f07746'
var c = Cs.hex2surfCcc( color ) // Convert to surface CCC
var hexCode = Cs.surfCcc2hex( c ) // Convert back
hexCode == color // true

```

Alternatively, you can extract the CCC components and reconstruct the hex code with modified CCC components. The following example produces a yellow color with same surface complexion and coloration as the original color:
```js
var [ chroma, complexion, coloration ] = Cs.hex2surfCcc( color )
hexCode = Cs.surfCcc2hex( [ 1/6, complexion, coloration ] )
hexCode == color // false, we changed chroma to yellow tint
```

If you do not want to use surface complexion, the following functions produce a yellow color with same complexion and coloration as the original color but the complexion is not automatically adjusted according to the color:

```js
var [ chroma, complexion, coloration ] = Cs.hex2ccc( color )
hexCode = Cs.ccc2hex( [ 1/6, complexion, coloration ] )
hexCode == color // false, we changed chroma to yellow tint
```

Here's the summary of all available functions:

<b>NOTE: All values are in the range [0,1], that is 0 &le; x &le; 1.</b>

```js


[ chroma, complexion, coloration ] = Cs.hex2ccc( '#e48c15' )
hexCode = Cs.ccc2hex( [ chroma, complexion, coloration ] )

[ chroma, complexion, coloration ] = Cs.rgb2ccc( [ red, green, blue ] )
[ red, green, blue ] = Cs.ccc2rgb( [ chroma, complexion, coloration ] )

[ chroma, surfComplexion, coloration ] = Cs.hex2surfCcc( '#e48c15' )
hexCode = Cs.surfCcc2hex( [ chroma, surfComplexion, coloration ] )

[ chroma, surfComplexion, coloration ] = Cs.rgb2surfCcc( [ red, green, blue ] )
[ red, green, blue ] = Cs.surfCcc2rgb( [ chroma, surfComplexion, coloration ] )

hexCode = Cs.rgb2hex( [ red, green, blue ] )
[ red, green, blue ] = Cs.hex2rgb( '#e48c15' )

surfComplexion = Cs.toSurfaceComplexion( chroma, complexion )
complexion = Cs.fromSurfaceComplexion( chroma, surfComplexion )

```

Here is the complete program that produces an output similar to the image above. You can run test and see the test.html file produced in the 'test' folder.

    $ npm test


```js

const Cs = require('colorsmith')

//Generate a random color
var color = (Math.random()*0xffffff<<0).toString(16)
while( color.length < 6 ) color = '0' + color
color = '#' + color

var [ chroma, complexion, coloration ] = Cs.hex2surfCcc( color )
var [ chroma1, complexion1, coloration1 ] = Cs.hex2ccc( color )

var result = '<!DOCTYPE html><meta charset="UTF-8"/><style>div { display: inline-block; width:8vw; height: 8vw; } </style><p>Base color</p><div style="background:'+color+'"></div><br/>'

result += '<p>Variation in surface chroma. Colors in the first row are guaranteed to have uniform brightness but not so in the second row.</p>'

for( var i = 0; i < 1; i+=0.1 ) {
  result += '<div style="background:'+Cs.surfCcc2hex([i,complexion,coloration])+'"></div>'
}

result += '<br/>'

for( var i = 0; i < 1; i+=0.1 ) {
  result += '<div style="background:'+Cs.ccc2hex([i,complexion1,coloration1])+'"></div>'
}

result += '<br/><p>Variation in surface complexion. Middle color in the first row is guaranteed to be the brightest color but not so in the second row. Variation in the second row is guaranteed to be uniform but not so in the first row.</p>'

for( var i = 0; i < 1; i+=0.1 ) {
  result += '<div style="background:'+Cs.surfCcc2hex([chroma,i,coloration])+'"></div>'
}

result += '<br/>'

for( var i = 0; i < 1; i+=0.1 ) {
  result += '<div style="background:'+Cs.ccc2hex([chroma1,i,coloration1])+'"></div>'
}

result += '<br/><p>Variation in coloration, only one row.</p>'

for( var i = 0; i < 1; i+=0.1 ) {
  result += '<div style="background:'+Cs.surfCcc2hex([chroma,complexion,i])+'"></div>'
}

result += '<br/>'

require('fs').writeFile( require('path').join( __dirname, 'test.html' ), result, err=>console.log(err) )

console.log( '*** NOTE: Don\'t forget to manually inspect test.html' )


```

### Change log ###

[releases](https://github.com/ajyand/colorsmith/releases)



[npm-badge-url]: https://www.npmjs.com/package/colorsmith
[license-badge-url]: ./LICENSE
[npm-badge]: https://img.shields.io/npm/v/colorsmith.svg
[license-badge]: https://img.shields.io/npm/l/colorsmith.svg
