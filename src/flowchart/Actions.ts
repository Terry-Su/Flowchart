import FlowchartStore from "./FlowchartStore"
import Getters from "./Getters"
import Flowchart from '../Flowchart';

export default class Actions {
  ftStore: FlowchartStore

  getters: Getters

  ft: Flowchart

  constructor( ftStore: FlowchartStore, getters: Getters, ft: Flowchart ) {
    this.ftStore = ftStore
    this.getters = getters
    this.ft = ft
  }

}
