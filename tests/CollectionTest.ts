import "reflect-metadata";
import { Collection } from "@Infrastructure/Stores";

type Model = { text: string };

test("CollectionStore", () => {
  const collection = new Collection<Model>();
  const [
    model1,
    model2,
    model3,
  ] = collection.add(
    { text: "1" },
    { text: "2" },
    { text: "3" }
  );
  expect(collection.items).toHaveLength(3);
  collection.remove(model2);
  expect(collection.items).toEqual([model1, model3]);
});