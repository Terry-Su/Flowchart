import FlowchartStore from "./flowchart/FlowchartStore"
import Getters from "./flowchart/Getters"
import Mutations from "./flowchart/Mutations"
import Actions from "./flowchart/Actions"
import Draw from "../../Draw/src/Draw";
import DrawStore from "../../Draw/src/store/draw/DrawStore";
import DrawGetters from '../../Draw/src/store/draw/getters';
import DrawActions from '../../Draw/src/store/draw/actions';

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

  get drawStore(): DrawStore {
		return this.draw.drawStore
	}

	get drawGetters(): DrawGetters {
		return this.draw.getters
	}

	get drawActions(): DrawActions {
		return this.draw.actions
	}

  addNode( props: any = {} ) {
    return this.mutations.ADD_NODE( {
      ...props,
      ft: this
    } )
  }

  render() {
    this.draw.render()
  }

}
