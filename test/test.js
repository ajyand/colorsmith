let should = require('chai').should()

const Colorsmith = require('../index.js')

var color = (Math.random()*0xffffff<<0).toString(16)
while( color.length < 6 ) color = '0' + color
color = '#' + color

describe( 'Colorsmith Transformations', ()=> {
  it('it should receive the same color after transformations', () =>
  color.should.equal(Colorsmith.surfCcc2hex( Colorsmith.hex2surfCcc( color ) )) )
})

var [ chroma, complexion, coloration ] = Colorsmith.hex2surfCcc( color )
var [ chroma1, complexion1, coloration1 ] = Colorsmith.hex2ccc( color )

var result = '<!DOCTYPE html><meta charset="UTF-8"/><style>div { display: inline-block; width:8vw; height: 8vw; } </style><p>Base color</p><div style="background:'+color+'"></div><br/>'

result += '<p>Variation in surface chroma. Colors in the first row are guaranteed to have uniform brightness but not so in the second row.</p>'

for( var i = 0; i < 1; i+=0.1 ) {
  result += '<div style="background:'+Colorsmith.surfCcc2hex([i,complexion,coloration])+'"></div>'
}

result += '<br/>'

for( var i = 0; i < 1; i+=0.1 ) {
  result += '<div style="background:'+Colorsmith.ccc2hex([i,complexion1,coloration1])+'"></div>'
}

result += '<br/><p>Variation in surface complexion. Middle color in the first row is guaranteed to be the brightest color but not so in the second row. Variation in the second row is guaranteed to be uniform but not so in the first row.</p>'

for( var i = 0; i < 1; i+=0.1 ) {
  result += '<div style="background:'+Colorsmith.surfCcc2hex([chroma,i,coloration])+'"></div>'
}

result += '<br/>'

for( var i = 0; i < 1; i+=0.1 ) {
  result += '<div style="background:'+Colorsmith.ccc2hex([chroma1,i,coloration1])+'"></div>'
}

result += '<br/><p>Variation in coloration, only one row.</p>'

for( var i = 0; i < 1; i+=0.1 ) {
  result += '<div style="background:'+Colorsmith.surfCcc2hex([chroma,complexion,i])+'"></div>'
}

result += '<br/>'

require('fs').writeFile( require('path').join( __dirname, 'test.html' ), result, err=>console.log(err) )

console.log( '*** NOTE: Don\'t forget to manually inspect test.html in the test folder' )
