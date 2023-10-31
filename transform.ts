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

debugger;
const data = await getJsonData();
debugger;
console.log(data);
