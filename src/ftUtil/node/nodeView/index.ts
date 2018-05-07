import Node from "../../../model/Node/Node"
import { notNil } from "../../../../../Draw/src/util/lodash/index"

export default function setNodeViewObjectCommonProps(
  classObject: any,
  node: Node
) {
  if ( notNil( node ) ) {
    classObject.ft = node.ft
    classObject.ftStore = node.ftStore
    classObject.ftGetters = node.getters
    classObject.ftMutations = node.mutations
    classObject.ftActions = node.actions
  }
}
