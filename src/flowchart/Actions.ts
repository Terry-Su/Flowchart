import FlowchartStore from "./FlowchartStore"
import Getters from "./Getters"
import Flowchart from '../Flowchart';

export default class Actions {
  flowchartStore: FlowchartStore

  getters: Getters

  ft: Flowchart

  constructor( flowchartStore: FlowchartStore, getters: Getters, ft: Flowchart ) {
    this.flowchartStore = flowchartStore
    this.getters = getters
    this.ft = ft
  }

}
