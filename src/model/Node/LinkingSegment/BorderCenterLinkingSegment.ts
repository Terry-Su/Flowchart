import LinkingSegment from './LinkingSegment';
import LinkViewOrthogonalLine from '../../Link/LinkView/LinkViewOrthogonalLine';
import { notNil } from '../../../../../Draw/src/util/lodash/index';
import { isNil } from 'lodash';

export default class BorderCenterLinkingSegment extends LinkingSegment {
  constructor( props ) {
    super( props )
  }

  createTmpLinkView( source: Point2D, moving: Point2D ) {
    return new LinkViewOrthogonalLine( { draw: this.draw, points: [ source, moving ] } )
  }

  handleStopDrag( event ) {
    const { node } = this

    const ending: Point2D = this.getters.getInitialPoint( event )
    const coincidedInfo = this.ftGetters.getCoincidedInfo( ending )
    const { node: coincidedNode, linkingSegment  } = coincidedInfo

    if ( notNil( coincidedNode ) && isNil( linkingSegment )) {
      this.ft.createOrthogonalLineLink( { source: coincidedNode, target: coincidedNode } )
    }

    if ( notNil( coincidedNode ) && notNil( linkingSegment )) {

    }


    super.handleStopDrag( event )
  }
}