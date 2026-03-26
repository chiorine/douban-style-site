const fs = require("fs");
let c = fs.readFileSync("src/app/page.tsx", "utf8");
const idx1 = c.indexOf("// \u5168\u7ad9\u6807\u7b7e\u7edf\u8ba1");
const endStr = "const noteTagCounts = notesTagCounts;";
const idx2 = c.indexOf(endStr);
if (idx1 === -1 || idx2 === -1) { console.log("markers not found", idx1, idx2); process.exit(1); }
const endIdx = idx2 + endStr.length;
const before = c.slice(0, idx1);
const after = c.slice(endIdx);
const lines = [
  "// \u5e7f\u64ad\u6807\u7b7e\u7edf\u8ba1\uff1a\u4ec5\u5df2\u53d1\u5e03\u5e7f\u64ad\uff0ccount>=2\uff0c\u6700\u591a8\u4e2a",
  "  const allBroadcastRowsForTags = await prisma.broadcast.findMany({",
  "    where: { status: \"published\" },",
  "    select: { tags: true },",
  "  });",
  "  const broadcastTagCounts = getTagCountsFromItems(",
  "    allBroadcastRowsForTags.map((r) => ({ tags: JSON.parse(r.tags) as string[] }))",
  "  )",
  "    .filter((t) => t.count >= 2)",
  "    .slice(0, 8);",
  "",
  "  // \u65e5\u8bb0\u6807\u7b7e\u7edf\u8ba1\uff1a\u4ec5\u5df2\u53d1\u5e03\u65e5\u8bb0\uff0ccount>=2\uff0c\u6700\u591a8\u4e2a",
  "  const allNoteRowsForTags = await prisma.note.findMany({",
  "    where: { status: \"published\" },",
  "    select: { tags: true },",
  "  });",
  "  const noteTagCounts = getTagCountsFromItems(",
  "    allNoteRowsForTags.map((r) => ({ tags: JSON.parse(r.tags) as string[] }))",
  "  )",
  "    .filter((t) => t.count >= 2)",
  "    .slice(0, 8);"
];
const newBlock = lines.join("\n");
fs.writeFileSync("src/app/page.tsx", before + newBlock + after);
console.log("done");
