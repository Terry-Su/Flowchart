const ft = new Flowchart( document.getElementById( "canvas" ) )

const node = ft.addNode( {
	type: 'rect',
	label: '节点1',
} )

ft.render()
