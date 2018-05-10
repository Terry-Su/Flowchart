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
import CornerSegment from "../../../../../Draw/src/model/shape/OrthogonalLine/CornerSegment"
import distance from "../../../../../Draw/src/util/geometry/distance"

export function createInitializeLinkViewOrthogonalLine( link: Link ) {
  const { source, target }: Link = link  
  // const sourceLinkingSegment: BorderCenterLinkingSegment = source.rbc
  // const targetLinkingSegment: BorderCenterLinkingSegment = target.tbc

  const { sourceLinkingSegment, targetLinkingSegment } = link  

  const corners = getInitializeLinkViewOrthogonalLineCorners( link )
  
  const points = [ sourceLinkingSegment, ...corners, targetLinkingSegment ]
  // const points = [ link.sourceLinkingSegment, ...corners, link.targetLinkingSegment ]

  link.draw.getters.testUtils.delayRenderPoints( corners, 'purple' )
  
  return new LinkViewOrthogonalLine( { link, draw: link.draw, points } )
}

export function getInitializeLinkViewOrthogonalLineCorners( link: Link ) {
  const self = this
  const { source, target }: Link = link
  // const sourceLinkingSegment: BorderCenterLinkingSegment = source.rbc
  // const targetLinkingSegment: BorderCenterLinkingSegment = target.rbc
  const { sourceLinkingSegment, targetLinkingSegment } = link
  const { x: sx, y: sy } = sourceLinkingSegment
  const { x: tx, y: ty } = targetLinkingSegment

  const {
    point: sourceLinkingPoint,
    extension: sourceExtension,
    toExtensionLine: sourceToExtensionLine,
    bci: sourceBci
  } = sourceLinkingSegment
  const {
    point: targetLinkingPoint,
    extension: targetExtension,
    toExtensionLine: targetToExtensionLine,
    bci: targetBci
  } = targetLinkingSegment

  const { mathRect: sourceRect, ft } = source
  const { mathRect: targetRect } = target

  let corners = []

  const isTargetLinkingOutsideOfSourceLinking = targetLinkingOutsideOfSourceLinking()

  if ( isTargetLinkingOutsideOfSourceLinking) {
    const turningCorner: Point2D = getTurningCornerTowardsTargetLinking(
      sourceToExtensionLine.points,
      sourceLinkingPoint
    )

    const line: MathSegmentLine = new MathSegmentLine( sourceLinkingPoint, turningCorner )

    const intersectedInfo = targetRect.intersectSegmentLineInfo( line )

    const isIntersectTargetRect = isIntersected( intersectedInfo )

    if( isIntersectTargetRect ) {
      connectTargetLinking( line )
    }

    if ( ! isIntersectTargetRect ) {
      corners.push( turningCorner )

      const line2: MathSegmentLine = new MathSegmentLine( turningCorner, targetLinkingPoint )

      connectTargetLinking( line2 )
    } 
    
  }

  if ( ! isTargetLinkingOutsideOfSourceLinking ) {
    // draw the extension of source linking segment
    corners.push( sourceExtension )

    const turningCorner = getTurningCornerTowardsTargetLinking( sourceBci.cornerExtensions, sourceExtension  )

    const line = new MathSegmentLine( turningCorner, targetLinkingPoint  )

    const intersectedInfo = sourceRect.intersectSegmentLineInfo( line )
    const isIntersectSouceRect = isIntersected( intersectedInfo )
    if ( isIntersectSouceRect ) {
      const cornerExtension = getCornerExtensionNearPoint( sourceBci.cornerExtensions, targetLinkingPoint )
      // link.draw.getters.testUtils.delayRenderPoint( cornerExtension, 'purple' )
      corners.push( cornerExtension )
       
      const turningCorner2 = getTurningCornerTowardsTargetLinking( sourceToExtensionLine.points, cornerExtension  )
      corners.push( turningCorner2 ) 

      const line2 = new MathSegmentLine( cornerExtension, turningCorner2 )
      connectTargetLinking( line2 )
    }

    if ( !isIntersectSouceRect ) {
      corners.push( turningCorner )
      
      connectTargetLinking( line )
    }
  }

 
  return corners



  /**
   * Main
   */
  function connectTargetLinking( inputLine: MathSegmentLine ) {
    const { start: inputStart } = inputLine

    if ( isTargetLinkingTheClosePerpLinking() ) {

    }

    if ( isTargetLinkingTheFarPerpLinking() ) {
        const { cornerExtensions } = targetBci
        const cornerExtension = getCornerExtensionNearPoint( cornerExtensions, sourceLinkingPoint )

        const turningCorner = getTurningCornerTowardsPoint( targetBci.cornerExtensions, inputStart, cornerExtension )

        corners.push( turningCorner )
        corners.push( cornerExtension )
        corners.push( targetExtension )
    }

    if ( isTargetLinkingTheParallelLinking() ) {
      const turningCorner = getTurningCornerTowardsPoint( targetToExtensionLine.points, inputStart, targetExtension )
      
      corners.push( turningCorner )
      corners.push( targetExtension )
    }

    function isTargetLinkingTheClosePerpLinking() {
      if ( targetToExtensionLine.parallelWith( inputLine ) ) {
        const targetOpposite: BorderCenterLinkingSegment =
          targetLinkingSegment.oppositeBcs
        const { point: targetOppositePoint } = targetOpposite
        const { start: inputStart } = inputLine

        if (
          distance( inputStart, targetLinkingPoint ) < distance( inputStart, targetOppositePoint )
        ) {
          return true
        }
      }
      return false
    }

    function isTargetLinkingTheFarPerpLinking() {
      if ( targetToExtensionLine.parallelWith( inputLine ) ) {
        const targetOpposite: BorderCenterLinkingSegment =
          targetLinkingSegment.oppositeBcs
        const { point: targetOppositePoint } = targetOpposite
        const { start: inputStart } = inputLine

        if (
          distance( inputStart, targetLinkingPoint ) >= distance( inputStart, targetOppositePoint )
        ) {
          return true
        }
      }
      return false
    }

    function isTargetLinkingTheParallelLinking() {
      return targetToExtensionLine.perpWith( inputLine )
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

  function getTurningCornerTowardsPoint(
    sourceDirection: LineTwoPoints,
    source: Point2D,
    target: Point2D
  ): Point2D {
    const line: MathSegmentLine = new MathSegmentLine(
      sourceDirection[ 0 ],
      sourceDirection[ 1 ]
    )
    const { isVertical, isHorizontal } = line
    if ( isVertical ) {
      return {
        x: source.x,
        y: target.y
      }
    }
    if ( isHorizontal ) {
      return {
        x: target.x,
        y: source.y
      }
    }
  }

  function getTurningCornerTowardsTargetLinking( sourceDirection: LineTwoPoints,
    source: Point2D, ) {
    return getTurningCornerTowardsPoint( sourceDirection, source, targetLinkingPoint )
  }
  

  function notIntersected( intersectedInfo ) {
    return !intersectedInfo.isInfinite && isEmpty( intersectedInfo.intersectd )
  }

  function isIntersected( intersectedInfo ) {
    return ! notIntersected( intersectedInfo )
  }

  function getCornerExtensionNearPoint( cornerExtensions: [Point2D, Point2D], point: Point2D ) {
    const a:Point2D = cornerExtensions[ 0 ]
    const b:Point2D = cornerExtensions[ 1 ]
    if ( distance( point, a ) < distance( point, b ) ) {
      return a
    } else {
      return b
    }
  }

  function getCornerExtensionFarPoint( cornerExtensions: [Point2D, Point2D], point: Point2D ) {
    const a:Point2D = cornerExtensions[ 0 ]
    const b:Point2D = cornerExtensions[ 1 ]
    if ( distance( point, a ) > distance( point, b ) ) {
      return a
    } else {
      return b
    }
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
