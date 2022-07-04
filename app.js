const modules = {
  moduleList: {},
  define(moduleName, dependencies, callback) {
    if (!this.moduleList.hasOwnProperty(moduleName)) {
      const module = {
        moduleName,
        dependencies,
        func() {
          let result;
          callback((arg) => {
            result = arg;
          });
          return result;
        },
      };

      this.moduleList[moduleName] = module;
    }
  },

  require(modules, succ, err) {
    const modulesFnResults = [];
    modules.forEach((module) => {
      if (this.moduleList.hasOwnProperty(module)) {
        modulesFnResults.push(this.moduleList[module].func());
      }
    });
    succ(...modulesFnResults);
  },
};

// объявление модуля A
modules.define("A", [], (provide) => {
  provide(1);
});

// объявление модуля A(copy)
modules.define("A", [], (provide) => {
  provide(3);
});

// объявление модуля C
modules.define("C", [], (provide) => {
  provide(2);
});

// объявление модуля B
// modules.define("B", [], (provide) => {
//   setTimeout(() => {
//     provide(2);
//   }, 1000);
// });
// Полезная логика
modules.require(["A", "C"], (A, C) => {
  console.log(A + C);
});
