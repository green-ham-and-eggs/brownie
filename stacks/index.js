import StorageStack from "./StorageStack";
import ApiStack from "./ApiStack";
import FrontendStack from "./FrontendStack";

export default function main(app) {
  const storageStack = new StorageStack(app, "storageNew3");

  const apiStack = new ApiStack(app, "apiNew3", {
    table: storageStack.table,
  });

  new FrontendStack(app, "frontend", {
    api: apiStack.api,
    bucket: storageStack.bucket,
  });
    
}