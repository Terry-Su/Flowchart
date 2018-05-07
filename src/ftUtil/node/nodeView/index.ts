import Node from '../../../model/Node/Node';


export function getPropsSetDraw( props ) {
  props.draw = props.node.draw
  return props
}

export default function setNodeViewObjectCommonProps( classObject: any, node: Node ) {
  classObject.ft = node.ft
  classObject.ftStore = node.ftStore
  classObject.ftGetters = node.getters
  classObject.ftMutations = node.mutations
  classObject.ftActions = node.actions
}