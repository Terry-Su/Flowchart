import FlowchartStore from "./FlowchartStore"
import Flowchart from "../Flowchart"
import Draw from "../../../Draw/src/Draw"
import DrawStore from "../../../Draw/src/store/draw/DrawStore"
import DrawGetters from "../../../Draw/src/store/draw/getters"
import DrawActions from "../../../Draw/src/store/draw/actions"
import generateFtId from "../ftUtil/id/generateFtId"
import Node from '../model/Node/Node';
import LinkingSegment from "../model/Node/LinkingSegments/LinkingSegment"
import {
  coincidePoint,
  anyLinkingSegmentsContain
} from "../ftUtil/coincide/index"

export default class Getters {
  ftStore: FlowchartStore
  ft: Flowchart

  constructor( ftStore: FlowchartStore, ft: Flowchart ) {
    this.ftStore = ftStore
    this.ft = ft
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
  _getCoincidedInfoPointInNode( point: Point2D, onlyNode: boolean = false ) {
    let res: any = !onlyNode ?
      {
          node          : null,
          linkingSegment: null
        } :
      null

    this.ftStore.nodeList.map( resolveNode )

    return res

    function resolveNode( node: Node ) {
      node.linkingSegments.map( findNodeAndLinkingSegment )

      if ( node.isPointInNodeRect( point ) ) {
        if ( onlyNode ) {
          res = node
        }
        if ( !onlyNode ) {
          res.node = node
        }
      }

      function findNodeAndLinkingSegment( linkingSegment: LinkingSegment ) {
        const { point: point2 } = linkingSegment
        
        if ( coincidePoint( point, point2 ) ) {
          if ( onlyNode ) {
            res = node
          }
          if ( !onlyNode ) {
            res.node = node
            res.linkingSegment = linkingSegment
          }
        }
      }
    }
  }
  /**
   * Caveat: linkling segments are included when detecting coincidence
   */
  getCoincidedInfoPointInNode( point: Point2D ) {
    return this._getCoincidedInfoPointInNode( point )
  }

  getCoincidedNodePointInNode( point: Point2D ) {
    return this._getCoincidedInfoPointInNode( point, true )
  }
}
