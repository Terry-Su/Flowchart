import Link from "../Link"
import {
  setLinkViewObjectCommonProps,
  getInitialPoints
} from "../../../ftUtil/link/linkView/index"
import OrthogonalLine from "../../../../../Draw/src/model/shape/OrthogonalLine/OrthogonalLine"
import { notNil } from "../../../../../Draw/src/util/lodash/index"
import { isNil } from 'lodash';

export default class LinkViewOrthogonalLine extends OrthogonalLine {
  link: Link

  constructor( props ) {
    super( setPropsDangerously( props ) )

    this.link = props.link

    setLinkViewObjectCommonProps( this, this.link )

    function setPropsDangerously( props: any ) {
      
      if ( isNil( props.points ) ) {
        const { source, target } = props
        props.points = getInitialPoints( source, target )
      }

      return props
    }
  }
}
