import Segment from "../../../../../Draw/src/model/Segment";
import linkViewObjectClassMap from "../../../constant/map/linkViewObjectClassMap";
import Node from '../Node';
import Getters from '../../../flowchart/Getters';
import Flowchart from '../../../Flowchart';

export default abstract class LinkingSegment extends Segment{
  node: Node

  tmpLinkView: LinkView

  constructor(props) {
    super( props )

    this.node = props.node
  }

  get ft(): Flowchart {
    return this.node.ft
  }

  get ftGetters(): Getters {
    return this.node.getters
  }

  abstract createTmpLinkView( source: Point2D, moving: Point2D ): any 

  handleDragging( event ) {
    const { node } = this

    const source: Point2D = this.node.center.point
    const moving: Point2D = this.getters.getInitialPoint( event )

    this.tmpLinkView && this.tmpLinkView.forceRemove()
    this.tmpLinkView = this.createTmpLinkView( source, moving )
  }

  handleStopDrag( event ) {
    this.tmpLinkView && this.tmpLinkView.forceRemove()
    
    super.handleStopDrag()
  }

}