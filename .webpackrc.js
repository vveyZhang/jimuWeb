const path = require("path");
const pageCount=10
export default {
  entry: {
    app: path.resolve(__dirname, "src/index.js"),
    vendor: [
      "react",
      "classnames",
      "dva",
      "prop-types",
      "lodash-decorators"
    ]
  },
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr']
    }
  },

  extraBabelPlugins: [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }]
  ],
  browserslist: ["> 1%", "last 2 versions", "not ie <= 8"],
  alias: {
    components: path.resolve(__dirname, "src/components/")
  },
  html: {
    template: "./src/index.ejs",
    hash: true
  },
  extraBabelIncludes:[
    "node_modules/scratch-vm",
    "node_modules/scratch-translate-extension-languages",
    "node_modules/scratch-parser"
  ],
  disableDynamicImport: true,
  commons: [
    {
      async: "__common",
      children: true,
      minChunks(module, count) {
        if (pageCount <= 2) {
          return count >= pageCount;
        }
        return count >= pageCount * 0.5;
      }
    },
    {
      name: "vendor",
      minChunks: Infinity
    }
  ],
  proxy: {
    '/api': {
      target: "http://www.jimubiancheng.com",
      changeOrigin: true
    },
    '/project': {
      target: "http://jimu-course.oss-cn-beijing.aliyuncs.com",
      changeOrigin: true
    }
  }
};
