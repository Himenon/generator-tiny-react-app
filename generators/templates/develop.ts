import * as webpack from "webpack";
import { generateConfig } from "./webpack.config";
import * as webpackDevServer from "webpack-dev-server";

const main = async () => {
  const config = generateConfig(false);
  const compiler = webpack(config);
  const server = new webpackDevServer(compiler, {
    hot: true,
    open: true
  });
  await server.listen(8081);
};

main().catch(e => {
  if (e && e.message) {
    console.error(e.message);
  }
});
