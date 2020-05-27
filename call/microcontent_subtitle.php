<?php
require_once(__DIR__.'/../lti_session.php');

if (!$context->valid) return;

/**
 * @var int Microcontent ID
 * TODO: 権限の検証 #28
 */
$id = filter_var($_POST['id'], FILTER_VALIDATE_INT);
/** @var string ファイル接頭辞 */
$prefix = $id > 0 ? strval($id) : bin2hex(random_bytes(16));
/** @var string[] 言語コード一覧 */
$langs = array_column(require(__DIR__.'/../lang.php'), 'code');
/** @var string 言語コード */
$lang = in_array($_POST['lang'], $langs) ? $_POST['lang'] : 'und';
/** @var bool 一時的なファイルか否か */
$tmp = filter_var($_POST['tmp'], FILTER_VALIDATE_BOOLEAN);

if (!isset($_FILES["file"]["tmp_name"])) {
  // TODO: 適切なHTTPエラーステータスを返す
  echo "アップロードに失敗しました";
  return;
}
if (!file_exists($_FILES["file"]["tmp_name"])){
  // TODO: 適切なHTTPエラーステータスを返す
  echo "アップロードに失敗しました";
  return;
}

/** @var string 保存先 */
$dist = realpath(__DIR__.'/../'.($tmp ? 'tmp' : 'track'));
/** @var string ファイル名 */
$filename = basename("{$prefix}_{$lang}", '.vtt').'.vtt';

if (move_uploaded_file($_FILES["file"]["tmp_name"], "{$dist}/{$filename}")) {
  echo $filename;
} else {
  // TODO: 適切なHTTPエラーステータスを返す
  echo "アップロードに失敗しました";
}
