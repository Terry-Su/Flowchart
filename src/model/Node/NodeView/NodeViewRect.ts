import Rect from "../../../../../Draw/src/model/shape/Rect"
import Flowchart from "../../../Flowchart"
import Node from "../Node"
import setNodeViewObjectCommonProps from "../../../ftUtil/node/nodeView/index"
import { notNil, notUndefined } from "../../../../../Draw/src/util/lodash/index"
import { getInitializeLinkViewOrthogonalLineCorners, getOrthogonalLineEndSegmentOnNode } from '../../../ftUtil/algorithm/orthogonalLine/index';
import { SIMPLE_LINE, ORTHOGONAL_LINE } from '../../../constant/type/linkViewTypes';
import OrthogonalLine from "../../../../../Draw/src/model/shape/OrthogonalLine/OrthogonalLine";
import LinkViewOrthogonalLine from '../../Link/LinkViews/LinkViewOrthogonalLine';

export default class NodeViewRect extends Rect {
  node: Node

  constructor( props ) {
    super( setPropsDangerously( props ) )

    this.node = props.node

    setNodeViewObjectCommonProps( this, this.node )

    function setPropsDangerously( props ) {
      props.width = notUndefined( props.width ) ? props.width : Node.DEFAULT_WIDTH
      props.height = notUndefined( props.height ) ?
        props.height :
        Node.DEFAULT_HEIGHT
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

  handleDragging( event ) {
    const point: Point2DInitial = this.getters.getInitialPoint( event )
    const dx = this.dragger.getDeltaXToPrevPoint( point )
    const dy = this.dragger.getDeltaYToPrevPoint( point )

    const { links } = this.node
    links.map( link => {
      const {
        source,
        sourceLinkingSegment,
        target,
        targetLinkingSegment,
        viewType,
        view
      } = link

      if ( viewType === SIMPLE_LINE ) {
      }

      if ( viewType === ORTHOGONAL_LINE ) {
        const orthogonalLinkView: LinkViewOrthogonalLine = <any>view
        orthogonalLinkView.reGenerate()
        // const segment = getOrthogonalLineEndSegmentOnNode( orthogonalLinkView, this.node )
        // if ( notNil( segment ) ) {
        //   segment.translate( dx, dy )
        //   orthogonalLinkView.refresh()
        // } 
      }
    } )

    
  }
}
