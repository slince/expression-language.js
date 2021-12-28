/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  preset: "ts-jest",
  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Stop running tests after `n` failures
  // bail: 0,

  // The directory where Jest should store its cached dependency information
  // cacheDirectory: "/private/var/folders/4k/ch2m2yn119x5tlghrm0tztb0k9k0_h/T/jest_a5kaxc",

  // Automatically clear mock calls, instances and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: undefined,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/tests/",
  ],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    "json",
    "text",
    "lcov",
    "clover"
  ],

  moduleDirectories: [
    "node_modules"
  ],

  // An array of file extensions your modules use
  moduleFileExtensions: [
    "js",
    "jsx",
    "ts",
    "tsx",
    "json",
  ],

  // The root directory that Jest should scan for tests and modules within
  rootDir: "./",

  // A list of paths to directories that Jest should use to search for files in
  roots: ["tests"],

  // // The glob patterns Jest uses to detect test files
  testMatch: [
    "<rootDir>/tests/*.test.[jt]s?(x)",
  ],

  testPathIgnorePatterns: [
    "/node_modules/"
  ]
};
