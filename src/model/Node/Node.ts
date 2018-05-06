import Rect from "../../../../Draw/src/model/shape/Rect";
import { notNil } from "../../../../Draw/src/util/lodash/index";
import FlowChartParticle from '../FlowChartParticle';
import { RECT } from "../../../../Draw/src/store/constant/cellType";

export default class Node extends FlowChartParticle {
  view: Rect
  x: number = 0;
  y: number = 0;
  label: String = "unknown"

  constructor(props) {
    super( props )

    this.label = notNil(props.label) ? props.label : this.label;

    const { defaultWidth, defaultHeight } = this;

    this.view = this.draw.addElement( RECT, { width: notNil(props.width) ? props.width : defaultWidth, height: notNil(props.width) ? props.width : defaultHeight, draw: this.draw } )
    
    this.translateTo(
      notNil(props.x) ? props.x : this.x,
      notNil(props.y) ? props.y : this.y,
    );

    console.log( this.view )
  }

  get defaultWidth(): number {
    return 50;
  }

  get defaultHeight(): number {
    return 30;
  }

  translateTo(x: number, y: number) {
    const { view } = this
    view.left = x - view.width / 2;
    view.top = y + view.height / 2;
  }
}
