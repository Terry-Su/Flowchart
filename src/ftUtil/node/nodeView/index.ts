import Node from '../../../model/Node/Node';


export default function setNodeViewObjectCommonProps( classObject: any, node: Node ) {
  classObject.ft = node.ft
  classObject.ftStore = node.ftStore
  classObject.ftGetters = node.getters
  classObject.ftMutations = node.mutations
  classObject.ftActions = node.actions
}