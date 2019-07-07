import * as webpack from "webpack";
import { generateConfig } from "./webpack.config";

const main = async () => {
  const config = generateConfig(true);
  const compiler = webpack(config);
  compiler.run(err => {
    if (err) {
      console.error(err);
    }
  });
};

main().catch(e => {
  if (e && e.message) {
    console.error(e.message);
  }
});
