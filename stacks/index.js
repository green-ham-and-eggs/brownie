import StorageStack from "./StorageStack";
import ApiStack from "./ApiStack";

export default function main(app) {
  const storageStack = new StorageStack(app, "storageNew3");

  new ApiStack(app, "apiNew3", {
    table: storageStack.table,
  });
}