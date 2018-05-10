import Rect from "../../../../../Draw/src/model/shape/Rect";
import Flowchart from '../../../Flowchart';
import Node from '../Node';
import setNodeViewObjectCommonProps from '../../../ftUtil/node/nodeView/index';
import { notNil, notUndefined } from "../../../../../Draw/src/util/lodash/index";

export default class NodeViewRect extends Rect {
  node: Node


  constructor( props ) {
    super( setPropsDangerously( props ) )

    this.node = props.node

    setNodeViewObjectCommonProps( this, this.node )

    function setPropsDangerously( props ) {
      props.width = notUndefined( props.width ) ? props.width : Node.DEFAULT_WIDTH
      props.height = notUndefined( props.height ) ? props.height : Node.DEFAULT_HEIGHT
      props.rotatable = false
      props.sizable = false
      return props
    }
  }

  updateDrag( event ) {
    const point: Point2DInitial = this.getters.getInitialPoint( event )
		const deltaX = this.dragger.getDeltaXToPrevPoint( point )
    const deltaY = this.dragger.getDeltaYToPrevPoint( point )

    this.node.translateByView( deltaX, deltaY )

    super.updateDrag( event )
  }

  handleAfterDragging() {
    const { links } = this.node
    links.map( link => {
      const { source, target } = link

      link.remove()

      this.node.ft.addLink( {
        type: 'orthogonal',	
        source,
        target,
      } )

      this.node.ft.render()
    } )

  }
}