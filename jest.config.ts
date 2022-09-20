const { defaults } = require("jest-config");
import type { Config } from "@jest/types";

const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");

const paths = compilerOptions.paths;
delete paths["*"];

const mapper = pathsToModuleNameMapper(compilerOptions.paths);
Object.keys(mapper).map(key => {
  mapper[key] = mapper[key].replace(/^\./, "<rootDir>");
});

const ext = [
  "css|less|scss|pcss",
  "ico|woff2|eot|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf",
  "woff|mp4|webm|wav|mp3|m4a|aac|oga",
].join("|");


const config: Config.InitialOptions = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  clearMocks: true,
  moduleNameMapper: {
    ...mapper,
    "tinymce$": "identity-obj-proxy",
    [`\\.(${ext})$`]: "identity-obj-proxy"
  },
  coverageProvider: "v8",
  rootDir: "./",
  roots: [
    "<rootDir>/tests"
  ],
  testMatch: [
    "**/*Test.ts"
  ]
};

export default config;