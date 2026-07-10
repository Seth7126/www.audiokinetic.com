(function($) {
	$.fn.AwesomeSelect = function(customSettings) {

		if ( !customSettings ) { customSettings = {}; }
		var settings = $.extend({
			dropdownClass : 'banner-form-input footer-subscribe-dropdown',
			choiceClass : 'footer-subscribe-dropdown-choice',
			iconClass : 'material-icons footer-subscribe-arrow',
			selectClass : 'footer-subscribe-select select-up',
			includeFirstOption : false
		}, customSettings);

		var as = {};
		var length = 0;
		var index = -1;
		var select = $(this);
		var popup;
		var options;
		var awesomeId = select.attr('id') + '_AwesomeSelect';
	
		function closeSelect(chooseHighlighted) {
		  if (chooseHighlighted) {
			var selected = $('#'+awesomeId+' .highlighted');
			if (selected.length) {
			  var selectedIndex = options.index(selected);
			  changeIndex(selectedIndex);
			}
		  }
		  popup.hide();
		}
		
		function openSelect() {
		  $('#'+awesomeId+' .highlighted').removeClass('highlighted');
		  if (index != -1) {
			var p = options.eq(index);
			p.addClass('highlighted');
		  }
		  popup.show();
		}
		
		function toggleSelect(chooseHighlighted) {
		  if (popup.is(':visible'))
			closeSelect(chooseHighlighted);
		  else
			openSelect();
		}
		
		function changeIndex(position) {
		  if (position >= 0 && position < length) {
			index = position;
			var p = options.eq(index);
			$('#'+awesomeId+' .'+settings.choiceClass).text(p.text());
			$('#'+awesomeId+' .highlighted').removeClass('highlighted');
			p.addClass('highlighted');
			select.prop('selectedIndex', index + (settings.includeFirstOption ? 0 : 1));
			select.change();
		  }
		}
		
		select.hide();
		
		var html = '<div id="'+awesomeId+'" class="'+settings.dropdownClass+'" tabindex="0">';
		html += '<span class="'+settings.choiceClass+'">' + (select.find(":selected").length == 1 ? select.find(":selected").text() : select.children().first().text()) + '</span>';
		html += '<div class="'+settings.iconClass+'">&#xE313;</div><div class="awesome-popup '+settings.selectClass+'">';
		length = select.children().length - (settings.includeFirstOption ? 0 : 1);
		select.children().each(function(i) {
		  if (settings.includeFirstOption || i != 0)
			html += '<p>' + $(this).text() + '</p><div></div>';
		});
		html = html.slice(0, -11);
		html += '</div></div>';
		select.after(html);
		
		var box = $('#'+awesomeId);
		popup = box.find('.awesome-popup');
		options = popup.find('p');
		box.click(function() {
		  toggleSelect(false);
		});
		box.keydown(function(e) {
		  // Enter
		  if (e.which == 13 || e.keyCode == 13) {
			toggleSelect(true);
			e.preventDefault();
		  }
		  // Escape
		  if (e.which == 27 || e.keyCode == 27) {
			if (popup.is(':visible')) {
			  closeSelect(false);
			}
		  }
		  // Tab
		  if (e.which == 9 || e.keyCode == 9) {
			if (popup.is(':visible')) {
			  closeSelect(true);
			  e.preventDefault();
			}
		  }
		  // Space
		  if (e.which == 32 || e.keyCode == 32) {
			if (!popup.is(':visible')) {
			  openSelect();
			}
			e.preventDefault();
		  }
		  // Up arrow
		  if (e.which == 38 || e.keyCode == 38) {
			var selected = $('#'+awesomeId+' .highlighted');
			if (selected.length) {
			  var selectedIndex = options.index(selected);
			  changeIndex(selectedIndex - 1);
			}
			else {
			  changeIndex(length - 1);
			}
			e.preventDefault();
		  }
		  // Down arrow
		  if (e.which == 40 || e.keyCode == 40) {
			var selected = $('#'+awesomeId+' .highlighted');
			if (selected.length) {
			  var selectedIndex = options.index(selected);
			  changeIndex(selectedIndex + 1);
			}
			else {
			  changeIndex(0);
			}
			e.preventDefault();
		  }
		});
		options.mousemove(function() {
		  $('#'+awesomeId+' .highlighted').removeClass('highlighted');
		  $(this).addClass('highlighted');
		});
		options.click(function() {
		  var position = options.index($(this));
		  changeIndex(position);
		});
		$(document).click(function(e) {
		  if (!$(e.target).closest(box).length) {
			if (popup.is(':visible')) {
			  closeSelect(false);
			}
		  }
		});
	};
})(jQuery);