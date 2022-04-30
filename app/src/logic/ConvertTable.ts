// 表をマークダウン形式に変換する
// ----------------------------------------
function table2md(columnHeaders, values) {
  let str = "";
  // 表ヘッダ
  if (columnHeaders.length > 0) {
    str += "|";
  }
  columnHeaders.forEach((row) => {
    row.forEach((cell) => (str += cell + "|"));
    str += "\r\n";
  });
  if (columnHeaders.length > 0) {
    str += "|";
  }
  columnHeaders.forEach((row) => {
    row.forEach((cell) => (str += "---|"));
    str += "\r\n";
  });
  // 表の内容
  values.forEach((row) => {
    str += "|";
    row.forEach((cell) => (str += cell + "|"));
    str += "\r\n";
  });
  return str;
}

// マークダウン形式を表に変換する
// ----------------------------------------
function md2table(str) {
  const rows = str.split("\n");
  // 表ヘッダ
  const headers = rows[0].split("|");
  headers.splice(0, 1);
  headers.splice(headers.length - 1, 1);
  // 表の内容
  const values = [];
  for (let i = 2; i < rows.length; i++) {
    let row = rows[i].split("|");
    row.splice(0, 1);
    row.splice(row.length - 1, 1);
    values.push(row);
  }
  return { columnHeaders: headers, values: values };
}
