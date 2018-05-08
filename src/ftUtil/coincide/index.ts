import distance from "../../../../Draw/src/util/geometry/distance";
import { COINCIDE_POINT_RANGE } from '../../constant/coincide/index';
import LinkingSegment from '../../model/Node/LinkingSegments/LinkingSegment';

export function coincidePoint( point: Point2D, target: Point2D ) {
  return distance( point, target ) <= COINCIDE_POINT_RANGE
}

export function anyLinkingSegmentsContain( linkingSegments: LinkingSegment[] = [], point: Point2D) {
  linkingSegments.some( linkingSegment => linkingSegment.contain( point.x, point.y ) )
}