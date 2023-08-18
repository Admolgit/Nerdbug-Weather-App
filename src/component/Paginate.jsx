import _ from "lodash";

export function Paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  // convert items into lodash wrapper and convert to a regular array.
  return _(items).slice(startIndex).take(pageSize).value();
}