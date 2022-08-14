import Api from "./api";

export default class Router {
  constructor(app) {
    this.app = app;
    this.init();
  }
  init() {
    this.addRouter();
  }

  addRouter() {
    // new Api(this.app);
  }
}
