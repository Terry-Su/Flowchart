import FlowchartStore from "./flowchart/FlowchartStore";
import Getters from "./flowchart/Getters";
import Mutations from "./flowchart/Mutations";
import Actions from "./flowchart/Actions";
import Draw from "../../Draw/src/Draw";
import DrawStore from "../../Draw/src/store/draw/DrawStore";
import DrawGetters from "../../Draw/src/store/draw/getters";
import DrawActions from "../../Draw/src/store/draw/actions";
import Node from "./model/Node/Node";
import Link from "./model/Link/Link";

export default class Flowchart {
  draw: Draw;
  ftStore: FlowchartStore;
  getters: Getters;
  mutations: Mutations;
  actions: Actions;

  constructor(canvas: HTMLCanvasElement) {
    this.draw = new Draw(canvas);
    const ftStore: FlowchartStore = new FlowchartStore();
    this.ftStore = ftStore;

    const getters = new Getters(ftStore, this);
    this.getters = getters;

    const mutations = new Mutations(ftStore, getters, this);
    this.mutations = mutations;

    const actions = new Actions(ftStore, getters, this);
    this.actions = actions;
  }

  get drawStore(): DrawStore {
    return this.draw.drawStore;
  }

  get drawGetters(): DrawGetters {
    return this.draw.getters;
  }

  get drawActions(): DrawActions {
    return this.draw.actions;
  }

  /**
   * // Node
   */

  createNode(props: any = {}) {
    const node: Node = new Node({
      ...props,
      ft: this
    });
    return node;
  }

  addNode(props: any = {}) {
    const node: Node = this.createNode(props);
    this.mutations.ADD_NODE(node);
    return node;
  }

  /**
   * // Link
   */

  createLink(props: any = {}) {
    const link: Link = new Link({
      ...props,
      ft: this
    });
    return link;
  }

  addLink(props: any = {}) {
    const link: Link = this.createLink(props);
    this.mutations.ADD_LINK(link);
    return link;
  }

  render() {
    this.draw.render();
  }
}
