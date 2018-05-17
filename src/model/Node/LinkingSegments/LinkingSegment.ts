import linkViewObjectClassMap from "../../../constant/map/linkViewObjectClassMap";
import Node from '../Node';
import Getters from '../../../flowchart/Getters';
import Flowchart from '../../../Flowchart';
import { isNil } from 'lodash';
import { notNil } from "../../../../../Draw/src/util/lodash/index";
import MathVector from "../../../../../Draw/src/util/math/MathVector";
import MathSegmentLine from "../../../../../Draw/src/util/math/MathStraightLine";
import BasicSegment from '../../Basic/BasicSegment';

export default abstract class LinkingSegment extends BasicSegment{
  node: Node

  tmpLine: TmpLinkingSegmentsLine

  ft: Flowchart

  abstract type: string

  constructor(props) {
    super( setPropsDangerously( props ) )

    this.node = props.node

    function setPropsDangerously( props ) {
      props.ft = props.node.ft
      return props
    }
  }

  abstract createTmpLine( source: Point2D, moving: Point2D ): any 

  _removeTmpLine() {
    this.tmpLine && this.tmpLine.forceRemove()
    this.tmpLine = null
  }


  handleDragging( event ) {
    const { node, tmpLine } = this

    const source: Point2D = this.point
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