Colorsmith
========

[![Latest NPM release][npm-badge]][npm-badge-url]
[![License][license-badge]][license-badge-url]

#### Color library based on Chroma-Complexion-Coloration (CCC) model ####

The aim of the project is to help create variations of base color and to fully exploit CCC model.

  <img src="https://raw.githubusercontent.com/ajyand/colorsmith/master/test/output.png"/>

## Installation

### Node.js

`colorsmith` is available on [npm](http://npmjs.org). To install it, type:

    $ npm install colorsmith

## Usage

Import the library in your code

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
