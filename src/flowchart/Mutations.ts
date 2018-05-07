import FlowchartStore from "./FlowchartStore"
import Getters from "./Getters"
import Node from '../model/Node/Node';
import { notNil } from "../../../Draw/src/util/lodash/index";
import Flowchart from '../Flowchart';

export default class Mutations {
  ftStore: FlowchartStore

  getters: Getters

  ft: Flowchart

  constructor( ftStore: FlowchartStore, getters: Getters, ft: Flowchart ) {
    this.ftStore = ftStore
    this.getters = getters
    this.ft = ft
  }

  ADD_NODE( props: any = {} ) {
    const { getters } = this
    const node: Node = new Node( {
      ...props,
    } )

    this.ftStore.nodeList.push( node )

    return node
  }

  

}
