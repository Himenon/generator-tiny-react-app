import * as webpack from "webpack";
import * as path from "path";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import * as ManifestPlugin from "webpack-manifest-plugin";

export const generateConfig = (
  isProduction: boolean
): webpack.Configuration => {
  return {
    mode: isProduction ? "production" : "development",
    target: "web",
    optimization: {
      minimize: isProduction
    },
    entry: {
      app: "./src/index.ts",
      print: "./src/print.ts"
    },
    devtool: "inline-source-map",
    devServer: {
      contentBase: "./dist"
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: isProduction ? "Production" : "Development",
        template: "public/index.html"
      }),
      new ManifestPlugin()
    ],
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist")
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      rules: [{ test: /\.tsx?$/, loader: "ts-loader" }]
    }
  };
};

// export default generateConfig(process.env.NODE_ENV === "production");
