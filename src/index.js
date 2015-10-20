class Module {
  constructor(name) {
    this.name = name;
  }
}

if (ON_TEST) {
  require('./index.spec')(Module);
}

export default Module