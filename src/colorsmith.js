module.exports = (function () {

  var obj = {}

  var num2hex = function(n) { return n>15 ? n.toString(16) : '0'+n.toString(16) }

  function realToByte(x) {
    if( x >= 1.0 ) return 255
    return Math.floor(x*256)
  }

  var alignNumber = function(x)
  {
    var x1 = Math.floor(x)
    var x2 = Math.round((x-x1)*100)
    var s
    if( x1 < 10 ) s = " " + x1
    else s = "" + x1
    if( x2 < 10 ) s = s + ".0" + x2
    else s = s + "."  + x2
    return s
  }

  function dummy_interpolate( p1, p2, f )
  {
    return [p1[0]*(1-f) + p2[0]*f,
      p1[1]*(1-f) + p2[1]*f,
      p1[2]*(1-f) + p2[2]*f]
  }

  function isEqual( x, y ) {
    if( Math.abs(x-y) < 1e-6 ) return true
    return false
  }

  function dummy_min( p )
  {
    var val = 0
    var idx = 0
    if( p[0] < p[1] )
    {
      if( p[0] < p[2] ) {
        val = p[0]
        idx = 0
      }
      else {
        val = p[2]
        idx = 2
      }
    }
    else if( p[1] < p[2] ) {
      val = p[1]
      idx = 1
    }
    else {
      val = p[2]
      idx = 2
    }
    return [idx,val]
  }

  function dummy_max( p )
  {
    var val = 0
    var idx = 0
    if( p[0] > p[1] )
    {
      if( p[0] > p[2] ) {
        val = p[0]
        idx = 0
      }
      else {
        val = p[2]
        idx = 2
      }
    }
    else if( p[1] > p[2] ) {
      val = p[1]
      idx = 1
    }
    else {
      val = p[2]
      idx = 2
    }
    return [idx,val]
  }

  obj.rgb2hex = function( rgb ) {
    return "#" + num2hex( rgb[0] ) + num2hex( rgb[1] ) + num2hex( rgb[2] )
  }

  obj.hex2rgb = function( s ) {
    return [ parseInt( s.substr(1,2), 16 )/255, parseInt( s.substr(3,2), 16 )/255, parseInt( s.substr(5,2), 16 )/255 ]
  }

  obj.ccc2rgb = function( c ) //chroma, complexion, coloration
  {
    var p = []
    if( 3*c[1] < 1 )
    {
      if( c[0] < 1.0/3 )
        p = dummy_interpolate( [3*c[1], 0, 0], [0, 3*c[1], 0], c[0] * 3)
      else if( c[0] < 2.0/3 )
        p = dummy_interpolate( [0, 3*c[1], 0], [0, 0, 3*c[1]], c[0] * 3 - 1 )
      else
        p = dummy_interpolate( [0, 0, 3*c[1]], [3*c[1], 0, 0], c[0] * 3 - 2 )
    }
    else if( 3*c[1] < 2 )
    {
      c[0] += (3*c[1]-1)/6
      if( c[0] > 1 ) c[0] -= 1
      if( c[0] < c[1] - 1.0/3 )
        p = dummy_interpolate( [1, 0, 3*c[1]-1], [1, 3*c[1]-1, 0], 3*c[0]/(3*c[1]-1))
      else if( c[0] < 1.0/3 )
        p = dummy_interpolate( [1, 3*c[1]-1, 0], [3*c[1]-1, 1, 0], (3*c[0] - 3*c[1] + 1)/(2-3*c[1]))
      else if( c[0] < c[1] )
        p = dummy_interpolate( [3*c[1]-1, 1, 0], [0, 1, 3*c[1]-1], (3*c[0] - 1)/(3*c[1]-1))
      else if( c[0] < 2.0/3 )
        p = dummy_interpolate( [0, 1, 3*c[1]-1], [0, 3*c[1]-1, 1], 3*(c[0] - c[1])/(2-3*c[1]))
      else if( c[0] < c[1] + 1.0/3 )
        p = dummy_interpolate( [0, 3*c[1]-1, 1], [3*c[1]-1, 0, 1], (3*c[0] - 2)/(3*c[1]-1))
      else
        p = dummy_interpolate([3*c[1]-1, 0, 1], [1, 0, 3*c[1]-1], (3*c[0]-3*c[1]-1)/(2-3*c[1]))
    }
    else
    {
      c[0] += 1.0/6
      if( c[0] > 1 ) c[0] -= 1
      if( c[0] < 1.0/3 )
        p = dummy_interpolate( [1, 3*c[1]-2, 1], [1, 1, 3*c[1]-2], 3*c[0] )
      else if( c[0] < 2.0/3 )
        p = dummy_interpolate( [1, 1, 3*c[1]-2], [3*c[1]-2, 1, 1], 3*c[0] -1 )
      else p = dummy_interpolate( [3*c[1]-2, 1, 1], [1, 3*c[1]-2, 1], 3*c[0]-2 )
    }
    p = dummy_interpolate( [c[1], c[1], c[1]], p, c[2])
    return p
  }

  obj.rgb2ccc = function( rgb )
  {
    var chroma = 0
    var c = 0
    var coloration = 0

    c = ( rgb[0] + rgb[1] + rgb[2] ) / 3
    if( isEqual(rgb[0],rgb[1]) && isEqual(rgb[1],rgb[2]) ) { return [0,c,0] }
    var idxval = []
    var idxvalHi = []
    if( 3*c < 1 )
    {
      idxval = dummy_min( rgb )
      coloration = 1 - idxval[1]/c
      if( idxval[0] == 0 ) chroma = (rgb[2]-rgb[0])/(c-rgb[0])/9+1.0/3
      else if( idxval[0] == 1 ) chroma = (rgb[0]-rgb[1])/(c-rgb[1])/9+2.0/3
      else chroma = (rgb[1]-rgb[2])/(c-rgb[2])/9
    }
    else if( 3*c < 2 )
    {
      idxval = dummy_min( rgb )
      idxvalHi = dummy_max( rgb )
      if( idxval[1]*(1-c) < (1-idxvalHi[1])*c ) // zero plane
      {
        coloration = 1 - idxval[1]/c
        if( idxval[0] == 0 ) chroma = (c+1)/2-c*(rgb[1]-rgb[0])/(c-rgb[0])/3
        else if( idxval[0] == 1 ) chroma = (3*c+5)/6-c*(rgb[2]-rgb[1])/(c-rgb[1])/3
        else chroma = (3*c+1)/6-c*(rgb[0]-rgb[2])/(c-rgb[2])/3
      }
      else
      {
        idxval = idxvalHi
        coloration = (idxval[1]-c)/(1-c)
        if( idxval[0] == 0 ) chroma = (rgb[1]*(1-c)-c*(1-rgb[0]))/(rgb[0]-c)/3+(1-3*c)/6
        else if( idxval[0] == 1 ) chroma = (rgb[2]*(1-c)-c*(1-rgb[1]))/(rgb[1]-c)/3+(1-c)/2
        else chroma = (rgb[0]*(1-c)-c*(1-rgb[2]))/(rgb[2]-c)/3+(5-3*c)/6
      }
    }
    else
    {
      idxval = dummy_max( rgb )
      coloration = (idxval[1]-c)/(1-c)
      if( idxval[0] == 0 ) chroma = (rgb[0]-rgb[2])/(rgb[0]-c)/9-1.0/6
      else if( idxval[0] == 1 ) chroma = (rgb[1]-rgb[0])/(rgb[1]-c)/9+1.0/6
      else chroma = (rgb[2]-rgb[1])/(rgb[2]-c)/9+0.5
    }
    if( chroma < 0 ) chroma += 1
    //Isometric: (2x-y-z)/sqrt(6), (y-z)/sqrt(2)
    return [chroma, c, coloration]
  }

  obj.toSurfaceComplexion = function( chroma, complexion)
  {
    chroma *= 6
    var f = (1+chroma-Math.floor(chroma))/3
    if( Math.floor(chroma)%2 ) f = 1-f
    if( complexion < 0.5 ) return 2*complexion*f
    return 1-2*(1-complexion)*(1-f)
  }

  obj.fromSurfaceComplexion = function( chroma, surfComplexion )
  {
    chroma *= 6
    var f = (1+chroma-Math.floor(chroma))/3
    if( Math.floor(chroma)%2 ) f = 1-f
    if( surfComplexion < f ) return surfComplexion/2/f
    return 1-(1-surfComplexion)/2/(1-f)
  }

  obj.ccc2hex = function( c )
  {
    var p = obj.ccc2rgb( c )
    p[0] = realToByte(p[0])
    p[1] = realToByte(p[1])
    p[2] = realToByte(p[2])
    return obj.rgb2hex( p )
  }

  obj.surfCcc2rgb = function( c ) {
    return obj.ccc2rgb( [ c[0], obj.toSurfaceComplexion(c[0],c[1]), c[2] ] )
  }

  obj.rgb2surfCcc = function( rgb ) {
    var ans = obj.rgb2ccc( rgb )
    ans[1] = obj.fromSurfaceComplexion( ans[0], ans[1] )
    return ans
  }

  obj.surfCcc2hex = function( c ) {
    var p = obj.surfCcc2rgb( c )
    p[0] = realToByte(p[0])
    p[1] = realToByte(p[1])
    p[2] = realToByte(p[2])
    return obj.rgb2hex( p )
  }

  obj.hex2ccc = function( s ) {
    return obj.rgb2ccc( obj.hex2rgb( s ) )
  }

  obj.hex2surfCcc = function( s ) {
    return obj.rgb2surfCcc( obj.hex2rgb( s ) )
  }

  return obj

})()
