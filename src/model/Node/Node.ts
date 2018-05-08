import Rect from "../../../../Draw/src/model/shape/Rect"
import { notNil, notUndefined } from "../../../../Draw/src/util/lodash/index"
import FlowChartParticle from "../FlowChartParticle"
import { RECT } from "../../constant/type/nodeViewTypes"
import nodeViewObjectClassMap from "../../constant/map/nodeViewObjectClassMap"
import { isNil } from "lodash"
import Segment from "../../../../Draw/src/model/Segment";
import LinkingSegment from './LinkingSegments/LinkingSegment';
import CenterLinkingSegment from './LinkingSegments/CenterLinkingSegment';
import BorderCenterLinkingSegment from './LinkingSegments/BorderCenterLinkingSegment';
import isPointInRect from "../../../../Draw/src/util/geometry/isPointInRect";

export default class Node extends FlowChartParticle {
  view: NodeView = null

  viewType: string = RECT

  x: number = 0

  y: number = 0

  width: number = Node.DEFAULT_WIDTH
  height: number = Node.DEFAULT_HEIGHT

  label: String = "unknown"

  center: Segment = null


  /**
   * Left border center segment
   */
  lbc: Segment = null

  /**
   * Top border center segment
   */
  tbc: Segment = null

  /**
   * Right border center segment
   */
  rbc: Segment = null

  /**
   * Bottom border center segment
   */
  bbc: Segment = null


  static DEFAULT_WIDTH: number = 100
  static DEFAULT_HEIGHT: number = 80

  constructor( props ) {
    super( props )

    this.x = notUndefined( props.x ) ? props.x : this.x
    this.y = notUndefined( props.y ) ? props.y : this.y

    this.width = notUndefined( props.width ) ? props.width : this.width
    this.height = notUndefined( props.height ) ? props.height : this.height

    this.label = notUndefined( props.label ) ? props.label : this.label
    this.viewType = notUndefined( props.type ) ? props.type : this.viewType

    this.view = this.createView( { node: this, draw: this.draw, fillColor: props.fillColor } )

    this.center = this.createCenter()

    this.lbc = this.createLbc()
    this.tbc = this.createTbc()
    this.rbc = this.createRbc()
    this.bbc = this.createBbc()
    
    this.mutations.ADD_NODE( this )

    this.translateTo( this.x, this.y )
  }

  /**
   * Border center segments
   */
  get bcs() {
    return [
      this.lbc, this.tbc, this.rbc, this.bbc
    ]
  }

  get linkingSegments(): any[] {
    return [ this.center, this.lbc, this.tbc, this.rbc, this.bbc ]
  }

  isPointInNodeRect( point: Point2D ): boolean {
    const { center, x, y, width, height } = this
    return isPointInRect( point, center.point, x - width / 2, y - height / 2 )
  }

  createView( props: any = {} ): any {
    const ObjectClass: any = nodeViewObjectClassMap[ this.viewType ]

    if ( isNil( ObjectClass ) ) {
      console.log( `Cannot find node type: ${this.viewType}` )
      return null
    }

    return new ObjectClass( props )
  }

  createCenterLinkingSegment( props: any = {}): CenterLinkingSegment {
    return new CenterLinkingSegment( { ...props, draw: this.draw, draggable: false, fillColor: 'firebrick', node: this } )
  }

  createBorderCenterLinkingSegment( props: any = {}): BorderCenterLinkingSegment {
    return new BorderCenterLinkingSegment( { ...props, draw: this.draw, draggable: false, fillColor: 'firebrick', node: this } )
  }

  createCenter(): Segment {
    const { x, y } = this
    return this.createCenterLinkingSegment( { x, y } )
  }

  createLbc() {
    const { x, y } = this
    const { width, height } = this
    return this.createBorderCenterLinkingSegment( { x: x - width / 2, y } )
  }

  createTbc() {
    const { x, y } = this
    const { width, height } = this
    return this.createBorderCenterLinkingSegment( { x, y: y - height / 2 } )
  }

  createRbc() {
    const { x, y } = this
    const { width, height } = this
    return this.createBorderCenterLinkingSegment( { x: x + width / 2, y } )
  }

  createBbc() {
    const { x, y } = this
    const { width, height } = this
    return this.createBorderCenterLinkingSegment( { x, y: y + height / 2 } )
  }

  translateTo( x: number, y: number ) {
    const { view } = this
    notNil( view ) && view.translateTo( x, y )
  }
}
