import { PersistedModel } from "app/storage";

export function replaceItem<T>(
  array: Array<PersistedModel<T>>,
  newItem: PersistedModel<T>
): Array<PersistedModel<T>> {
  return array.map(item => {
    if (item.id === newItem.id) {
      return newItem;
    }

    return item;
  });
}
