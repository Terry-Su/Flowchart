import Rect from "../../../../Draw/src/model/shape/Rect";
import { notNil, notUndefined } from "../../../../Draw/src/util/lodash/index";
import FlowChartParticle from '../FlowChartParticle';
import NodeView from './NodeView/NodeView';
import { RECT } from '../../constant/type/nodeViewTypes';
import nodeViewObjectClassMap from "../../constant/map/nodeViewObjectClassMap";
import { isNil } from 'lodash'

export default class Node extends FlowChartParticle {
  view: Rect = null
  viewType: string = RECT
  x: number = 0;
  y: number = 0;
  label: String = "unknown"

  constructor(props) {
    super( props )

    this.label = notUndefined(props.label) ? props.label : this.label;
    this.viewType = notUndefined(props.type) ? props.type : this.viewType;

    this.view = this.createView( { ...props, node: this, draw: this.draw } )
    
    if ( notNil( this.view ) ) {
      this.translateTo(
        notNil(props.x) ? props.x : this.x,
        notNil(props.y) ? props.y : this.y,
      )
    }
  }

  createView( props: any = {} ): any {
    const ObjectClass: any = nodeViewObjectClassMap[ this.viewType ]
    if ( isNil( ObjectClass ) ) {
      console.log( `Cannot find type: ${ this.viewType }` )
      return null
    }

    return new ObjectClass( props )
  }

  translateTo(x: number, y: number) {
    const { view } = this
    view.left = x - view.width / 2;
    view.top = y + view.height / 2;
  }
}
