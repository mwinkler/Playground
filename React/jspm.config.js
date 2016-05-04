SystemJS.config({
  transpiler: "plugin-typescript",
  typescriptOptions: {
    "module": "system",
    "jsx": 2,
    "experimentalDecorators": true
  },
  map: {
    "typescript": "npm:typescript@1.8.10"
  },
  packages: {
    "app": {
      "defaultExtension": "tsx"
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "core-decorators": "npm:core-decorators@0.11.2",
    "os": "github:jspm/nodelibs-os@0.2.0-alpha",
    "plugin-typescript": "github:frankwallis/plugin-typescript@4.0.7",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "react": "npm:react@0.14.8",
    "react-dom": "npm:react-dom@0.14.8"
  },
  packages: {
    "github:frankwallis/plugin-typescript@4.0.7": {
      "map": {
        "typescript": "npm:typescript@1.8.10"
      }
    },
    "github:jspm/nodelibs-os@0.2.0-alpha": {
      "map": {
        "os-browserify": "npm:os-browserify@0.2.1"
      }
    },
    "npm:react@0.14.8": {
      "map": {
        "fbjs": "npm:fbjs@0.6.1"
      }
    }
  }
});
