import puppeteer from "puppeteer";
const resemble = require("resemblejs");
import fs from "fs";

export class ScreenShotSaver {
  private browser: puppeteer.Browser;
  private context: puppeteer.BrowserContext;

  async init() {
    this.browser = await puppeteer.launch({ headless: true });
    this.context = await this.browser.createIncognitoBrowserContext();
  }

  async close() {
    await this.browser.close();
  }

  async saveScreenshot(url: string, dist: string) {
    console.log("start saving screenshot", url, "to", dist);
    const page = await this.context.newPage();
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 60000
    });
    await page.screenshot({ path: dist, fullPage: true });
    console.log("saved screenshot", url, "as", dist);
    return dist;
  }
}

interface CompareResult {
  isSameDimensions: boolean;
  dimensionDifference: { width: number; height: number };
  rawMisMatchPercentage: number;
  misMatchPercentage: string;
  diffBounds: { top: number; left: number; bottom: number; right: number };
  analysisTime: number;
  getImageDataUrl: () => any;
  getBuffer: () => any;
}

export const compareImages = (
  path1: string,
  path2: string,
  diffFileName: string
) => {
  const image1 = fs.readFileSync(path2);
  const image2 = fs.readFileSync(path1);

  return new Promise<CompareResult>(res => {
    resemble(image1)
      .compareTo(image2)
      .onComplete((data: CompareResult) => {
        fs.writeFileSync(diffFileName, data.getBuffer());
        res(data);
      });
  });
};
