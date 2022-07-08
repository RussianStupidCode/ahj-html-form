const CONTROL_TYPES = {
  delete: 0,
  update: 1,
  create: 2,
};

export function getContolType(controlEl) {
  if (controlEl.classList.contains('delete')) {
    return CONTROL_TYPES.delete;
  }

  if (controlEl.classList.contains('update')) {
    return CONTROL_TYPES.update;
  }

  return undefined;
}

export { CONTROL_TYPES };
