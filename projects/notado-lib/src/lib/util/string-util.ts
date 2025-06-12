// @dynamic
export class StringUtil {

  public static removeWhitespace(text: string) {
    return text.replace(/ /g, '');
  }

  public static replaceAllNewLInes(text: string) {
    return text.replace(/(?:\r\n|\r|\n)/g, '<br />');
  }

  public static removeInnerQuotation(text: string): string {
    if (!text) {
      return '';
    }
    let result: string = text.replace('"', '');
    result = result.replace('"', '');
    return result;
  }

  public static cleanupUrl(url: string) {
    if (url.startsWith('www.')) {
      url = url.substring(4);
    }
    if (url.endsWith('/')) {
      url = url.slice(0, -1);
    }
    return url;
  }

}
