export function id(value) {
  return value?._id?.toString?.() || value?.toString?.() || value;
}

export function withId(value) {
  if (!value) return value;
  const result = value.toObject ? value.toObject() : { ...value };
  result.id = result._id?.toString?.() || result.id;
  delete result._id;
  delete result.__v;
  return result;
}
