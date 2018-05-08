import OrthogonalLine from "../../../../../../Draw/src/model/shape/OrthogonalLine/OrthogonalLine";
import connectOrthogonalLine from '../../../../ftUtil/algorithm/orthogonalLine/index';
import LinkingSegment from '../LinkingSegment';
import Node from '../../Node';
import { notNil } from "../../../../../../Draw/src/util/lodash/index";

export default class TmpOrthogonalLinkingSegmentsLine extends OrthogonalLine {
  constructor( props ) {
    super( props )
  }

  translateTargetToThePoint( point: Point2D, linkingSegment: LinkingSegment ) {
    const { node: sourceNode, point: sourcePoint }: LinkingSegment = linkingSegment
    const { ft }: Node = sourceNode

    const coincidedInfo = ft.getters.getCoincidedInfoPointInNode( point )
    const { node: targetNode, linkingSegment: potentialTargetPoint } = coincidedInfo

    connectOrthogonalLine( this, {
      sourceNode,
      sourcePoint,
      targetNode,
      targetPoint: notNil( potentialTargetPoint ) ? potentialTargetPoint : point
    } )
  }
}