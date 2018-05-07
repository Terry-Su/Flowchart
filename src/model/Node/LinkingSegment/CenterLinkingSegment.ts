import LinkingSegment from './LinkingSegment';
import LinkViewSimpleLine from '../../Link/LinkView/LinkViewSimpleLine';
import { notNil } from '../../../../../Draw/src/util/lodash/index';
import { isNil } from 'lodash';

export default class CenterLinkingSegment extends LinkingSegment {
  constructor( props ) {
    super( props )
  }

  createTmpLinkView( source: Point2D, moving: Point2D ) {
    return new LinkViewSimpleLine( { draw: this.draw, source, target: moving, showArrow: true } )
  }

  handleStopDrag( event ) {
    const { node } = this

    const ending: Point2D = this.getters.getInitialPoint( event )
    const coincidedInfo = this.ftGetters.getCoincidedInfo( ending )
    const { node: coincidedNode  } = coincidedInfo

    if ( notNil( coincidedNode ) ) {
      this.ft.createSimpleLineLink( { source: node, target: coincidedNode } )
    }


    super.handleStopDrag( event )
  }
}
