import Flowchart from '../Flowchart';
import Getters from '../flowchart/Getters';
import DrawStore from '../../../Draw/src/store/draw/DrawStore';
import DrawGetters from '../../../Draw/src/store/draw/getters';
import DrawActions from '../../../Draw/src/store/draw/actions';
import Actions from '../flowchart/Actions';
import FlowchartStore from '../flowchart/FlowchartStore';
import Mutations from '../flowchart/Mutations';
import Draw from '../../../Draw/src/Draw';

export default class FlowChartParticle {
  ft: Flowchart
	draw: Draw
	id: string = null

  constructor( props ) {
		this.ft = props.ft
		this.draw = props.ft.draw

		this.id = this.getters.generateUniqueFtId()		
  }

  get ftStore(): FlowchartStore {
		return this.ft.ftStore
	}

  get getters(): Getters {
		return this.ft.getters
	}

  get mutations(): Mutations {
		return this.ft.mutations
  }
  
	get actions(): Actions {
		return this.ft.actions
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