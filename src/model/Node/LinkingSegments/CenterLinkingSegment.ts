import LinkingSegment from './LinkingSegment';
import { notNil } from '../../../../../Draw/src/util/lodash/index';
import { isNil } from 'lodash';
import TmpSimpleLinkingSegmentsLine from './TmpLines/TmpSimpleLinkingSegmentsLine';
import { NODE_CENTER } from '../../../constant/type/linkingSegmentType';

export default class CenterLinkingSegment extends LinkingSegment {
  type: string = NODE_CENTER

  tmpLine: TmpSimpleLinkingSegmentsLine

  constructor( props ) {
    super( props )
  }

  createTmpLine( source: Point2D, moving: Point2D ) {
    return new TmpSimpleLinkingSegmentsLine( { draw: this.draw, source, target: moving, showArrow: true } )
  }

  handleDragging( event ) {
    const { tmpLine } = this
    const point: Point2D = this.getters.getInitialPoint( event )

    notNil( tmpLine ) && tmpLine.translateTargetToPoint( point )

    super.handleDragging && super.handleDragging( event )
    
  }

  handleStopDrag( event ) {
    const { node } = this

    const ending: Point2D = this.getters.getInitialPoint( event )
    const coincidedInfo = this.ftGetters.getCoincidedInfoPointInNode( ending )
    const { node: coincidedNode  } = coincidedInfo

    if ( notNil( coincidedNode ) ) {
      this.ft.createSimpleLineLink( { source: node, target: coincidedNode } )
    }


    super.handleStopDrag( event )
  }
}
