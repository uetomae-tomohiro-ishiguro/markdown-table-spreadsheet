var COLUMN_HEADER_ROW = 1;
var DATA_START_ROW = COLUMN_HEADER_ROW + 1;

// スプレッドシートの表を読み込む
// ----------------------------------------
function readSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const spreadSheet = ss.getActiveSheet();
  // 表の最終列、最終行を取得する
  var tableLastColumn = spreadSheet
    .getRange(COLUMN_HEADER_ROW, 1)
    .getNextDataCell(SpreadsheetApp.Direction.NEXT)
    .getColumn();
  var lastRow =
    spreadSheet
      .getRange(COLUMN_HEADER_ROW, 1)
      .getNextDataCell(SpreadsheetApp.Direction.DOWN)
      .getRow() - 1;
  // 表ヘッダのリストを取得する
  var columnHeaders = spreadSheet
    .getRange(COLUMN_HEADER_ROW, 1, COLUMN_HEADER_ROW, tableLastColumn)
    .getValues();
  // データを取得する
  var rowIndex = DATA_START_ROW - 1;
  var values = spreadSheet
    .getRange(DATA_START_ROW, 1, lastRow, tableLastColumn)
    .getValues();
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
