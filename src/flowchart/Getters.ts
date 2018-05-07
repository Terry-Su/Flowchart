import FlowchartStore from "./FlowchartStore";
import Flowchart from '../Flowchart';
import Draw from "../../../Draw/src/Draw";
import DrawStore from "../../../Draw/src/store/draw/DrawStore";
import DrawGetters from '../../../Draw/src/store/draw/getters';
import DrawActions from '../../../Draw/src/store/draw/actions';
import generateFtId from "../ftUtil/id/generateFtId";

export default class Getters {
  ftStore: FlowchartStore;
  ft: Flowchart

  constructor(ftStore: FlowchartStore, ft: Flowchart) {
    this.ftStore = ftStore;
    this.ft = ft;
  }

  get draw(): Draw {
    return this.ft.draw
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
  
  generateUniqueFtId() {
    const self = this
    let id = generateFtId()
    recurToGetUniqueId()
    return id

    function recurToGetUniqueId() {
      if ( self.ftStore.ids.includes( id ) ) {
        id = generateFtId()
        recurToGetUniqueId()
      } 
    }
  }
}
