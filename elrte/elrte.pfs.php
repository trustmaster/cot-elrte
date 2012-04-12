<?php
/* ====================
[BEGIN_COT_EXT]
Hooks=pfs.first
[END_COT_EXT]
==================== */

/**
 * Provides PFS buttons
 *
 * @package elrte
 * @version 0.9.1
 * @author Trustmaster
 * @copyright Copyright (c) Cotonti Team 2011
 * @license BSD
 */

defined('COT_CODE') or die('Wrong URL');


if ($parser == 'html')
{
	$R['pfs_code_header_javascript'] = '
	function addfile(gfile, c2, gdesc) {
		opener.$(\'.editor\').elrte()[0].elrte.selection.insertHtml(\'{$pfs_code_addfile}\');
		{$winclose}
	}
	function addthumb(gfile, c2, gdesc) {
		opener.$(\'.editor\').elrte()[0].elrte.selection.insertHtml(\'{$pfs_code_addthumb}\');
		{$winclose}
	}
	function addpix(gfile, c2, gdesc) {
		opener.$(\'.editor\').elrte()[0].elrte.selection.insertHtml(\'{$pfs_code_addpix}\');;
		{$winclose}
	}';
}

?>
