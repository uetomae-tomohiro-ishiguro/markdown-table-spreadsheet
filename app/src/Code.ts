// ----------------------------------------
// スプレッドシートをマークダウンに変換する
// ----------------------------------------

// シートの値を処理する
function convertSStoMD() {
  // 1. スプレッドシートの表を読み込む
  const table = readSheet();
  // 2. 表をマークダウン形式に変換する
  let markdown = table2md(table.columnHeaders, table.values);
  // 3. 処理結果をモーダルで表示する
  showUI(markdown);
}

// 処理結果をモーダルで表示する
// ----------------------------------------
function showUI(str) {
  const html = HtmlService.createHtmlOutput("<pre>" + str + "</pre>")
    .setWidth(500)
    .setHeight(200);
  SpreadsheetApp.getUi().showModalDialog(
    html,
    "セルA1の表をマークダウン形式に変換"
  );
}

// ----------------------------------------
// マークダウンをスプレッドシートに変換する
// ----------------------------------------

// フォームを表示する
// ----------------------------------------
function convertMDtoSS() {
  const html = HtmlService.createHtmlOutputFromFile("index");
  //SpreadsheetApp.getUi().showSidebar(html);
  SpreadsheetApp.getUi().showModalDialog(html, "マークダウン形式を表に変換");
}

// フォームから受け取った値を処理する
// ----------------------------------------
function md2ss(str) {
  Logger.log(str);
  // 1. マークダウン形式を表に変換する
  const table = md2table(str);
  Logger.log(JSON.stringify(table, null, 2));
  // 2. スプレッドシートの表に出力する
  writeSheet(table);
}
