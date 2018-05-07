import Rect from "../../../../../Draw/src/model/shape/Rect";
import Flowchart from '../../../Flowchart';
import Node from '../Node';
import setNodeViewObjectCommonProps from '../../../ftUtil/node/nodeView/index';
import { getPropsSetDraw } from '../../../ftUtil/node/nodeView/index';
import { notNil, notUndefined } from "../../../../../Draw/src/util/lodash/index";
import setClassPropWithPropsOrDefault from "../../../../../Draw/src/util/js/setClassPropWithPropsOrDefault";

export default class NodeViewRect extends Rect {
  node: Node

  static DEFAULT_WIDTH: number = 100
  static DEFAULT_HEIGHT: number = 80

  constructor( props ) {
    super( setPropsDangerously( props ) )

    this.node = props.node

    setNodeViewObjectCommonProps( this, this.node )

    function setPropsDangerously( props ) {
      props.width = notUndefined( props.width ) ? props.width : NodeViewRect.DEFAULT_WIDTH
      props.height = notUndefined( props.height ) ? props.height : NodeViewRect.DEFAULT_HEIGHT
      props.rotatable = false
      props.sizable = false
      return props
    }
  }

}