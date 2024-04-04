import path from "path";
import { mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname, "asd");
const resolversArray = loadFilesSync(path.join(__dirname), {
  extensions: ["js"],
  extractExports: (fileExport) => {
    if (typeof fileExport === "function") {
      return fileExport("query_root");
    }
    return fileExport;
  },
});

export default mergeResolvers(resolversArray);
