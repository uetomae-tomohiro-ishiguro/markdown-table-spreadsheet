const COLUMN_HEADER_ROW = 1;
const DATA_START_ROW = COLUMN_HEADER_ROW + 1;

// スプレッドシートの表を読み込む
// ----------------------------------------
function readSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const spreadSheet = ss.getActiveSheet();
  if (spreadSheet.getRange(1, 1).getValue().trim().length == 0) {
    return null;
  }
  // シート上の値を全て取得する
  const table = spreadSheet.getDataRange().getValues();
  const columnHeaders = [table[0]];
  table.splice(0, 1);
  const values = table;
  return { columnHeaders: columnHeaders, values: values };
}

// スプレッドシートの表に出力する
// ----------------------------------------
function writeSheet(table) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const spreadSheet = ss.getActiveSheet();
  // 表ヘッダ
  for (let j = 0; j < table.columnHeaders.length; j++) {
    spreadSheet
      .getRange(COLUMN_HEADER_ROW, j + 1)
      .setValue(table.columnHeaders[j]);
  }
  // 表の内容
  let row = DATA_START_ROW;
  for (let i = 0; i < table.values.length; i++) {
    for (let j = 0; j < table.values[i].length; j++) {
      spreadSheet.getRange(row, j + 1).setValue(table.values[i][j]);
    }
    row++;
  }
}

// スプレッドシートの値をクリアする
// ----------------------------------------
function clearSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const spreadSheet = ss.getActiveSheet();
  spreadSheet.clear();
}
