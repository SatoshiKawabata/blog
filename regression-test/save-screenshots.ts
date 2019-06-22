import { ScreenShotSaver } from "./utils/screenshot";

const save = async () => {
  const ssSaver = new ScreenShotSaver();
  await ssSaver.init();
  const ssDir = `./regression-test/screenshots`;
  const url = `http://localhost:8000`;
  const newSs = await ssSaver.saveScreenshot(url, `${ssDir}/index.png`);
  console.log(newSs, "saved");
  ssSaver.close();
};

save();
