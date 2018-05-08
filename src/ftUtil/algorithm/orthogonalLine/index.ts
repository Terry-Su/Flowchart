import OrthogonalLine from "../../../../../Draw/src/model/shape/OrthogonalLine/OrthogonalLine";
import Node from '../../../model/Node/Node';

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