import OrthogonalLine from "../../../../../Draw/src/model/shape/OrthogonalLine/OrthogonalLine";
import Node from '../../../model/Node/Node';
import LinkingSegment from '../../../model/Node/LinkingSegments/LinkingSegment';
import BorderCenterLinkingSegment from '../../../model/Node/LinkingSegments/BorderCenterLinkingSegment';
import Link from '../../../model/Link/Link';
import LinkViewOrthogonalLine from '../../../model/Link/LinkViews/LinkViewOrthogonalLine';
import MathSegmentLine from "../../../../../Draw/src/util/math/MathSegmentLine";
import { isSegmentLineIntersectRectAtOnlyOnePoint } from '../../geometry/index';
import { firstElement, lastElement } from "../../../../../Draw/src/util/js/array";
import { notNil } from "../../../../../Draw/src/util/lodash/index";



export function createInitializeLinkViewOrthogonalLine( link ) {
  const self = this
  const {source, target}: Link = link
  const sourceLinkingSegment: BorderCenterLinkingSegment = source.lbc
  const targetLinkingSegment: BorderCenterLinkingSegment = target.bbc

  const { point: sourceLinkingPoint, extension: sourceExtension, toExtensionLine: sourceToExtensionLine } = sourceLinkingSegment
  const { point: targetLinkingPoint, extension: targetExtension, toExtensionLine: targetToExtensionLine } = targetLinkingSegment

  const { mathRect: sourceMathRect, ft } = source
  const { mathRect: targetMathRect } = target
  

  /** 
   * Used to create basic orthogonal line with start point and end point
   */
  let tmpPoint: Point2D = {
    x: sourceLinkingPoint.x,
    y: targetLinkingPoint.y,
  }


  const points: Point2D[] = [ sourceLinkingPoint, tmpPoint, targetLinkingPoint ]
  const orthogonal: LinkViewOrthogonalLine = new LinkViewOrthogonalLine( { link, draw: link.draw, points } )

  const detectingStartSegmentLine = new MathSegmentLine(  orthogonal.endLine.source.point, orthogonal.endLine.target.point  )    
  const startLineIntersectSourceRectAtOnlyOnePoint = isSegmentLineIntersectRectAtOnlyOnePoint( detectingStartSegmentLine, sourceMathRect )

  const detectingEndSegmentLine = new MathSegmentLine(  orthogonal.endLine.source.point, orthogonal.endLine.target.point  )  
  const endLineIntersectSourceRectAtOnlyOnePoint = isSegmentLineIntersectRectAtOnlyOnePoint( detectingEndSegmentLine, targetMathRect )
  
  if ( ! startLineIntersectSourceRectAtOnlyOnePoint ) {
    console.log('bingo !startLineIntersectSourceRectAtOnlyOnePoint')

    removeFirstCorner()
    createNewCornerBetweenSourceExtensionAndTarget()
    createSourceExtensionAsCorner()
    refreshOrthogonal()
  }

  
  if ( !endLineIntersectSourceRectAtOnlyOnePoint ) {
    console.log('bingo !endLineIntersectSourceRectAtOnlyOnePoint')

    removeLastCorner()
    createNewCornerBetweenTargetExtensionAndSourceExtension()
    createTargetExtensionAsCorner()
    refreshOrthogonal()
  }


  function removeFirstCorner() {
    const first = firstElement( orthogonal.cornerSegments )
    notNil( first ) && orthogonal.removeCornerSegment( first )
  }

  function createSourceExtensionAsCorner() {
    const { extension } = sourceLinkingSegment.bci
    orthogonal.addCornerSegmentStart( extension )
  }

  function createNewCornerBetweenSourceExtensionAndTarget() {
    const { isHorizontal, isVertical } = sourceToExtensionLine
    let newCornerPoint: Point2D = null

    if ( isHorizontal ) {
      newCornerPoint = {
        x: sourceExtension.x,
        y: targetLinkingPoint.y 
      }
    }

    if ( isVertical ) {
      newCornerPoint = {
        x: targetLinkingPoint.x,
        y: sourceExtension.y
      }
    }

    orthogonal.addCornerSegmentStart( newCornerPoint )
  }

  function refreshOrthogonal() {
    orthogonal.refresh()
  }

  function removeLastCorner() {
    const last = lastElement( orthogonal.cornerSegments )
    notNil( last ) && orthogonal.removeCornerSegment( last )
  }

  function createTargetExtensionAsCorner() {
    orthogonal.addCornerSegmentEnd( targetExtension )
  }

  function createNewCornerBetweenTargetExtensionAndSourceExtension() {
    const { isHorizontal, isVertical } = targetToExtensionLine
    let newCornerPoint: Point2D = null

    if ( isHorizontal ) {
      newCornerPoint = {
        x: targetExtension.x,
        y: sourceExtension.y 
      }
    }

    if ( isVertical ) {
      newCornerPoint = {
        x: targetExtension.x,
        y: sourceExtension.y
      }
    }

    orthogonal.addCornerSegmentEnd( newCornerPoint )
  }

}

export default function connectOrthogonalLine(orthogonalLine, {
  sourceNode,
  sourcePoint,
  targetNode,
  targetPoint,
}: {
  sourceNode?: Node,
  sourcePoint?: Point2D,
  targetNode?: Node,
  targetPoint: Point2D
} ) {
  console.log( sourceNode, sourcePoint, targetNode, targetPoint )

  orthogonalLine.translateTargetToPoint && orthogonalLine.translateTargetToPoint( targetPoint )
}


