
var canvas;
var gl;

var points = [];

var NumTimesToSubdivide = 5;

var ddapoints = 0;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
        
    //
    //  Initialize our data for the Sierpinski Gasket
    //

    // First, initialize the corners of our gasket with three points.
    
    initF();
    points.push(0,0,20,8);
    lineDDA(0,0,20,8);
    coordTrans();
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
}

function lineDDA( x0, y0, xEnd, yEnd){
    var dx=xEnd-x0,dy=yEnd-y0,steps,k;
	var xIncrement,yIncrement,x=x0,y=y0;
	if(Math.abs(dx)>Math.abs(dy))//确定步长，谁大就取谁
		steps=Math.abs(dx);
	else
		steps=Math.abs(dy);
	xIncrement=dx/steps;//增量当中有一个会为1，另一个会为斜率k
	yIncrement=dy/steps;
    points.push(Math.round(x),Math.round(y));//由于每次都加了小于1的增量，所以需要取整
    ddapoints++;
	for(k=0;k<steps;k++){
		x+=xIncrement;
		y+=yIncrement;
        points.push(Math.round(x),Math.round(y));
        ddapoints++;
	}

}
function coordTrans(){
    var i;
    for(i=0;i<points.length;i++){
        points[i]-=10;
        points[i]/=10;
    }
}
function initF()
{//0,0  20,10  ->  -1,-1  1,1
    var i;
    for(i=0;i<=20;i++){
        points.push(i,10,i,0);
    }
    for(i=0;i<=10;i++){
        points.push(0,i,20,i);
    }
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.LINES, 0, points.length/2-ddapoints );
    gl.drawArrays( gl.POINTS, points.length/2-ddapoints, ddapoints );
}

