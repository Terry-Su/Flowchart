import distance from "../../../../Draw/src/util/geometry/distance";
import { COINCIDE_POINT_RANGE } from '../../constant/coincide/index';

export function coincidePoint( point: Point2D, target: Point2D ) {
  return distance( point, target ) <= COINCIDE_POINT_RANGE
}