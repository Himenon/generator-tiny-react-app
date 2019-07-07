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
    const pkg = readResult ? readResult.package : {};
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
      "eslintrc.json",
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
    const dependencyPackages = [];
    const devDependencyPackages = [
      "@types/clean-webpack-plugin@^0.1.3",
      "@types/html-webpack-plugin@^3.2.0",
      "@types/webpack@^4.4.34",
      "@types/webpack-dev-server@^3.1.6",
      "@types/webpack-manifest-plugin@^2.0.0",
      "@typescript-eslint/eslint-plugin@^1.11.0",
      "@typescript-eslint/parser@^1.11.0",
      "clean-webpack-plugin@^3.0.0",
      "cross-env@^5.2.0",
      "eslint@^6.0.1",
      "eslint-config-prettier@^6.0.0",
      "eslint-plugin-prettier@^3.1.0",
      "html-webpack-plugin@^3.2.0",
      "prettier@^1.18.2",
      "serve@^11.0.2",
      "ts-loader@^6.0.4",
      "ts-node@^8.3.0",
      "typescript@^3.5.2",
      "webpack@^4.35.0",
      "webpack-cli@^3.3.5",
      "webpack-dev-server@^3.7.2",
      "webpack-manifest-plugin@^2.0.4"
    ];
    this.yarnInstall(dependencyPackages, { dev: false })
    this.yarnInstall(devDependencyPackages, { dev: true })
  }

  public git() {
    this.spawnCommandSync("git", ["init"]);
  }
};
