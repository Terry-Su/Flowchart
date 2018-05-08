import Segment from "../../../../../Draw/src/model/Segment";
import linkViewObjectClassMap from "../../../constant/map/linkViewObjectClassMap";
import Node from '../Node';
import Getters from '../../../flowchart/Getters';
import Flowchart from '../../../Flowchart';
import { isNil } from 'lodash';
import { notNil } from "../../../../../Draw/src/util/lodash/index";

export default abstract class LinkingSegment extends Segment{
  node: Node

  tmpLine: TmpLinkingSegmentsLine

  abstract type: string

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

  abstract createTmpLine( source: Point2D, moving: Point2D ): any 

  _removeTmpLine() {
    this.tmpLine && this.tmpLine.forceRemove()
    this.tmpLine = null
  }


  handleDragging( event ) {
    const { node, tmpLine } = this

    const source: Point2D = this.node.center.point
    const moving: Point2D = this.getters.getInitialPoint( event )

    if ( isNil( tmpLine ) ) {
      this.tmpLine = this.createTmpLine( source, moving )
    }
  }

  handleStopDrag( event ) {
    this._removeTmpLine() 
    
    super.handleStopDrag()
  }

}