/* 
 * Cotonti presets for elRTE
 */

// Button that inserts <!--more--> mark in a page
(function($) {
elRTE.prototype.ui.prototype.buttons.more = function(rte, name) {
	this.constructor.prototype.constructor.call(this, rte, name);
	this.command = function() {
		this.rte.history.add();
		this.rte.selection.insertHtml('<!--more-->', true);
		this.rte.window.focus();
		this.rte.ui.update();
	}
	this.update = function() {
		this.domElem.removeClass('disabled');
	}
}
})(jQuery);
elRTE.prototype.options.buttons.more = 'Read more...';
// SyntaxHighligher code button
(function($) {
elRTE.prototype.ui.prototype.buttons.code = function(rte, name) {
	this.constructor.prototype.constructor.call(this, rte, name);
	var self = this;
	var opts = {
		tpl      : '<pre class="brush:%val">%label</span>',
		select   : function(v) {
			self.formatBlock(v);
		},
		src      : {
			'code':		'Code',
			'as3':		'ActionScript 3',
			'bash':		'Bash',
			'cpp':		'C++',
			'csharp':	'C#',
			'css':		'CSS',
			'delphi':	'Delphi',
			'diff':		'Diff',
			'erlang':	'Erlang',
			'groovy':	'Groovy',
			'java':		'Java',
			'javafx':	'JavaFX',
			'jscript':	'JavaScript',
			'perl':		'Perl',
			'php':		'PHP',
			'plain':	'Plain text',
			'python':	'Python',
			'ruby':		'Ruby',
			'scala':	'Scala',
			'vb':		'VB',
			'xml':		'XML'
		}
	}
	
	this.select = this.domElem.elSelect(opts);
	
	this.command = function() {
	}
	
	this.formatBlock = function(brush) {
		v = 'pre';
		function format(n, tag) {
			tag = $('<pre class="brush:'+brush+'" />');
			function replaceChilds(p) {
				$(p).find('h1,h2,h3,h4,h5,h6,p,address,pre').each(function() {
					$(this).replaceWith($(this).html());
				});
				return p;
			}
			
			if (/^(LI|DT|DD|TD|TH|CAPTION)$/.test(n.nodeName)) {
				!self.rte.dom.isEmpty(n) && self.rte.dom.wrapContents(replaceChilds(n), tag);
			} else if (/^(UL|OL|DL|TABLE)$/.test(n.nodeName)) {
				self.rte.dom.wrap(n, tag);
			} else {
				!self.rte.dom.isEmpty(n) && $(replaceChilds(n)).replaceWith( $(self.rte.dom.create(tag)).html($(n).html()));
			}
			
		}
		this.rte.history.add();

		var tag = v.toUpperCase(),
			i, n, $n,
			c = this.rte.selection.collapsed(),
			bm = this.rte.selection.getBookmark(),
			nodes = this.rte.selection.selected({
				collapsed : true,
				blocks    : true,
				filter    : 'textContainsNodes',
				wrap      : 'inline',
				tag       : 'span'
			})
			l = nodes.length,
			s = $(nodes[0]).prev(),
			e = $(nodes[nodes.length-1]).next();

		while (l--) {
			n = nodes[l];
			$n = $(n);
			if (tag == 'DIV' || tag == 'SPAN') {
				if (/^(H[1-6]|P|ADDRESS|PRE)$/.test(n.nodeName)) {
					$n.replaceWith($(this.rte.dom.create('div')).html($n.html()||''));
				}
			} else {
				if (/^(THEAD|TBODY|TFOOT|TR)$/.test(n.nodeName)) {
					$n.find('td,th').each(function() { format(this, tag); });
				} else if (n.nodeName != tag) {
					format(n, tag);
				}
			}
		}

		this.rte.selection.moveToBookmark(bm);

		this.rte.ui.update(true);
	}
	
	this.set = function(brush) {
		this.rte.history.add();
		var nodes = this.rte.selection.selected({filter : 'textContainsNodes'});
		// Get wrapper node
		var wrapper;
		if (nodes.length > 1) {
			wrapper = nodes[0].parent();
		} else {
			wrapper = nodes[0];
		}
		if (brush == 'code') {
			if ($(this).parent().is('pre')) {
				$(this).unwrap();
			} else if ($(this).is('pre')) {
				$(this).children().unwrap();
			}
		} else {
			// Strip HTML
			wrapper.html(wrapper.html().replace(/<(.+?)>/gi, ''));
			// Wrap with PRE
			wrapper.wrapInner('<pre class="brush:'+brush+'" />');
		}
		this.rte.ui.update();
	}
	
	this.update = function() {
		this.domElem.removeClass('disabled'); 
		var n = this.rte.selection.getNode();
		if (n.nodeType != 1) {
			n = n.parentNode;
		}
		var v = $(n).attr('class');
		var m = /brush:(\w+)/gi.exec(v);
		v = m == null ? '' : m[1];
		this.select.val(opts.src[v] ? v : '');
	}
}
})(jQuery);
elRTE.prototype.options.buttons.code = 'Code';


elRTE.prototype.options.panels.miniStyle = ['bold', 'italic'];
elRTE.prototype.options.panels.miniLinks = ['link', 'unlink', 'image'];
elRTE.prototype.options.toolbars.miniToolbar = ['miniStyle','lists','miniLinks'];
var miniSettings = {
	cssClass:		'el-rte',
	height:			250,
	toolbar:		'miniToolbar',
	styleWithCSS:	false,
	cssfiles:		['plugins/elrte/css/elrte-inner.css']
};

elRTE.prototype.options.panels.mediElements = ['blockquote','nbsp', 'smiley', 'pagebreak'];
elRTE.prototype.options.toolbars.mediToolbar = ['style','lists','links','images','mediElements','colors','undoredo','copypaste'];
var mediSettings = {
	cssClass:		'el-rte',
	height:			350,
	toolbar:		'mediToolbar',
	styleWithCSS:	false,
	cssfiles:		['plugins/elrte/css/elrte-inner.css']
};

elRTE.prototype.options.panels.myElements = ['horizontalrule', 'blockquote', 'code', 'div', 'stopfloat', 'nbsp', 'pagebreak', 'more'];
elRTE.prototype.options.toolbars.myToolbar = ['style', 'lists', 'links', 'media', 'myElements', 'colors', 'undoredo', 'copypaste', 'alignment', 'format', 'indent', 'tables']
var mySettings = {
	cssClass:		'el-rte',
	height:			450,
	toolbar:		'myToolbar',
	styleWithCSS:	false,
	cssfiles:		['plugins/elrte/css/elrte-inner.css']
};
