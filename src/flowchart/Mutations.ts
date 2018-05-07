import FlowchartStore from "./FlowchartStore"
import Getters from "./Getters"
import Node from '../model/Node/Node';
import { notNil } from "../../../Draw/src/util/lodash/index";
import Flowchart from '../Flowchart';
import Link from '../model/Link/Link';

export default class Mutations {
  ftStore: FlowchartStore

  getters: Getters

  ft: Flowchart

  constructor( ftStore: FlowchartStore, getters: Getters, ft: Flowchart ) {
    this.ftStore = ftStore
    this.getters = getters
    this.ft = ft
  }

  /**
   * // Node
   */
  ADD_NODE( node: Node ) {
    this.ftStore.nodeList.push( node )
  }


  /**
   * // Link
   */
  ADD_LINK( link: Link ) {
    this.ftStore.linkList.push( link )
  }

  

}
