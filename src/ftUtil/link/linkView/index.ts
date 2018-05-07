import Link from "../../../model/Link/Link"
import Node from '../../../model/Node/Node';
import { notNil } from "../../../../../Draw/src/util/lodash/index";
import Segment from "../../../../../Draw/src/model/Segment";

export function setLinkViewObjectCommonProps(
  classObject: any,
  link: Link
) {
  classObject.ft = link.ft
  classObject.ftStore = link.ftStore
  classObject.ftGetters = link.getters
  classObject.ftMutations = link.mutations
  classObject.ftActions = link.actions
}



/**
 * // Orthogonal
 */
export function getInitialPoints( source: Node, target: Node ) {
  const { x: sx, y: sy } = source.center
  const { x: tx, y: ty } = target.center

  /**
   * Orthogonal point
   */
  const B: Point2D = {
    x: sx,
    y: ty
  }

  /**
   * Source border center segment
   */
  const A = getBorderCenterSegment( source, B )

  /**
   * Target border center segment
   */
  const C = getBorderCenterSegment( target, B )

  if ( notNil( A ) && notNil( C ) ) {
    return [ A, B, C ]
  }

  return []

  function getBorderCenterSegment( node: Node, orthogonalPoint: Point2D ) {
    const { x, y } = node.center
    const { x: ox, y: oy } = orthogonalPoint
    if ( x === ox ) {
      if ( y < oy ) {
        return node.bbc
      } 
      if( y > oy ) {
        return node.tbc
      }
    }

    if ( y === oy ) {
      if ( x < ox ) {
        return node.rbc
      } 
      if( x > ox ) {
        return node.lbc
      }
    }

    return null
  }
}