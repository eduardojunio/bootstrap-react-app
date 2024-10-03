export function limitText(text: string, limit = 250) {
  return text.length <= limit ? text : text.substring(0, limit) + '...';
}

export function removeUndefined(obj: object) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => {
      return value !== undefined;
    }),
  );
}
