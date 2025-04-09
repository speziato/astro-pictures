import { HTMLElement } from "node-html-parser";
export default interface SourceConfig {
  readonly getCreditText: (html: HTMLElement) => string;
  readonly getDescription: (html: HTMLElement) => string;
  readonly getDescriptionUrl: (picId: string) => string;
  readonly getObjectName: (html: HTMLElement) => string;
  readonly getPicUrl: (picId: string) => string;
}
