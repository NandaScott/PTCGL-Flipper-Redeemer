import {
  codeBlock,
  initAndroid,
  initWin,
  submissionBlock
} from "./ducky-script-blocks";

function generateInitWin() {
  return initWin;
}

function generateInitAndroid() {
  return initAndroid;
}

function chunks(arr: unknown[], size: number) {
  return Array.from(new Array(Math.ceil(arr.length / size)), (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}

function generateCodeBlock(data: string) {
  const codes = data.trim().split("\n");
  const script = codes.map(codeBlock);
  const chunked = chunks(script, 10);
  const joined = chunked.map((chunk) => chunk.join("\n"));
  return joined;
}

function generateSubmitBlock(codeBlocks: string[]) {
  const joined = codeBlocks.join(`\n${submissionBlock}\n`);
  return joined;
}

export default function main(formData: Record<"codes" | "os", string>) {
  const init =
    formData.codes === "windows" ? generateInitWin() : generateInitAndroid();
  const codeBlocks = generateCodeBlock(formData.codes);
  const codeAndSubmit = generateSubmitBlock(codeBlocks);
  const finalScript = [init, "", codeAndSubmit, "", submissionBlock].join("\n");
  return finalScript;
}
