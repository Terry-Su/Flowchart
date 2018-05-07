const ft = new Flowchart( document.getElementById( "canvas" ) )

const node = ft.addNode( {
	type: 'rect',
	label: '节点1',
	fillColor: 'deepSkyBlue'
  // left  : 100,
	// top   : 200,
	// width : 300,
	// height: 400
} )

ft.render()
