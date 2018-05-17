import Link from "../Link"
import {
  setLinkViewObjectCommonProps,
  getInitialPoints
} from "../../../ftUtil/link/linkView/index"
import OrthogonalLine from "../../../../../Draw/src/model/shape/OrthogonalLine/OrthogonalLine"
import { notNil } from "../../../../../Draw/src/util/lodash/index"
import { isNil } from 'lodash';
import { getInitializeLinkViewOrthogonalLineCorners } from '../../../ftUtil/algorithm/orthogonalLine/index';

export default class LinkViewOrthogonalLine extends OrthogonalLine {
  link: Link

  constructor( props ) {
    super( props )

    this.link = props.link

    setLinkViewObjectCommonProps( this, this.link )
  }


  handleStartSegmentStopDrag( event ) {
    const point: Point2D = this.getters.getInitialPoint( event )
    const coincidedInfo = this.link.ft.getters.getCoincidedInfoPointInNode( point )
    const { node: coincidedNode, linkingSegment } = coincidedInfo

    if ( notNil( coincidedNode ) && notNil( linkingSegment ) ) {
      this.link.updateSource( coincidedNode )
      this.link.setSourceLinkingSegment( linkingSegment )
      this.reGenerate()
    }
  }

  handleEndSegmentStopDrag( event ) {
    const point: Point2D = this.getters.getInitialPoint( event )
    const coincidedInfo = this.link.ft.getters.getCoincidedInfoPointInNode( point )
    const { node: coincidedNode, linkingSegment } = coincidedInfo

    if ( notNil( coincidedNode ) && notNil( linkingSegment ) ) {
      this.link.updateTarget( coincidedNode )
      this.link.setTargetLinkingSegment( linkingSegment )
      this.reGenerate()
    }
  }

  reGenerate() {
    const { source, sourceLinkingSegment, target, targetLinkingSegment } = this.link
    const corners = getInitializeLinkViewOrthogonalLineCorners( source, sourceLinkingSegment, target, targetLinkingSegment)
    super.reGenerate( [
      sourceLinkingSegment.point, ...corners, targetLinkingSegment.point
    ] )
  }
}
