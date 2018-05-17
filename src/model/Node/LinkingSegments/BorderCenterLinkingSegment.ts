import LinkingSegment from "./LinkingSegment"
import LinkViewOrthogonalLine from "../../Link/LinkViews/LinkViewOrthogonalLine"
import { notNil } from "../../../../../Draw/src/util/lodash/index"
import { isNil } from "lodash"
import TmpOrthogonalLinkingSegmentsLine from "./TmpLines/TmpOrthogonalLinkingSegmentsLine"
import { NODE_BORDER_CENTER } from "../../../constant/type/linkingSegmentType"
import MathSegmentLine from "../../../../../Draw/src/util/math/MathSegmentLine"
import {
  lastElement,
  firstElement,
  findArrayLastIndex,
  findArrayFirstIndex
} from "../../../../../Draw/src/util/js/array"
import MathRect from "../../../../../Draw/src/util/math/MathRect"
import TmpSimpleLinkingSegmentsLine from "./TmpLines/TmpSimpleLinkingSegmentsLine"

export default class BorderCenterLinkingSegment extends LinkingSegment {
  type: string = NODE_BORDER_CENTER

  tmpLine: TmpOrthogonalLinkingSegmentsLine

  mathRect: MathRect

  getBci: Function

  constructor( props ) {
    super( props )

    this.mathRect = props.mathRect

    this.getBci = props.getBci
  }

  get bci(): BorderCenterInfo {
    return this.getBci( this.mathRect )
  }

  get toExtensionLine(): MathSegmentLine {
    return new MathSegmentLine( this.point, this.extension )
  }

  get extension(): Point2D {
    return this.bci.extension
  }

  get prevBcs(): BorderCenterLinkingSegment {
    const { bcss } = this.node
    const array = [ ...bcss, firstElement( bcss ) ]

    const index = findArrayLastIndex( array, this )

    return notNil( index ) ? array[ index - 1 ] : null
  }

  get nextBcs(): BorderCenterLinkingSegment {
    const { bcss } = this.node
    const array = [ lastElement( bcss ), ...bcss ]

    const index = findArrayFirstIndex( array, this )

    return notNil( index ) ? array[ index + 1 ] : null
  }

  get oppositeBcs(): BorderCenterLinkingSegment {
    const { bcss } = this.node
    const { length } = bcss
    const index = findArrayLastIndex( bcss, this )

    if ( index < 2 ) {
      return bcss[ length - 2 + index ]
    } else {
      return bcss[ index - 2 ]
    }
  }

  createTmpLine( source: Point2D, moving: Point2D ) {
    return new TmpSimpleLinkingSegmentsLine( {
      draw     : this.draw,
      source,
      target   : moving,
      showArrow: true
    } )
  }

  handleDragging( event ) {
    const { tmpLine } = this
    const point: Point2D = this.getters.getInitialPoint( event )

    notNil( tmpLine ) && tmpLine.translateTargetToPoint( point )

    super.handleDragging && super.handleDragging( event )
  }

  handleStopDrag( event ) {
    const { node } = this

    const ending: Point2D = this.getters.getInitialPoint( event )
    const coincidedInfo = this.ftGetters.getCoincidedInfoPointInNode( ending )
    const { node: coincidedNode, linkingSegment } = coincidedInfo

    if ( notNil( coincidedNode ) && notNil( linkingSegment ) ) {
      this.ft.createOrthogonalLineLink( {
        source              : this.node,
        sourceLinkingSegment: this,
        target              : coincidedNode,
        targetLinkingSegment: linkingSegment
      } )
    }

    super.handleStopDrag( event )
  }
}
