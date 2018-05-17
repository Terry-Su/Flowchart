import Link from "../Link"
import {
  setLinkViewObjectCommonProps,
  getInitialPoints
} from "../../../ftUtil/link/linkView/index"
import OrthogonalLine from "../../../../../Draw/src/model/shape/OrthogonalLine/OrthogonalLine"
import { notNil } from "../../../../../Draw/src/util/lodash/index"
import { isNil } from 'lodash';
import { getInitializeLinkViewOrthogonalLineCorners } from '../../../ftUtil/algorithm/orthogonalLine/index';
import { notEqual } from "../../../../../Draw/src/util/js/compare";

export default class LinkViewOrthogonalLine extends OrthogonalLine {
  link: Link

  constructor( props ) {
    super( props )

    this.link = props.link

    setLinkViewObjectCommonProps( this, this.link )
  }


  handleStartSegmentStopDrag( event ) {
    const { link } = this
    const { target } = link
    const point: Point2D = this.getters.getInitialPoint( event )
    const coincidedInfo = this.link.ft.getters.getCoincidedInfoPointInNode( point )
    const { node: coincidedNode, linkingSegment } = coincidedInfo

    if ( notNil( coincidedNode ) && notEqual( coincidedNode, target ) && notNil( linkingSegment ) ) {
      link.updateSource( coincidedNode )
      link.setSourceLinkingSegment( linkingSegment )
      this.reGenerate()
    }
  }

  handleEndSegmentStopDrag( event ) {
    const { link } = this
    const { source } = link
    const point: Point2D = this.getters.getInitialPoint( event )
    const coincidedInfo = this.link.ft.getters.getCoincidedInfoPointInNode( point )
    const { node: coincidedNode, linkingSegment } = coincidedInfo

    if ( notNil( coincidedNode ) && notEqual( coincidedNode, source ) && notNil( linkingSegment ) ) {
      link.updateTarget( coincidedNode )
      link.setTargetLinkingSegment( linkingSegment )
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
