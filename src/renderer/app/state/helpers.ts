import { PersistedModel, Id } from "app/storage";

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

export function removeItem<T>(
  array: Array<PersistedModel<T>>,
  id: Id
): Array<PersistedModel<T>> {
  return array.filter(item => item.id !== id);
}
