import StorageStack from "./StorageStack";
import ApiStack from "./ApiStack";

export default function main(app) {
  const storageStack = new StorageStack(app, "storageNew");

  new ApiStack(app, "apiNew", {
    table: storageStack.table,
  });
}