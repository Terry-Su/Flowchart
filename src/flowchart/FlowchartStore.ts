import Node from '../model/Node/Node';
import Link from '../model/Link/Link';

export default class FlowchartStore {
  nodeList: Node[] = []

  linkList: Link[] = []


  get nodeIds(): string[] {
    return this.nodeList.map( ( { id } ) => id )
  }

  get linkIds(): string[] {
    return this.linkList.map( ( { id } ) => id )
  }

  get ids(): string[] {
    return [
      ...this.nodeIds,
      ...this.linkIds
    ]
  }
  
}
