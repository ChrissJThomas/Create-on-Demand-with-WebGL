
  class Triangle1
 {
	 constructor()
	 {


		 this.randnum = Math.random()*.01; // this will get a number between 1 and 99;
		 this.randnum2 = Math.random()*.01;

		 this.num1 = this.randnum *= Math.floor(Math.random()*2) == 1 ? 1 : -1;

		 this.num2 = this.randnum2 *= Math.floor(Math.random()*2) == 1 ? 1 : -1;

		this.buffer=gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

		 //add color to vertices
		this.vertices =
		 [
		 -.08,.08,0,	0,1,0.8, //top back
		 .08,.08,0,		0,1,0.8,
		 0,0,.08,		0,1,0.8,

		 .08,.08,0,		0,0.8,1, //back left
		 0.08,-.08,0,	0,0.8,1,
		 0,0,.08,		0,0.8,1,

		 .08,-.08,0,	0.8,0,1, //back bottom
		 -.08,-.08,0,	0.8,0,1,
		 0,0,.08,		0.8,0,1,

		 -.08,-.08,0,	1,0.8,0, //back  right
		 -.08,.08,0,	1,0.8,0,
		 0,0,.08,		1,0.8,0,

		-.08,.08,0,		0,1,0, //front top
		.08,.08,0,		0,1,0,
		0,0,-.08,		0,1,0,

		.08,.08,0,		0,0,1, //front right
		.08,-.08,0,		0,0,1,
		0,0,-.08,		0,0,1,

		.08,-.08,0,		1,0,1, //front bottom
		-.08,-.08,0,	1,0,1,
		0,0,-.08,		1,0,1,

		-.08,-.08,0,	1,0,0, //front left
		-.08,.08,0,		1,0,0,
		0,0,-.08,		1,0,0

		];

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

		this.loc = [0.0,0.0,0.0];
		this.rot = [0.0,0.0,0.0];
	 }
	 //Again this could be inherited ... but not always...not all objects

	render(program)
	{
		//First we bind the buffer for triangle 1
		var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		var size = 3;          // 2 components per iteration
		var type = gl.FLOAT;   // the data is 32bit floats
		var normalize = false; // don't normalize the data
		var stride = 6*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element     // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0;        // start at the beginning of the buffer

		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

		//Now we have to do this for color
		var colorAttributeLocation = gl.getAttribLocation(program,"vert_color");
		//We don't have to bind because we already have the correct buffer bound.
		size = 3;
		type = gl.FLOAT;
		normalize = false;
		stride = 6*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element
		offset = 3*Float32Array.BYTES_PER_ELEMENT;	//size of the offset

		gl.enableVertexAttribArray(colorAttributeLocation);
		gl.vertexAttribPointer(colorAttributeLocation, size, type, normalize, stride, offset);

		var tranLoc  = gl.getUniformLocation(program,'transform');
		gl.uniform3fv(tranLoc,new Float32Array(this.loc ));
		var thetaLoc = gl.getUniformLocation(program,'rotation');
		gl.uniform3fv(thetaLoc,new Float32Array(this.rot ));


		var primitiveType = gl.TRIANGLES;
		offset = 0;
		var count = 24;
		gl.drawArrays(primitiveType, offset, count);
	}
}
