import OrthogonalLine from "../../../../../Draw/src/model/shape/OrthogonalLine/OrthogonalLine";
import Node from '../../../model/Node/Node';
import LinkingSegment from '../../../model/Node/LinkingSegments/LinkingSegment';
import BorderCenterLinkingSegment from '../../../model/Node/LinkingSegments/BorderCenterLinkingSegment';



export function initializeLinkViewOrthogonalLine( source: Node, target: Node ) {
  const sourceLinkingSegment: BorderCenterLinkingSegment = source.tbc
  const targetLinkingSegment: BorderCenterLinkingSegment = target.tbc

  const { rectUtil: sourceRectUtil } = source
  const { rectUtil: targetRectUtil } = target
  

  const { toExtensionLine: sourceToExtensionLine } =  sourceLinkingSegment
  const { toExtensionLine: targetToExtensionLine } =  targetLinkingSegment


  /**
   * Used to create basic orthogonal line with start point and end point
   */
  let tmpPoint: Point2D = null




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


