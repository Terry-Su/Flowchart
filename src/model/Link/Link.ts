import FlowChartParticle from "../FlowChartParticle"
import { SIMPLE_LINE, ORTHOGONAL_LINE } from "../../constant/type/linkViewTypes"
import { notUndefined } from "../../../../Draw/src/util/lodash/index"
import { isNil } from "lodash"
import linkViewObjectClassMap from "../../constant/map/linkViewObjectClassMap"
import Node from "../Node/Node"
import LinkViewSimpleLine from "./LinkViews/LinkViewSimpleLine"
import Segment from "../../../../Draw/src/model/Segment"
import LinkViewOrthogonalLine from "./LinkViews/LinkViewOrthogonalLine"
import { createInitializeLinkViewOrthogonalLine } from "../../ftUtil/algorithm/orthogonalLine/index"
import BorderCenterLinkingSegment from '../Node/LinkingSegments/BorderCenterLinkingSegment';

export default class Link extends FlowChartParticle {
  view: LinkView

  viewType: string = SIMPLE_LINE

  source: Node = null

  target: Node = null

  constructor( props ) {
    super( props )


    notUndefined( props.source ) && this.setSource( props.source )
    notUndefined( props.target ) && this.setTarget( props.target )

    this.viewType = notUndefined( props.type ) ? props.type : this.viewType

    this.view = this.createView( props )

    this.mutations.ADD_LINK( this )
  }

  get sourceLinkingSegment(): BorderCenterLinkingSegment {
    return this.source.rbc
  }

  get targetLinkingSegment(): BorderCenterLinkingSegment {
    return this.target.lbc
  }

  setSource( source: Node ) {
    this.source = source
    source.addLink( this )
  }

  setTarget( target: Node ) {
    this.target = target
    target.addLink( this )
  }

  createView( props: any = {} ): any {
    const { viewType } = this
    // const ObjectClass: any = linkViewObjectClassMap[ this.viewType ]

    const commonProps = {
      link     : this,
      draw     : this.draw,
      showArrow: true,
      fillColor: props.fillColor,
    }

    if ( viewType === SIMPLE_LINE ) {
      return new LinkViewSimpleLine( {
        ...commonProps,
        sourceSegment: this.source.center,
        targetSegment: this.target.center
      } )
    }

    if ( viewType === ORTHOGONAL_LINE ) {
      return createInitializeLinkViewOrthogonalLine( this )
    }

    console.log( `Cannot find link type: ${this.viewType}` )
    return null
  }

  /**
   * // Link
   */
  removeView() {
    this.view && this.view.remove()
    this.view && this.view.forceRemove && this.view.forceRemove()
  }

  remove() {
    this.source.removeLink( this )
    this.target.removeLink( this )
    this.removeView()
    this.mutations.REMOVE_LINK( this )
  }
}
