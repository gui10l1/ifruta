export default function (uri: string): string {
  return uri.split('/').reverse()[0];
}