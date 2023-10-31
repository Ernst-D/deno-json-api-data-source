const homeDir = Deno.cwd();
const pathToJsons = "/data";
const fullPath = `${homeDir}${pathToJsons}`;

export async function getJsonData() {
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

debugger;
const data = await getJsonData();
debugger;
//@ts-ignore
const readData = await _readJsonData(data);
console.log(readData);
debugger;
