import Rect from "../../../../../Draw/src/model/shape/Rect";
import Flowchart from '../../../Flowchart';
import Node from '../Node';
import setNodeViewObjectCommonProps from '../../../ftUtil/node/nodeView/index';
import { notNil, notUndefined } from "../../../../../Draw/src/util/lodash/index";

export default class NodeViewRect extends Rect {
  node: Node


  constructor( props ) {
    super( setPropsDangerously( props ) )

    this.node = props.node

    setNodeViewObjectCommonProps( this, this.node )

    function setPropsDangerously( props ) {
      props.width = notUndefined( props.width ) ? props.width : Node.DEFAULT_WIDTH
      props.height = notUndefined( props.height ) ? props.height : Node.DEFAULT_HEIGHT
      props.rotatable = false
      props.sizable = false
      return props
    }
  }
}