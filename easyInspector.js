javascript: (function()
{
	try
	{
		var uat = window.navigator.userAgent.toLowerCase();
		var msie = (uat.indexOf("msie") > -1) ? true : false;
		main();
	}
	catch (err)
	{
		doAlert(err);
	}
	
	function main()
	{
		try
		{
			var inp = "%s";
			var flg = (inp == 'n') ? true : false;
			var rng = getRange();
			if (rng)
			{
				var obj = getPareCon(rng);
				if (obj.nodeType == 3)
				{
					obj = obj.parentNode;
				}
				doDom(obj, rng, flg);
			}
		}
		catch (err)
		{
			doAlert(err);
		}
	}

	function doDom(obj, buf, flg)
	{
		var cnt = 0;
		if (flg)
		{
			buf = cnt + "\t|" + buf;
		}
		while (1)
		{
			buf += "\n";
			if (flg)
			{
				buf += (++cnt) + "\t|";
			}
			buf += "<" + obj.nodeName;
			if (obj.getAttribute('id'))
			{
				buf += ' id="' + obj.getAttribute('id') + '"';
			}
			if (obj.getAttribute('class'))
			{
				buf += ' class="' + obj.getAttribute('class') + '"';
			}
			buf += ">";
			if (obj.nodeName.match(/^body$/i))
			{
				break;
			}
			else
			{
				obj = obj.parentNode;
			}
		}
		alert(buf);
	}

	function getSelection()
	{
		if (msie)
		{
			return document.selection;
		}
		else
		{
			return (window.getSelection || document.getSelection)();
		}
	}

	function getRange()
	{
		var sel = getSelection();
		if (msie)
		{
			return sel.createRange();
		}
		else
		{
			return sel.getRangeAt(0);
		}
	}

	function getPareCon(range)
	{
		if (msie)
		{
			return range.parentElement();
		}
		else
		{
			return range.commonAncestorContainer;
		}
	}

	function getSafe(txt)
	{
		return txt.replace(/\&/g, '&').replace(/</g, '<').replace(/>/g, '>');
	}

	function doAlert(err)
	{
		var buf = '';
		buf += 'stack:' + err.stack.split('@')[0] + '\n\n';
		buf += 'lineNumber:' + err.lineNumber + '\n\n';
		buf += 'message:' + err.message + '\n\n';
		buf += 'name:' + err.name;
		alert(buf);
	}
})();