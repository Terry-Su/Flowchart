import Segment from "../../../../Draw/src/model/Segment"
import Flowchart from '../../Flowchart';
import FlowchartStore from '../../flowchart/FlowchartStore';
import Getters from '../../flowchart/Getters';
import Mutations from '../../flowchart/Mutations';
import Actions from '../../flowchart/Actions';

export default class BasicSegment extends Segment {
  ft: Flowchart

  constructor( props ) {
    super( props )

    this.ft = props.ft
  }

  get ftStore(): FlowchartStore {
		return this.ft.ftStore
	}

  get ftGetters(): Getters {
		return this.ft.getters
	}

  get ftMutations(): Mutations {
		return this.ft.mutations
  }
  
	get ftActions(): Actions {
		return this.ft.actions
	}
}
