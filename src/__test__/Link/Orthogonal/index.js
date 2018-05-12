const ft = new Flowchart( document.getElementById( "canvas" ) )

const node1 = ft.addNode( {
	x: 300,
	y: 400,
	label: '节点1',
	fillColor: 'blue'
} )

const node2 = ft.addNode( {
	x: 340,
	y: 300,

	// x: 160,
	// y: 300,

	// x: 160,
	// y: 300,

	label: '节点2',
	fillColor: 'DeepskyBlue'
} )

const link1 = ft.addLink( {
	type: 'orthogonal',	
	source: node1,
	target: node2,
} )

ft.render()
