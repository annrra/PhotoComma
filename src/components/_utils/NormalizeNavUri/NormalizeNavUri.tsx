export function NormalizeNavUri(uri: string | null | undefined): string {
  if (!uri) return '/'

  return uri
    .replace(/^\/category\//, '/') // remove category prefix
    .replace(/\/$/, '') || '/'
}

export default NormalizeNavUri;
