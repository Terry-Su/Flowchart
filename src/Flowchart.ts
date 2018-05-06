import FlowchartStore from "./flowchart/FlowchartStore"
import Getters from "./flowchart/Getters"
import Mutations from "./flowchart/Mutations"
import Actions from "./flowchart/Actions"
import Draw from "../../Draw/src/Draw";

export default class Flowchart {
  draw: Draw
  ftStore: FlowchartStore
  getters: Getters
  mutations: Mutations
  actions: Actions
  

  constructor( canvas: HTMLCanvasElement ) {
    this.draw = new Draw( canvas )
    const ftStore: FlowchartStore = new FlowchartStore()
    this.ftStore = ftStore

    const getters = new Getters( ftStore, this )
    this.getters = getters

    const mutations = new Mutations( ftStore, getters, this )
    this.mutations = mutations

    const actions = new Actions( ftStore, getters, this )
    this.actions = actions
  }

  addNode( props: any = {} ) {
    this.mutations.ADD_NODE( {
      ...props,
      ft: this
    } )
  }

  render() {
    this.draw.render()
  }

}
