// ----------------------------------------
// Main of Google Workspace Add-ons
// ----------------------------------------
function onHomepage(e) {
  return createMdCard(e);
}

// ----------------------------------------
// Card interface on Google Workspace Add-ons
// ----------------------------------------

// Top page を描画する
function createMdCard(e, inputText?: string) {
  if (!inputText) {
    inputText = "";
  }
  const builder = CardService.newCardBuilder();

  // section: Markdown to Spreadsheet
  builder.addSection(
    CardService.newCardSection()
      .setHeader("■ Markdown to Spreadsheet")
      .addWidget(
        CardService.newTextInput()
          .setFieldName("markdown")
          .setValue(inputText)
          .setTitle("Enter markdown table...")
          .setMultiline(true)
      )
      .addWidget(
        CardService.newButtonSet().addButton(
          CardService.newTextButton()
            .setText("Push")
            .setOnClickAction(
              CardService.newAction().setFunctionName("convertMDtoSS")
            )
            .setDisabled(false)
        )
      )
      .addWidget(
        CardService.newButtonSet().addButton(
          CardService.newTextButton()
            .setText("Clear sheet")
            .setOnClickAction(
              CardService.newAction().setFunctionName("clearSheet")
            )
            .setDisabled(false)
        )
      )
  );

  // section: Spreadsheet to Markdown
  builder.addSection(
    CardService.newCardSection()
      .setHeader("■ Spreadsheet to Markdown")
      .addWidget(CardService.newTextParagraph().setText(convertSStoMD()))
      .addWidget(
        CardService.newButtonSet().addButton(
          CardService.newTextButton()
            .setText("Pull")
            .setOnClickAction(
              CardService.newAction().setFunctionName("updateTop")
            )
            .setDisabled(false)
        )
      )
  );

  // footer
  builder.setFixedFooter(
    CardService.newFixedFooter().setPrimaryButton(
      CardService.newTextButton()
        .setText(COPY_RIGHT)
        .setOpenLink(CardService.newOpenLink().setUrl(CORPORATE_SITE_URL))
    )
  );

  return builder.build();
}

// Top page を再描画する
function updateTop(e) {
  return CardService.newActionResponseBuilder()
    .setNavigation(
      CardService.newNavigation().updateCard(
        createMdCard(e, e.formInput.markdown)
      )
    )
    .build();
}

// ----------------------------------------
// スプレッドシートをマークダウンに変換する
// ----------------------------------------

// シートの値を処理する
function convertSStoMD() {
  // 1. スプレッドシートの表を読み込む
  const table = readSheet();
  if (!table) {
    return ERROR_MESSAGE_NO_TABLE;
  }
  // 2. 表をマークダウン形式に変換する
  let markdown = table2md(table.columnHeaders, table.values);
  // 3. 処理結果を表示する
  return markdown;
}

// ----------------------------------------
// マークダウンをスプレッドシートに変換する
// ----------------------------------------

// フォームの値を処理する
function convertMDtoSS(e) {
  // Validation
  if (!e.formInput.markdown || e.formInput.markdown.trim().length == 0) {
    createMdCard(e);
    return;
  }
  if (e.formInput.markdown.split("\n")[0].split("|").length < 3) {
    createMdCard(e, e.formInput.markdown);
    return;
  }
  // 1. マークダウン形式を表に変換する
  const table = md2table(e.formInput.markdown);
  Logger.log(JSON.stringify(table, null, 2));
  // 2. スプレッドシートの表に出力する
  writeSheet(table);
}
