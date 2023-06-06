export const initWin = [
  "REM Redeems codes for you from the website",
  "REM You already need to be logged into the website",
  "REM Make sure you've already accepted or rejected cookies",
  "REM This script targets windows",
  "",
  "REM Default to 50ms so tabbing works correctly",
  "DEFAULTDELAY 50",
  "",
  "GUI r",
  "DELAY 1000",
  "STRING cmd",
  "ENTER",
  "DELAY 1000",
  "STRING explorer https://redeem.tcg.pokemon.com/en-us/ && exit",
  "ENTER",
  "",
  "DELAY 5000",
  "",
  "REM 14 tab presses to focus on input field",
  "TAB",
  "REPEAT 13",
  ""
].join("\n");

export const initAndroid = [
  "REM Redeems codes for you from the website",
  "REM You already need to be logged into the website",
  "REM Make sure you've already accepted or rejected cookies",
  "REM This script targets android",
  "",
  "REM Default to 50ms so tabbing works correctly",
  "DEFAULTDELAY 50",
  "",
  "REM Open browser",
  "GUI b",
  "DELAY 600",
  "",
  "ENTER",
  "DELAY 1000",
  "",
  "CTRL n",
  "DELAY 100",
  "",
  "STRING https://redeem.tcg.pokemon.com/en-us/",
  "DELAY 100",
  "ENTER",
  "",
  "REM 19 tab presses to focus on input field",
  "TAB",
  "REPEAT 18"
].join("\n");

export const codeBlock = (code: string) =>
  [`STRING ${code}`, "ENTER", "DELAY 1000"].join("\n");

export const submissionBlock = [
  "",
  "REM Tab to enter button",
  "TAB",
  "REPEAT 3",
  "ENTER",
  "",
  "REM Wait for redemption",
  "DELAY 2000",
  "",
  "REM Tab back to input",
  "SHIFT TAB",
  "REPEAT 3",
  ""
].join("\n");
