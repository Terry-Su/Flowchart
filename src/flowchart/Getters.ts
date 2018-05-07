import FlowchartStore from "./FlowchartStore";
import Flowchart from '../Flowchart';
import Draw from "../../../Draw/src/Draw";
import DrawStore from "../../../Draw/src/store/draw/DrawStore";
import DrawGetters from '../../../Draw/src/store/draw/getters';
import DrawActions from '../../../Draw/src/store/draw/actions';
import generateFtId from "../ftUtil/id/generateFtId";
import Node from '../model/Node/Node';
import LinkingSegment from '../model/Node/LinkingSegment/LinkingSegment';
import { coincidePoint } from '../ftUtil/coincide/index';

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


  /**
   * // LinkingSegment
   */
  getCoincidedInfo( point: Point2D ) {
    let res = {
      node: null,
      linkingSegment: null
    }

    this.ftStore.nodeList.map( resolveNode )

    return res

    function resolveNode( node: Node ) {
        node.linkingSegments.map( resolve )

        if ( node.isPointInNodeRect( point ) ) {
          res.node = node
        }

        function resolve( linkingSegment: LinkingSegment ) {
            const { point: point2 } = linkingSegment
            if ( coincidePoint( point, point2 ) ) {
              res.node = node
              res.linkingSegment = linkingSegment
            }
        }
    }
  }
}
