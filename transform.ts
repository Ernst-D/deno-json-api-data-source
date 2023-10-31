const homeDir = Deno.cwd();
const pathToJsons = "/data";
const fullPath = `${homeDir}${pathToJsons}`;

async function getJsonData() {
  const files = [];

  for await (const file of Deno.readDir(fullPath)) {
    // console.log(file.name);
    if (!file.name.endsWith(".json")) {
      return;
    }
    const fsFile = await Deno.open(fullPath + "/" + file.name);
    const fileStat = await Deno.fstat(fsFile.rid);

    files.push({
      file: file.name,
      time: fileStat.mtime?.getTime(),
    });
  }

  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  return files.sort((a, b) => a.time - b.time)
    .map((f) => fullPath + "/" + f.file);
}

async function _readJsonData(fsPaths: string[]) {
  const res: string[] = [];

  for (const fsPath of fsPaths) {
    const file = await Deno.open(fsPath);
    const readableStream = file.readable.getReader();
    let jsonContent = "";

    while (true) {
      const { done, value } = await readableStream.read();
      if (done) {
        break;
      }
      jsonContent += new TextDecoder().decode(value);
    }

    res.push(JSON.parse(jsonContent));
  }

  return res;
}

export async function getTransformedTestData(
  options: { limit: number } = { limit: 3 },
) {
  const raw = await getJsonData();

  // @ts-ignore
  const readData = await _readJsonData(raw?.slice(0, options.limit));

  const transformedData = readData.flat().map((testCase, index) => ({
    test: testCase,
    timestamp: new Date(Date.now() + index),
  }));

  return transformedData;
}
