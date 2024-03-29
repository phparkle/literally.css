const fs = require("fs");
const properties = require("./properties.yml");

const css = Object.entries(properties).map(([property, values]) => {
  return values
    .map(value => {
      const classValue = value.toString()
        .replace(" ", "-")
        .replace(/([^0-9a-zA-Z_-])/, "\\$1");
      return `.${property}-${classValue} { ${property}: ${value} !important; }`;
    }).join("\n");
  }).join("\n");

fs.writeFileSync("dist/generator/really.css", css);

const markdown = Object.entries(properties)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([property, values]) => {
    return values
      .map(value => {
        const classValue = value.toString().replace(" ", "-");
        return `| ${property}-${classValue} | \`${property}: ${value} !important;\` |`;
      }).join("\n");
    }).join("\n");

fs.writeFileSync("class-reference.md", [
  "# really.css Class Reference",
  "",
  "| Class | Style |",
  "| --- | --- |",
  markdown,
].join("\n"));
