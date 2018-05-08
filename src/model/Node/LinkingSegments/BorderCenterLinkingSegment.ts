import LinkingSegment from './LinkingSegment';
import LinkViewOrthogonalLine from '../../Link/LinkViews/LinkViewOrthogonalLine';
import { notNil } from '../../../../../Draw/src/util/lodash/index';
import { isNil } from 'lodash';
import TmpOrthogonalLinkingSegmentsLine from './TmpLines/TmpOrthogonalLinkingSegmentsLine';
import { NODE_BORDER_CENTER } from '../../../constant/type/linkingSegmentType';

export default class BorderCenterLinkingSegment extends LinkingSegment {
  type: string = NODE_BORDER_CENTER

  tmpLine: TmpOrthogonalLinkingSegmentsLine
  
  constructor( props ) {
    super( props )
  }

  createTmpLine( source: Point2D, moving: Point2D ) {
    return new TmpOrthogonalLinkingSegmentsLine( { draw: this.draw, points: [ this.point, moving ] } )
  }

  handleDragging( event ) {
    const { tmpLine } = this
    const point: Point2D = this.getters.getInitialPoint( event )

    notNil( tmpLine ) && tmpLine.translateTargetToThePoint( point, this )

    super.handleDragging && super.handleDragging( event )
  }

  handleStopDrag( event ) {
    const { node } = this

    const ending: Point2D = this.getters.getInitialPoint( event )
    const coincidedInfo = this.ftGetters.getCoincidedInfoPointInNode( ending )
    const { node: coincidedNode, linkingSegment  } = coincidedInfo

    if ( notNil( coincidedNode ) && isNil( linkingSegment )) {
      this.ft.createOrthogonalLineLink( { source: coincidedNode, target: coincidedNode } )
    }

    if ( notNil( coincidedNode ) && notNil( linkingSegment )) {

    }


    super.handleStopDrag( event )
  }
}