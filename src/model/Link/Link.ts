import FlowChartParticle from "../FlowChartParticle"
import { SIMPLE_LINE, ORTHOGONAL_LINE } from "../../constant/type/linkViewTypes"
import { notUndefined, notNil } from "../../../../Draw/src/util/lodash/index"
import { isNil } from "lodash"
import linkViewObjectClassMap from "../../constant/map/linkViewObjectClassMap"
import Node from "../Node/Node"
import LinkViewSimpleLine from "./LinkViews/LinkViewSimpleLine"
import Segment from "../../../../Draw/src/model/Segment"
import LinkViewOrthogonalLine from "./LinkViews/LinkViewOrthogonalLine"
import { createInitializeLinkViewOrthogonalLine } from "../../ftUtil/algorithm/orthogonalLine/index"
import BorderCenterLinkingSegment from '../Node/LinkingSegments/BorderCenterLinkingSegment';
import { removeElement } from "../../../../Draw/src/util/js/array";

export default class Link extends FlowChartParticle {
  view: LinkView

  viewType: string = SIMPLE_LINE

  source: Node = null

  target: Node = null

  sourceLinkingSegment: BorderCenterLinkingSegment = null

  targetLinkingSegment: BorderCenterLinkingSegment = null

  constructor( props ) {
    super( props )

    notUndefined( props.source ) && this.setSource( props.source )
    notUndefined( props.target ) && this.setTarget( props.target )

    this.source.addLink( this )
    this.target.addLink( this )

    this.viewType = notUndefined( props.type ) ? props.type : this.viewType

    this.sourceLinkingSegment = notUndefined( props.sourceLinkingSegment ) ? props.sourceLinkingSegment : this.defaultSourceLinkingSegment
    this.targetLinkingSegment = notUndefined( props.targetLinkingSegment ) ? props.targetLinkingSegment : this.defaultTargetLinkingSegment

    this.view = this.createView( props )

    this.mutations.ADD_LINK( this )
  }

  get defaultSourceLinkingSegment(): BorderCenterLinkingSegment {
    return this.source.rbc
  }

  get defaultTargetLinkingSegment(): BorderCenterLinkingSegment {
    return this.target.rbc
  }

  setSource( source: Node ) {
    this.source = source
  }

  updateSource( node: Node ) {
    const { source } = this
    if ( notNil( source) ) {
      removeElement( source.links, this )
    }

    this.setSource( node )
  }

  setTarget( target: Node ) {
    this.target = target
  }

  updateTarget( node: Node ) {
    const { target } = this
    if ( notNil( target) ) {
      removeElement( target.links, this )
    }

    this.setTarget( node )
  }

  /**
   * Border center linking segment
   */
  setSourceLinkingSegment( segment: BorderCenterLinkingSegment ) {
    this.sourceLinkingSegment = segment
  }

  setTargetLinkingSegment( segment: BorderCenterLinkingSegment ) {
    this.targetLinkingSegment = segment
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
