import Link from "../Link"
import { setLinkViewObjectCommonProps, getInitialPoints } from '../../../ftUtil/link/linkView/index';
import OrthogonalLine from "../../../../../Draw/src/model/shape/OrthogonalLine/OrthogonalLine";

export default class LinkViewOrthogonalLine extends OrthogonalLine {
  link: Link

  constructor( props ) {
    super( setPropsDangerously( props ) )

    this.link = props.link

    setLinkViewObjectCommonProps( this, this.link )

    function setPropsDangerously( props: any ) {
      const { link }: { link: Link } = props
      const { source, target } = link
      props.points = getInitialPoints( source, target )
      return props
    }
  }
}
