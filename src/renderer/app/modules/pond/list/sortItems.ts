interface ISortable {
  name: string;
  updated: Date;
}

export function sortItems(a: ISortable, b: ISortable): number {
  const aTime = a.updated.getTime();
  const bTime = b.updated.getTime();

  if (aTime < bTime) {
    return 1;
  } else if (aTime > bTime) {
    return -1;
  }

  return a.name.localeCompare(b.name);
}
