import SourceConfig from "../types/Source/SourceConfig.js";

const creditQuery = ".credit > p:nth-child(1)";
const descriptionQuery = ".col-md-9 > p > em";
const descriptionRegex = /\[Image Description: (.*)\]/;
const objectQuery = `table[aria-describedby="About the Object"]:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > a:nth-child(1)`;

const ESAConfig: SourceConfig = {
  getCreditText: html => html.querySelector(creditQuery)?.innerText || "",
  getDescription: html =>
    html
      .querySelector(descriptionQuery)
      ?.closest("p") // the query gets the <em> element, we need the parent
      ?.innerText?.replace(descriptionRegex, "$1") || "",
  getDescriptionUrl: picId => `https://esahubble.org/images/${picId}/`,
  getObjectName: html => html.querySelector(objectQuery)?.innerText || "",
  getPicUrl: picId =>
    `https://cdn.esahubble.org/archives/images/large/${picId}.jpg`,
} as const;

export default ESAConfig;
