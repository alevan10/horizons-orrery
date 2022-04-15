import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  rootDir: ".",
  modulePaths: ["<rootDir>/src/"]
};
export default config;
