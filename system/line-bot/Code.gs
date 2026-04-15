/**
 * LINE Webhook ->（任意）Stripe 連携の骨組み
 * デプロイ：ウェブアプリとして実行 / アクセス：全員 / POST
 * シークレットは「スクリプトのプロパティ」に保存すること。
 */
function doPost(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return ContentService.createTextOutput('ok');
  }

  var body = e.postData.contents;

  // TODO: LINE チャネルシークレットで署名検証（X-Line-Signature）
  // TODO: JSON パースし events を処理（replyToken / message.type など）

  try {
    JSON.parse(body);
  } catch (err) {
    return ContentService.createTextOutput('ok');
  }

  // TODO: Stripe（Checkout / Customer Portal / Webhook）は別エンドポイント関数に分離推奨
  // 例：doPostStripeWebhook(e) を別デプロイ URL にする、など

  return ContentService.createTextOutput('ok');
}

/**
 * Stripe からの webhook 受け口（別デプロイ推奨）
 * Stripe-Signature ヘッダで検証し、イベントタイプに応じて Spreadsheet 等を更新。
 */
function doPostStripeWebhook(e) {
  if (!e || !e.postData) {
    return ContentService.createTextOutput('ok');
  }
  // TODO: 署名検証 + event.type 分岐（checkout.session.completed 等）
  return ContentService.createTextOutput('ok');
}
