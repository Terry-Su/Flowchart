import FlowchartStore from "./FlowchartStore"
import Getters from "./Getters"
import Node from '../model/Node/Node';
import { notNil } from "../../../Draw/src/util/lodash/index";
import Flowchart from '../Flowchart';
import Link from '../model/Link/Link';
import { removeElement } from "../../../Draw/src/util/js/array";

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

  REMOVE_NODE( node: Node ) {
		if ( notNil( node ) ) {
			const nodes: Node[] = this.ftStore.nodeList
      removeElement( nodes, node )
		}
  }
  
  REMOVE_LINK( link: Link ) {
		if ( notNil( link ) ) {
			const links: Link[] = this.ftStore.linkList
      removeElement( links, link )
		}
	}

  

}
