import OrthogonalLine from "../../../../../Draw/src/model/shape/OrthogonalLine/OrthogonalLine"
import Node from "../../../model/Node/Node"
import LinkingSegment from "../../../model/Node/LinkingSegments/LinkingSegment"
import BorderCenterLinkingSegment from "../../../model/Node/LinkingSegments/BorderCenterLinkingSegment"
import Link from "../../../model/Link/Link"
import LinkViewOrthogonalLine from "../../../model/Link/LinkViews/LinkViewOrthogonalLine"
import MathSegmentLine from "../../../../../Draw/src/util/math/MathSegmentLine"
import { isSegmentLineIntersectRectAtOnlyOnePoint } from "../../geometry/index"
import {
  firstElement,
  lastElement,
  isEmpty
} from "../../../../../Draw/src/util/js/array"
import { notNil } from "../../../../../Draw/src/util/lodash/index"

export function createInitializeLinkViewOrthogonalLine( link ) {
  const self = this
  const { source, target }: Link = link
  const sourceLinkingSegment: BorderCenterLinkingSegment = source.bbc
  const targetLinkingSegment: BorderCenterLinkingSegment = target.tbc
  const { x: sx, y: sy } = sourceLinkingSegment
  const { x: tx, y: ty } = targetLinkingSegment

  const {
    point: sourceLinkingPoint,
    extension: sourceExtension,
    toExtensionLine: sourceToExtensionLine
  } = sourceLinkingSegment
  const {
    point: targetLinkingPoint,
    extension: targetExtension,
    toExtensionLine: targetToExtensionLine
  } = targetLinkingSegment

  const { mathRect: sourceRect, ft } = source
  const { mathRect: targetRect } = target

  let corners = []

  if ( targetLinkingOutsideOfSourceLinking() ) {
    const l1: MathSegmentLine = new MathSegmentLine(
      sourceLinkingPoint,
      getCornerPointTowardsTargetLinking(
        sourceToExtensionLine.points,
        sourceLinkingPoint
      )
    )


  }


  /**
   * Main
   */
  function intersectingTargetLinkingProcess( line: MathSegmentLine ) {
    const intersectedInfo1 = targetRect.intersectSegmentLineInfo( l1 )
    const { isInfinite: isInfinite1, intersectd: intersectd1 } = intersectedInfo1
    if (
      notIntersected( intersectedInfo1 )
    ) {

    } else {

    }
  }

  /**
   * Util
   */
  function targetLinkingOutsideOfSourceLinking() {
    const { isVertical, isHorizontal } = sourceToExtensionLine

    if ( isVertical ) {
      if ( sourceRect.cy > sy ) {
        return ty < sy
      }
      if ( sourceRect.cy < sy ) {
        return ty > sy
      }
    }
    if ( isHorizontal ) {
      if ( sourceRect.cx > sx ) {
        return tx < sx
      }
      if ( sourceRect.cx < sx ) {
        return tx > sx
      }
    }
  }

  function getCornerPointTowardsTargetLinking(
    directionLine: LineTwoPoints,
    start: Point2D
  ) {
    const line: MathSegmentLine = new MathSegmentLine(
      directionLine[ 0 ],
      directionLine[ 1 ]
    )
    const { isVertical, isHorizontal } = line
    if ( isVertical ) {
      return {
        x: start.x,
        y: targetLinkingPoint.y
      }
    }
    if ( isHorizontal ) {
      return {
        x: targetLinkingPoint.x,
        y: start.y
      }
    }
  }

  function notIntersected( intersectedInfo ) {
    return !intersectedInfo.isInfinite &&
    isEmpty( intersectedInfo.intersectd )
  }
}

export default function connectOrthogonalLine(
  orthogonalLine,
  {
    sourceNode,
    sourcePoint,
    targetNode,
    targetPoint
  }: {
    sourceNode?: Node
    sourcePoint?: Point2D
    targetNode?: Node
    targetPoint: Point2D
  }
) {
  console.log( sourceNode, sourcePoint, targetNode, targetPoint )

  orthogonalLine.translateTargetToPoint &&
    orthogonalLine.translateTargetToPoint( targetPoint )
}
