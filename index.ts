import * as Generator from 'yeoman-generator'
import * as _s from "underscore.string";
import * as ReadPkgUp from "read-pkg-up";

interface PromptResult {
  projectName: string;
  description: string;
  repositoryName: string;
  authorName: string;
  authorEmail: string;
  authorUrl: string;
}

export = class extends Generator {
  constructor(args: string|string[], options: {}) {
    super(args, options);
  }

  private _mv(from: string, to: string) {
    this.fs.move(this.destinationPath(from), this.destinationPath(to));
  }

  public async _prompting(): Promise<PromptResult> {
    const readResult = ReadPkgUp.sync({ normalize: false });
    const pkg = readResult ? readResult.packageJson : {};
    const author = pkg.author;
    const inputAuthor = typeof author === "string" ? {
      name: author,
    } : {
      name: author && author.name,
      email: author && author.email,
      url: author && author.url,
    };
    const repository = typeof pkg.repository === "string" ? {
      name: pkg.repository,
    } : {
      name: pkg.repository ? pkg.repository.url : "",
    };
    const questions: Generator.Questions<PromptResult> = [
      {
        type: "input",
        name: "projectName",
        message: "Your project name",
        default: pkg.name || _s.slugify(this.appname), // Default to current folder name
      },
      {
        type: "input",
        name: "description",
        message: "Project description",
        default: pkg.description,
      },
      {
        type: "input",
        name: "repositoryName",
        message: "Repository name",
        default: repository.name,
      },
      {
        type: "input",
        name: "authorName",
        message: "Author name",
        default: inputAuthor.name,
      },
      {
        type: "input",
        name: "authorEmail",
        message: "Author email",
        default: inputAuthor.email,
      },
      {
        type: "input",
        name: "authorUrl",
        message: "Profile url",
        default: inputAuthor.url,
      },
    ]
    return this.prompt(questions);
  }

  public async init() {
    const templateOptions = await this._prompting();
    this.fs.copyTpl(
      `${this.templatePath()}/**`,
      this.destinationPath(),
      templateOptions
    )
    const dotFiles = [
      "eslintrc.js",
      "gitignore",
      "huskyrc",
      "lintstagedrc",
      "npmrc",
      "npmrc.template",
      "travis.yml",
      "yarnrc",
    ]
    dotFiles.forEach(dotFile => this._mv(`_${dotFile}`, `.${dotFile}`));
    this._mv("_package.json", "package.json");
    this._mv("_README.md", "README.md");
    this._mv("_LICENSE", "LICENSE");
  }

  public install() {
    const dependencyPackages: string[] = Object.entries({
      "react": "^16.10.2",
      "react-dom": "^16.10.2"
    }).map(entry => `${entry[0]}@${entry[1]}`);;
    const devDependencyPackages: string[] = Object.entries({
      "@babel/core": "^7.6.2",
      "@babel/preset-env": "^7.6.2",
      "@types/clean-webpack-plugin": "^0.1.3",
      "@types/gh-pages": "^2.0.1",
      "@types/html-webpack-plugin": "^3.2.0",
      "@types/mini-css-extract-plugin": "^0.8.0",
      "@types/react": "^16.9.5",
      "@types/react-dom": "^16.9.1",
      "@types/webpack": "^4.4.34",
      "@types/webpack-dev-server": "^3.1.6",
      "@typescript-eslint/eslint-plugin": "^1.12.0",
      "@typescript-eslint/eslint-plugin-tslint": "^1.12.0",
      "@typescript-eslint/parser": "^1.12.0",
      "@typescript-eslint/typescript-estree": "^1.12.0",
      "autoprefixer": "^9.6.4",
      "babel-loader": "^8.0.6",
      "clean-webpack-plugin": "^3.0.0",
      "cross-env": "^5.2.0",
      "css-loader": "^3.2.0",
      "eslint": "^6.5.1",
      "eslint-config-prettier": "^6.4.0",
      "eslint-plugin-prettier": "^3.1.1",
      "eslint-plugin-react": "^7.16.0",
      "eslint-plugin-react-hooks": "^2.1.2",
      "fibers": "^4.0.1",
      "fork-ts-checker-notifier-webpack-plugin": "^1.0.2",
      "fork-ts-checker-webpack-plugin": "^1.5.0",
      "friendly-errors-webpack-plugin": "^1.7.0",
      "gh-pages": "^2.1.1",
      "html-webpack-plugin": "^3.2.0",
      "husky": "^3.0.8",
      "lint-staged": "^9.4.1",
      "mini-css-extract-plugin": "^0.8.0",
      "optimize-css-assets-webpack-plugin": "^5.0.3",
      "postcss-loader": "^3.0.0",
      "prettier": "^1.18.2",
      "progress-bar-webpack-plugin": "^1.12.1",
      "sass": "^1.23.0",
      "sass-loader": "^8.0.0",
      "serve": "^11.0.2",
      "sort-package-json": "^1.22.1",
      "style-loader": "^1.0.0",
      "terser-webpack-plugin": "^2.1.2",
      "ts-loader": "^6.0.4",
      "ts-node": "^8.3.0",
      "typescript": "^3.6.3",
      "webpack": "4.39.3",
      "webpack-cli": "^3.3.8",
      "webpack-dev-server": "^3.8.2",
      "webpack-manifest-plugin": "^2.2.0",
      "webpack-notifier": "^1.8.0"
    }).map(entry => `${entry[0]}@${entry[1]}`);;
    this.yarnInstall(dependencyPackages, { dev: false })
    this.yarnInstall(devDependencyPackages, { dev: true })
  }

  public git() {
    this.spawnCommandSync("git", ["init"]);
  }
};
