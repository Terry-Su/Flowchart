import FlowChartParticle from "../FlowChartParticle"
import { SIMPLE_LINE, ORTHOGONAL_LINE } from '../../constant/type/linkViewTypes';
import { notUndefined } from "../../../../Draw/src/util/lodash/index";
import { isNil } from 'lodash';
import linkViewObjectClassMap from "../../constant/map/linkViewObjectClassMap";
import Node from '../Node/Node';
import LinkViewSimpleLine from './LinkView/LinkViewSimpleLine';
import Segment from "../../../../Draw/src/model/Segment";
import LinkViewOrthogonalLine from './LinkView/LinkViewOrthogonalLine';

export default class Link extends FlowChartParticle {
  view: LinkView

  viewType: string = SIMPLE_LINE

  source: Node = null

  target: Node = null

  constructor( props ) {
    super( props )

    this.source = notUndefined( props.source ) ? props.source : this.source
    this.target = notUndefined( props.target ) ? props.target : this.target

    this.viewType = notUndefined( props.type ) ? props.type : this.viewType
    
    this.view = this.createView( {   } )

    this.mutations.ADD_LINK( this )
  }

  createView( props ) {
    const { viewType } = this
    // const ObjectClass: any = linkViewObjectClassMap[ this.viewType ]

    const commonProps = {
      link: this,
      draw: this.draw,
      showArrow: true, 
      fillColor: props.fillColor
    }

    if ( viewType === SIMPLE_LINE ) {
      return new LinkViewSimpleLine( {
        ...commonProps,
        sourceSegment: this.source.center,
        targetSegment: this.target.center,
      } )
    }

    if ( viewType === ORTHOGONAL_LINE ) {
      return new LinkViewOrthogonalLine( {
        ...commonProps,
        points: [
          this.source.center.point,
          this.target.center.point,
        ]
      } )
    }
    
    else {
      console.log( `Cannot find link type: ${this.viewType}` )
      return null
    }

    return new ObjectClass( props )
  }
}
