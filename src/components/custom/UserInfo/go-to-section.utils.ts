import { GoToButtonType } from "./go-to-section.types";

export function urlToGoToButtonTypeRegex(url: string): GoToButtonType {
  const input = url.toLowerCase();

  const patterns: Array<{ type: GoToButtonType; re: RegExp }> = [
    {
      type: GoToButtonType.GITHUB,
      re: /(^|https?:\/\/|www\.)github\.com(\/|$)/i,
    },
    {
      type: GoToButtonType.LINKEDIN,
      re: /(^|https?:\/\/|www\.)linkedin\.com(\/|$)/i,
    },
  ];

  for (const p of patterns) {
    if (p.re.test(input)) return p.type;
  }

  // Se for uma URL http(s) válida ou um host com ponto (domínio), consideramos WEBSITE
  const isLikelyUrl =
    /^(https?:)?\/\//i.test(input) || /[a-z0-9-]+\.[a-z]{2,}/i.test(input);
  if (isLikelyUrl) return GoToButtonType.WEBSITE;

  return GoToButtonType.INVALID;
}
