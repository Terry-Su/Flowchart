import MathSegmentLine from "../../../../Draw/src/util/math/MathSegmentLine";
import MathRect from "../../../../Draw/src/util/math/MathRect";

export function isSegmentLineIntersectRectAtOnlyOnePoint( segmentLine: MathSegmentLine, rect: MathRect ) {
  const { isInfinite, intersectd } = rect.intersectSegmentLineInfo( segmentLine )
  return !isInfinite && intersectd.length === 1
}