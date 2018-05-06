import FlowchartStore from "./FlowchartStore";
import Flowchart from '../Flowchart';
import Draw from "../../../Draw/src/Draw";
import DrawStore from "../../../Draw/src/store/draw/DrawStore";
import DrawGetters from '../../../Draw/src/store/draw/getters';
import DrawActions from '../../../Draw/src/store/draw/actions';

export default class Getters {
  flowchartStore: FlowchartStore;
  ft: Flowchart

  constructor(flowchartStore: FlowchartStore, ft: Flowchart) {
    this.flowchartStore = flowchartStore;
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
}
