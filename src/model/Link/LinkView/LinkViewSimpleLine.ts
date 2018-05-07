import Line from "../../../../../Draw/src/model/shape/Line"
import Link from "../Link"
import { setLinkViewObjectCommonProps } from "../../../ftUtil/link/linkView/index"

export default class LinkViewSimpleLine extends Line {
  link: Link

  constructor( props ) {
    super( setPropsDangerously( props ) )

    this.link = props.link

    setLinkViewObjectCommonProps( this, this.link )

    function setPropsDangerously( props: any ) {
      const { link }: { link: Link } = props
      const { source, target } = link

      props.sourceSegment = source.center
      props.targetSegment = target.center

      return props
    }
  }
}
