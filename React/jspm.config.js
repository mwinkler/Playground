SystemJS.config({
  devConfig: {
    "map": {
      "os": "npm:jspm-nodelibs-os@0.2.0",
      "plugin-typescript": "github:frankwallis/plugin-typescript@4.0.16"
    },
    "packages": {
      "npm:jspm-nodelibs-os@0.2.0": {
        "map": {
          "os-browserify": "npm:os-browserify@0.2.1"
        }
      },
      "github:frankwallis/plugin-typescript@4.0.16": {
        "map": {
          "typescript": "npm:typescript@1.8.10"
        }
      }
    }
  },
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
    "process": "npm:jspm-nodelibs-process@0.2.0",
    "react": "npm:react@0.14.8",
    "react-dom": "npm:react-dom@0.14.8"
  },
  packages: {
    "npm:react@0.14.8": {
      "map": {
        "fbjs": "npm:fbjs@0.6.1"
      }
    }
  }
});
