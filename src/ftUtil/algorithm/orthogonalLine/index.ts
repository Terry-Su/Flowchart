import OrthogonalLine from "../../../../../Draw/src/model/shape/OrthogonalLine/OrthogonalLine"
import Node from "../../../model/Node/Node"
import LinkingSegment from "../../../model/Node/LinkingSegments/LinkingSegment"
import BorderCenterLinkingSegment from '../../../model/Node/LinkingSegments/BorderCenterLinkingSegment';
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
import { intersectionWith, isEqual, minBy, maxBy } from "lodash"
import MiniMap from "../../../../../Draw/src/model/tool/MiniMap"
import getCenterPoint from "../../../../../Draw/src/util/geometry/basic/getCenterPoint";

const { abs } = Math

export function createInitializeLinkViewOrthogonalLine( link: Link ) {
  const self = this
  const { sourceLinkingSegment, targetLinkingSegment }: Link = link

  const corners = getInitializeLinkViewOrthogonalLineCorners( link )

  link.drawGetters.testUtils.delayRenderPoints( corners, "black" )

  const points = [
    sourceLinkingSegment.point,
    ...corners,
    targetLinkingSegment.point
  ]
  return new LinkViewOrthogonalLine( { link, draw: link.draw, points } )
}

export function getInitializeLinkViewOrthogonalLineCorners( link: Link ) {
  const self = this
  const { source, target }: Link = link
  const { sourceLinkingSegment, targetLinkingSegment }: Link = link

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
  const isTargetLinkingOnSameLineWithSourceLinking = targetLinkingOnSameLineWithSourceLinking()

  if ( isTargetLinkingOutsideOfSourceLinking ) {
    const turningCorner: Point2D = getTurningCornerTowardsTargetLinking(
      sourceToExtensionLine.points,
      sourceLinkingPoint
    )

    const line: MathSegmentLine = new MathSegmentLine(
      sourceLinkingPoint,
      turningCorner
    )

    checkIntersectionThenConnectTargetLinking( line, true )
  }

  if ( isTargetLinkingOnSameLineWithSourceLinking ) {
    return []
  }

  if ( !isTargetLinkingOnSameLineWithSourceLinking && !isTargetLinkingOutsideOfSourceLinking ) {
    // draw the extension of source linking segment
    corners.push( sourceExtension )

    const turningCorner = getTurningCornerTowardsTargetLinking(
      sourceBci.cornerExtensions,
      sourceExtension
    )

    const line = new MathSegmentLine( turningCorner, targetLinkingPoint )

    const intersectedInfo = sourceRect.intersectSegmentLineInfo( line )
    const isIntersectSouceRect = isIntersected( intersectedInfo )

    if ( isIntersectSouceRect ) {
      const keyPoint1: any = getKeyPoint1( line )
      corners.push( keyPoint1 )

      const turningCorner2 = getTurningCornerTowardsTargetLinking(
        sourceToExtensionLine.points,
        keyPoint1
      )

      const line2 = new MathSegmentLine( keyPoint1, turningCorner2 )

      checkIntersectionThenConnectTargetLinking( line2 )
    }

    if ( !isIntersectSouceRect ) {
      checkIntersectionThenConnectTargetLinking( line )
    }
  }

  // link.draw.getters.testUtils.delayRenderPoints( corners, 'purple' )

  // console.log( corners )

  return corners

  /**
   * Main
   */

  /**
   * inputLine [ point/lingingPoint, turningCorner ]
   */
  function checkIntersectionThenConnectTargetLinking( inputLine: MathSegmentLine, fromSourceLinking: boolean = false ) {
    const turningCorner = inputLine.end
    const intersectedInfo = targetRect.intersectSegmentLineInfo( inputLine )

    const isIntersectTargetRect = isIntersected( intersectedInfo )

    if ( isIntersectTargetRect ) {
      connectTargetLinking( inputLine, fromSourceLinking )
    }

    if ( !isIntersectTargetRect ) {
      // corners.push( turningCorner )

      const inputLine2: MathSegmentLine = new MathSegmentLine(
        turningCorner,
        targetLinkingPoint
      )

      connectTargetLinking( inputLine2 )
    }
  }

  function connectTargetLinking(
    inputLine: MathSegmentLine,
    fromSourceLinking: boolean = false
  ) {
    const { start: inputStart } = inputLine

    const isNearPerpTargetLinkingBorderInputLine = isNearPerpTargetLinkingBorder( inputLine )
    const isFarPerpTargetLinkingBorderInputLine = isFarPerpTargetLinkingBorder( inputLine )
    const isParallelTargetLinkingBorderInputLine = isParallelTargetLinkingBorder( inputLine )

    if ( isNearPerpTargetLinkingBorderInputLine ) {
      if ( fromSourceLinking ) {
        const center = getCenterBetweenSourceLinkingToNearestBcsWhenIsPerpTargetLinkingBorder()
        corners.push( center )

        const turningCorner = getTurningCornerTowardsPoint(
          sourceBci.cornerExtensions,
          center,
          targetExtension
        )
        corners.push( turningCorner )
      } else {
        corners.push( inputStart )
      }
    }

    if ( isFarPerpTargetLinkingBorderInputLine ) {
      if ( fromSourceLinking ) {
        const center = getCenterBetweenSourceLinkingToNearestBcsWhenIsPerpTargetLinkingBorder()
        corners.push( center )

        const turningCorner = getTurningCornerTowardsTargetLinking(
          sourceBci.cornerExtensions,
          center,
          // targetExtension
        )

        corners.push( turningCorner )

        const line = new MathSegmentLine( center, turningCorner )
        checkIntersectionThenConnectTargetLinking( line )
      } else {
        // const center = getCenterBetweenSourceLinkingToNearestBcsWhenIsParallelTargetLinkingBorder()
        // corners.push( center )

        // const turningCorner = getTurningCornerTowardsTargetLinking(
        //   sourceBci.cornerExtensions,
        //   center,
        //   // targetExtension
        // )

        // corners.push( turningCorner )

        // const line = new MathSegmentLine( center, turningCorner )
        // checkIntersectionThenConnectTargetLinking( line )

        const { cornerExtensions } = targetBci
        const cornerExtension = getCornerExtensionNearPoint(
          cornerExtensions,
          sourceLinkingPoint
        )

        const turningCorner = getTurningCornerTowardsPoint(
          targetBci.cornerExtensions,
          inputStart,
          cornerExtension
        )

        corners.push( turningCorner )
        corners.push( cornerExtension )
        corners.push( targetExtension )
      }
    }

    if ( isParallelTargetLinkingBorderInputLine ) {
      if ( fromSourceLinking ) {
        const center = getCenterBetweenSourceLinkingToNearestBcsWhenIsParallelTargetLinkingBorder()
        corners.push( center )

        const corner = getTurningCornerTowardsPoint(
          sourceBci.cornerExtensions,
          center,
          targetExtension
        )
        corners.push( corner )
        corners.push( targetExtension )  
      } else {
        const keyPoint2 = getKeyPoint2( inputLine )
        // const corner = getTurningCornerTowardsPoint(
        //   targetToExtensionLine.points,
        //   inputStart,
        //   targetExtension
        // )
        corners.push( keyPoint2 )

        const turningCorner = getTurningCornerTowardsTargetLinking( targetBci.cornerExtensions, keyPoint2 )
        corners.push( turningCorner )
      }

    }

    function getNearestTargetBcsToSourceLinkingWhenIsParallelTargetLinkingBorder(): BorderCenterLinkingSegment {
      const prev = targetLinkingSegment.prevBcs
      const next = targetLinkingSegment.nextBcs

      if ( !next ) {
        debugger
      }
      if (
        distance( sourceLinkingPoint, prev.point ) <
        distance( sourceLinkingPoint, next.point )
      ) {
        return prev
      } else {
        return next
      }
    }

    function getCenterBetweenSourceLinkingToNearestBcsWhenIsParallelTargetLinkingBorder(): Point2D {
      const targetBcs = getNearestTargetBcsToSourceLinkingWhenIsParallelTargetLinkingBorder()
      const { x, y } = sourceLinkingPoint
      const { x: tx, y: ty } = targetBcs
      const center = sourceToExtensionLine.isVertical ?
        {
            x,
            y: ( y + ty ) / 2
          } :
        {
            x: ( x + tx ) / 2,
            y
          }
      return center
    }

    function getNearestTargetBcsToSourceLinkingWhenIsPerpTargetLinkingBorder(): BorderCenterLinkingSegment {
      const targetA = targetLinkingSegment
      const targetB = targetLinkingSegment.oppositeBcs

      if (
        distance( sourceLinkingPoint, targetA.point ) <
        distance( sourceLinkingPoint, targetB.point )
      ) {
        return targetA
      } else {
        return targetB
      }
    }

    function getCenterBetweenSourceLinkingToNearestBcsWhenIsPerpTargetLinkingBorder(): Point2D {
      const targetBcs = getNearestTargetBcsToSourceLinkingWhenIsPerpTargetLinkingBorder()
      const { x, y } = sourceLinkingPoint
      const { x: tx, y: ty } = targetBcs
      const center = sourceToExtensionLine.isVertical ?
        {
            x,
            y: ( y + ty ) / 2
          } :
        {
            x: ( x + tx ) / 2,
            y
          }
      return center
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

  function targetLinkingOnSameLineWithSourceLinking() {
    const { isVertical, isHorizontal } = sourceToExtensionLine

    if ( isVertical ) {
      return ty === sy
    }
    if ( isHorizontal ) {
      return tx === sx
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

  function getTurningCornerTowardsTargetLinking(
    sourceDirection: LineTwoPoints,
    source: Point2D
  ) {
    return getTurningCornerTowardsPoint(
      sourceDirection,
      source,
      targetLinkingPoint
    )
  }

  function getKeyPoint1( inputLine: MathSegmentLine ) {
    const { isVertical, isHorizontal } = inputLine

    if ( isPerpTargetLinkingBorder( inputLine ) ) {
      const cornerExtension = getProperSourceKeyPointA()
      return cornerExtension
    }

    if ( isParallelTargetLinkingBorder( inputLine ) ) {
      const cornerExtension = getProperSourceKeyPointB()
      return cornerExtension
    }

    function getProperSourceKeyPointA() {
      const targetA = targetLinkingSegment.prevBcs
      const targetB = targetLinkingSegment.nextBcs

      const sourceA = getSourceBcsOnSimilarRectBorder( targetA )
      const sourceB = getSourceBcsOnSimilarRectBorder( targetB )

      const targetAExtension = targetA.extension
      const targetBExtension = targetB.extension

      const sourceACornerExtension = getSourceCornerExtension( sourceA )
      const sourceBCornerExtension = getSourceCornerExtension( sourceB )

      const sourceAPossibleCorner = isVertical ?
        {
            x: targetAExtension.x,
            y: sourceACornerExtension.y
          } :
        {
            x: sourceACornerExtension.x,
            y: targetAExtension.y
          }
      const sourceBPossibleCorner = isVertical ?
        {
            x: targetBExtension.x,
            y: sourceBCornerExtension.y
          } :
        {
            x: sourceBCornerExtension.x,
            y: targetBExtension.y
          }

      const X_OR_Y = isVertical ? "x" : "y"
      const distanceTargetLinkingToSourceA = abs(
        targetLinkingPoint[ X_OR_Y ] - sourceA[ X_OR_Y ]
      )
      const distanceTargetLinkingToSourceB = abs(
        targetLinkingPoint[ X_OR_Y ] - sourceB[ X_OR_Y ]
      )

      if ( distanceTargetLinkingToSourceA < distanceTargetLinkingToSourceB ) {
        if ( targetA[ X_OR_Y ] < targetB[ X_OR_Y ] ) {
          return minBy( [ sourceACornerExtension, sourceAPossibleCorner ], X_OR_Y )
        } else {
          return maxBy( [ sourceACornerExtension, sourceAPossibleCorner ], X_OR_Y )
        }
      } else {
        if ( targetA[ X_OR_Y ] < targetB[ X_OR_Y ] ) {
          return maxBy( [ sourceBCornerExtension, sourceBPossibleCorner ], X_OR_Y )
        } else {
          return minBy( [ sourceBCornerExtension, sourceBPossibleCorner ], X_OR_Y )
        }
      }
    }

    function getProperSourceKeyPointB() {
      const targetA = targetLinkingSegment
      const targetB = targetLinkingSegment.oppositeBcs

      const sourceA = getSourceBcsOnSimilarRectBorder( targetA )
      const sourceB = getSourceBcsOnSimilarRectBorder( targetB )

      const targetAExtension = targetA.extension
      const targetBExtension = targetB.extension

      const sourceACornerExtension = getSourceCornerExtension( sourceA )
      const sourceBCornerExtension = getSourceCornerExtension( sourceB )

      const sourceAPossibleCorner = isVertical ?
        {
            x: targetAExtension.x,
            y: sourceACornerExtension.y
          } :
        {
            x: sourceACornerExtension.x,
            y: targetAExtension.y
          }
      const sourceBPossibleCorner = isVertical ?
        {
            x: targetBExtension.x,
            y: sourceBCornerExtension.y
          } :
        {
            x: sourceBCornerExtension.x,
            y: targetBExtension.y
          }

      const X_OR_Y = isVertical ? "x" : "y"

      if ( targetA[ X_OR_Y ] < targetB[ X_OR_Y ] ) {
        return minBy( [ sourceACornerExtension, sourceAPossibleCorner ], X_OR_Y )
      } else {
        return maxBy( [ sourceACornerExtension, sourceAPossibleCorner ], X_OR_Y )
      }
    }

    function getSourceCornerExtension( sourceBcs: BorderCenterLinkingSegment ) {
      return getCornerExtension( sourceBcs, sourceLinkingSegment )
    }
  }

  function getKeyPoint2( inputLine: MathSegmentLine ) {
    const { isVertical, isHorizontal, start: inputStart } = inputLine 

    const defaultCorner = getTurningCornerTowardsPoint(
      targetToExtensionLine.points,
      inputStart,
      targetExtension
    )

    const checkingLine = new MathSegmentLine( defaultCorner, targetExtension )

    const intersectedInfo = sourceRect.intersectSegmentLineInfo( checkingLine )
    const isIntersectSouceRect = isIntersected( intersectedInfo )

    if ( ! isIntersectSouceRect ) {
      return defaultCorner
    }

    if ( isIntersectSouceRect ) {
      const nearestSourceBcs = getNearestSourceBcsOnSameHOrVRectBorder()
      const center = getCenterPoint( targetLinkingPoint, nearestSourceBcs.point  )
      const corner = getTurningCornerTowardsPoint(
        targetToExtensionLine.points,
        inputStart,
        center
      )
      return corner
    }


  }


  function notIntersected( intersectedInfo ) {
    return !intersectedInfo.isInfinite && isEmpty( intersectedInfo.intersectd )
  }

  function isIntersected( intersectedInfo ) {
    return !notIntersected( intersectedInfo )
  }

  function getCornerExtensionNearPoint(
    cornerExtensions: [Point2D, Point2D],
    point: Point2D
  ) {
    const a: Point2D = cornerExtensions[ 0 ]
    const b: Point2D = cornerExtensions[ 1 ]
    if ( distance( point, a ) < distance( point, b ) ) {
      return a
    } else {
      return b
    }
  }

  function getCornerExtensionFarPoint(
    cornerExtensions: [Point2D, Point2D],
    point: Point2D
  ) {
    const a: Point2D = cornerExtensions[ 0 ]
    const b: Point2D = cornerExtensions[ 1 ]
    if ( distance( point, a ) > distance( point, b ) ) {
      return a
    } else {
      return b
    }
  }

  function isPerpTargetLinkingBorder( inputLine: MathSegmentLine ) {
    return targetToExtensionLine.parallelWith( inputLine )
  }

  function isNearPerpTargetLinkingBorder( inputLine: MathSegmentLine ) {
    if ( targetToExtensionLine.parallelWith( inputLine ) ) {
      const targetOpposite: BorderCenterLinkingSegment =
        targetLinkingSegment.oppositeBcs
      const { point: targetOppositePoint } = targetOpposite
      const { start: inputStart } = inputLine

      if (
        distance( inputStart, targetLinkingPoint ) <
        distance( inputStart, targetOppositePoint )
      ) {
        return true
      }
    }
    return false
  }

  function isFarPerpTargetLinkingBorder( inputLine: MathSegmentLine ) {
    if ( targetToExtensionLine.parallelWith( inputLine ) ) {
      const targetOpposite: BorderCenterLinkingSegment =
        targetLinkingSegment.oppositeBcs
      const { point: targetOppositePoint } = targetOpposite
      const { start: inputStart } = inputLine

      if (
        distance( inputStart, targetLinkingPoint ) >=
        distance( inputStart, targetOppositePoint )
      ) {
        return true
      }
    }
    return false
  }

  function isParallelTargetLinkingBorder( inputLine: MathSegmentLine ) {
    return targetToExtensionLine.perpWith( inputLine )
  }

  function getSourceBcsOnSimilarRectBorder(
    targetBcs: BorderCenterLinkingSegment
  ) {
    return source.bcss.filter(
      sourceBcs => sourceBcs.bci.type === targetBcs.bci.type
    )[ 0 ]
  }

  function getTargetBcsOnSimilarRectBorder(
    sourceBcs: BorderCenterLinkingSegment
  ) {
    return target.bcss.filter(
      targetBcs => targetBcs.bci.type === sourceBcs.bci.type
    )[ 0 ]
  }

  function getCornerExtension(
    bcs1: BorderCenterLinkingSegment,
    bcs2: BorderCenterLinkingSegment
  ) {
    return intersectionWith(
      bcs1.bci.cornerExtensions,
      bcs2.bci.cornerExtensions,
      isEqual
    )[ 0 ]
  }

  function getNearestSourceBcsOnSameHOrVRectBorder(  ) {
    const sourceA = getSourceBcsOnSimilarRectBorder( targetLinkingSegment )
    const sourceB = sourceA.oppositeBcs
    if (
      distance( targetLinkingPoint, sourceA.point ) <
      distance( targetLinkingPoint, sourceB.point )
    ) {
      return sourceA
    } else {
      return sourceB
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
