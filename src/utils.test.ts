import { describe, it, expect } from "vitest";
import { highlightKeywords } from "./utils";

describe("highlightKeywords", () => {
  const testKeywords = ["diversity", "equity", "inclusion"];

  it("should highlight exact matches", () => {
    const input = "We value diversity and equity.";
    const result = highlightKeywords(input, testKeywords);
    expect(result).toContain('<span class="highlighted">diversity</span>');
    expect(result).toContain('<span class="highlighted">equity</span>');
  });

  it("should be case insensitive", () => {
    const input = "DIVERSITY Equity dIvErSiTy";
    const result = highlightKeywords(input, testKeywords);
    expect(result).toContain('<span class="highlighted">DIVERSITY</span>');
    expect(result).toContain('<span class="highlighted">Equity</span>');
    expect(result).toContain('<span class="highlighted">dIvErSiTy</span>');
  });

  it("should only match whole words", () => {
    const input = "diversityequity biodiversity";
    const result = highlightKeywords(input, testKeywords);
    expect(result).not.toContain('<span class="highlighted">diversity</span>');
    expect(result).not.toContain('<span class="highlighted">equity</span>');
  });

  it("should handle multiple occurrences", () => {
    const input = "equity and more equity";
    const result = highlightKeywords(input, testKeywords);
    const matches = result.match(/<span class="highlighted">equity<\/span>/g);
    expect(matches).toHaveLength(2);
  });

  it("should handle multi-word keywords", () => {
    const multiWordKeywords = ["racial equity", "social justice"];
    const input = "We need racial equity and social justice.";
    const result = highlightKeywords(input, multiWordKeywords);
    expect(result).toContain('<span class="highlighted">racial equity</span>');
    expect(result).toContain('<span class="highlighted">social justice</span>');
  });

  it("should preserve line breaks", () => {
    const input = "diversity\nequity";
    const result = highlightKeywords(input, testKeywords);
    expect(result).toContain("<br>");
    expect(result).toContain('<span class="highlighted">diversity</span>');
    expect(result).toContain('<span class="highlighted">equity</span>');
  });

  it("should handle empty input", () => {
    const input = "";
    const result = highlightKeywords(input, testKeywords);
    expect(result).toBe("");
  });

  it("should handle input with no matches", () => {
    const input = "This text contains no matching words.";
    const result = highlightKeywords(input, testKeywords);
    expect(result).toBe(input);
  });
});
