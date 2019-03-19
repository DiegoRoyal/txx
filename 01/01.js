
var gl;
var points;

var a_Position;
var a_Color;
var bufferId;
var program;

var vertices = new Float32Array([
  0.0, 1.0,0.0,1.0,0.0,//上绿三角
  -0.5, 0.5,0.0,1.0,0.0,
  0.5, 0.5,0.0,1.0,0.0,
  -0.5,-0.5,0.0,0.0,1.0,//下蓝三角
  0.5,-0.5,0.0,0.0,1.0,
  0.0,-1.0,0.0,0.0,1.0,
  -0.5, 0.5,1.0,0.0,0.0,//红正方形
  0.5, 0.5,1.0,0.0,0.0,
  0.5,-0.5,1.0,0.0,0.0,
  -0.5,-0.5,1.0,0.0,0.0,
  -0.5, 0.5,1.0,0.0,0.0,
  0.5,-0.5,1.0,0.0,0.0
]);

window.onload = function init()
{
  var canvas = document.getElementById( "gl-canvas" );
  
  gl = WebGLUtils.setupWebGL( canvas );
  if ( !gl ) { alert( "WebGL isn't available" ); }

  //  Configure WebGL
  
  gl.viewport( 0, 0, canvas.width, canvas.height );
  gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
  
  //  Load shaders and initialize attribute buffers
  
  program = initShaders( gl, "vertex-shader", "fragment-shader" );
  gl.useProgram( program );
  
  // Load the data into the GPU
  
  bufferId = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
  gl.bufferData( gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW );
  
  render();
};


function render() {
  gl.clear( gl.COLOR_BUFFER_BIT );
  
  a_Position = gl.getAttribLocation(program, 'a_Position');
  a_Color  = gl.getAttribLocation(program, 'a_Color');
  
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 5 * 4, 0);
  gl.enableVertexAttribArray(a_Position);
  
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 5 * 4, 2 * 4);
  gl.enableVertexAttribArray(a_Color);
  
  gl.drawArrays(gl.TRIANGLES,0,12);
  
}
