import fs from "fs";
import path from "path";
import { ScreenShotSaver, compareImages } from "./utils/screenshot";

const diffScreenshot = async () => {
  let ssSaver: ScreenShotSaver;
  ssSaver = new ScreenShotSaver();
  await ssSaver.init();
  const url = "http://localhost:8000";
  const ssDir = "./regression-test/screenshots";
  const newSs = await ssSaver.saveScreenshot(
    url,
    path.join(ssDir, `index.new.png`)
  );
  const diff = path.join(ssDir, `index.diff.png`);
  const result = await compareImages(
    newSs,
    path.join(ssDir, `index.png`),
    diff
  );
  console.log(
    "result rawMisMatchPercentage",
    "index",
    result.rawMisMatchPercentage
  );
  if (result.rawMisMatchPercentage > 0.1) {
    throw new Error("rawMisMatchPercentage > 0.1");
  }
  fs.unlinkSync(newSs);
  fs.unlinkSync(diff);
  await ssSaver.close();
};

diffScreenshot();
