cl = console.log
cl('hello')
class HTMLDSL {
  constructor() {
    this.output = "";
    this.tagMap = {
      d: ["div"],
      p: ["p"],
      span: ["span"],
      h1: ["h1"],
      h2: ["h2"],
      h3: ["h3"],
      h4: ["h4"],
      h5: ["h5"],
      h6: ["h6"],
    };
  }

  tag(tagName, children) {
    const tags = this.tagMap[tagName];
    if (!tags) throw new Error(`Unknown tag name: ${tagName}`);
    const tag = tags[tags.length - 1];
    this.output += `<${tag}>${children}</${tag}>`;
  }

  parse(input) {
    const lines = input.trim().split("\n");
    let indentLevel = 0;
    let prevIndentLevel = 0;
    for (const line of lines) {
      indentLevel = line.search(/\S/);
      if (indentLevel % 2 === 1) {
        throw new Error(`Invalid indent level: ${indentLevel}`);
      }
      const tagName = line.trim();
      if (!tagName) {
        continue;
      }
      if (indentLevel > prevIndentLevel) {
        this.tag(tagName, "");
      } else if (indentLevel === prevIndentLevel) {
        const lastIndex = this.output.lastIndexOf(`</`);
        this.output = this.output.substring(0, lastIndex);
        this.tag(tagName, "");
      } else {
        const diff = (prevIndentLevel - indentLevel) / 2;
        for (let i = 0; i < diff; i++) {
          const lastIndex = this.output.lastIndexOf(`</`);
          this.output = this.output.substring(0, lastIndex);
          this.output += `</${this.tagMap.d[this.tagMap.d.length - 1]}>`;
        }
        const lastIndex = this.output.lastIndexOf(`</`);
        this.output = this.output.substring(0, lastIndex);
        this.tag(tagName, "");
      }
      prevIndentLevel = indentLevel;
    }
    while (this.tagMap.d.length > 1) {
      this.output += `</${this.tagMap.d.pop()}>`;
    }
    return this.output;
  }
}

const input = `d
 d
  text Hello
 d
  d
   text World!
`;

const htmlDSL = new HTMLDSL();
const output = htmlDSL.parse(input);
console.log(output);

