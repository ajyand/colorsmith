Colorsmith
========

[![Latest NPM release][npm-badge]][npm-badge-url]
[![License][license-badge]][license-badge-url]
[![Dependencies][dependencies-badge]][dependencies-badge-url]
[![Dev Dependencies][devDependencies-badge]][devDependencies-badge-url]

#### Color library based on Chroma-Complexion-Coloration (CCC) model ####

The aim of the project is to help create variations of base color and to fully exploit CCC model.


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

<p>Base color</p><div style="background:#50999d"></div><br/><p>Variation in surface chroma. Colors in the first row are guaranteed to have uniform brightness but not so in the second row.</p><div style="background:#752828"></div><div style="background:#926b41"></div><div style="background:#859849"></div><div style="background:#3a8431"></div><div style="background:#398c51"></div><div style="background:#519e9e"></div><div style="background:#39518c"></div><div style="background:#3a3184"></div><div style="background:#854998"></div><div style="background:#92416b"></div><div style="background:#752828"></div><br/><div style="background:#b26a6a"></div><div style="background:#af8750"></div><div style="background:#91a550"></div><div style="background:#74b260"></div><div style="background:#56b27e"></div><div style="background:#509b9b"></div><div style="background:#567eb2"></div><div style="background:#7460b2"></div><div style="background:#9150a5"></div><div style="background:#af5087"></div><div style="background:#b26a6a"></div><br/><p>Variation in surface complexion. Middle color in the first row is guaranteed to be the brightest color but not so in the second row. Variation in the second row is guaranteed to be uniform but not so in the first row.</p><div style="background:#000000"></div><div style="background:#142728"></div><div style="background:#294e51"></div><div style="background:#3d7579"></div><div style="background:#529da1"></div><div style="background:#66c5c9"></div><div style="background:#83d2d4"></div><div style="background:#a2dddf"></div><div style="background:#c1e9ea"></div><div style="background:#e0f4f5"></div><div style="background:#ffffff"></div><br/><div style="background:#000000"></div><div style="background:#0f1d1f"></div><div style="background:#1f3b3e"></div><div style="background:#2f595d"></div><div style="background:#3f787c"></div><div style="background:#4e969a"></div><div style="background:#5eb5b9"></div><div style="background:#79ced0"></div><div style="background:#a6dfe0"></div><div style="background:#d3eff0"></div><div style="background:#ffffff"></div><br/><p>Variation in coloration, only one row.</p><div style="background:#828282"></div><div style="background:#758889"></div><div style="background:#688e90"></div><div style="background:#5b9497"></div><div style="background:#4e9a9e"></div><div style="background:#41a0a5"></div><div style="background:#34a6ac"></div><div style="background:#27acb3"></div><div style="background:#1ab2ba"></div><div style="background:#0db8c1"></div><div style="background:#00bec8"></div><br/>

### Change log ###

[releases](https://github.com/ajyand/colorsmith/releases)



[npm-badge-url]: https://www.npmjs.com/package/colorsmith
[license-badge-url]: ./LICENSE
