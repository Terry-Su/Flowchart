import Line from "../../../../../Draw/src/model/shape/Line"
import Link from "../Link"
import { setLinkViewObjectCommonProps } from "../../../ftUtil/link/linkView/index"
import { notNil } from "../../../../../Draw/src/util/lodash/index";
import Segment from "../../../../../Draw/src/model/Segment";
import Draw from "../../../../../Draw/src/Draw";

export default class LinkViewSimpleLine extends Line {
  link: Link

  constructor( props ) {
    super( setPropsDangerously( props ) )

    this.link = props.link

    setLinkViewObjectCommonProps( this, this.link )

    function setPropsDangerously( props: any ) {
      props.draggable = false
      return props
    }
  }  
}
