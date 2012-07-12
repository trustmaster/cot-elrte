<?php
/* ====================
[BEGIN_COT_EXT]
Hooks=editor
[END_COT_EXT]
==================== */

/**
 * elRTE connector for Cotonti
 *
 * @package elrte
 * @version 0.9.0
 * @author Trustmaster
 * @copyright Copyright (c) Cotonti Team 2011
 * @license BSD
 */

defined('COT_CODE') or die('Wrong URL');

// Language selection
global $lang;
$lang_mark = $lang;
$mkup_lang = $cfg['plugins_dir']."/elrte/js/i18n/elrte.$lang.js";
if (!file_exists($mkup_lang))
{
	$lang_mark = 'en';
	$mkup_lang = $cfg['plugins_dir']."/elrte/js/i18n/elrte.en.js";
}

// Load resources
$mkup_skin_path = $cfg['plugins_dir'] . '/elrte/css/smoothness/jquery-ui-1.8.20.custom.css';
$mkup_skin = cot_rc('code_rc_css_file', array('url' => $mkup_skin_path));
$mkup_theme_path = $cfg['plugins_dir'] . '/elrte/css/elrte.min.css';
$mkup_theme = cot_rc('code_rc_css_file', array('url' => $mkup_theme_path));
cot_rc_link_footer($cfg['plugins_dir'] . '/elrte/js/jquery-ui-1.8.20.custom.min.js');
cot_rc_link_footer($cfg['plugins_dir'] . '/elrte/js/elrte.min.js');
cot_rc_link_footer($mkup_lang);
cot_rc_link_footer($cfg['plugins_dir'] . "/elrte/js/elrte.set.js");

cot_rc_embed_footer('$(document).ready(function() {
	if (document.createStyleSheet) { document.createStyleSheet("'.$mkup_skin_path.'"); } else { $("head").append("'.$mkup_skin.'"); }
	if (document.createStyleSheet) { document.createStyleSheet("'.$mkup_theme_path.'"); } else { $("head").append("'.$mkup_theme.'"); }
	mySettings.lang = \''.$lang_mark.'\';mediSettings.lang = \''.$lang_mark.'\';miniSettings.lang = \''.$lang_mark.'\';
	$("textarea.editor").elrte(mySettings);
	$("textarea.medieditor").elrte(mediSettings);
	$("textarea.minieditor").elrte(miniSettings);
});');

?>
