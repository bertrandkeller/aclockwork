/*
 * jQuery.BiggerLink v2.0.1
 * http://www.ollicle.com/eg/jquery/biggerlink/
 *
 * Copyright (c) 2009 Oliver Boermans
 * http://creativecommons.org/licenses/MIT/
 *
 * 2009-11-22 (22 Nov 2009)
*/ 
(function($) {
	$.fn.biggerlink = function(options) {

		// Default settings
		var settings = {
			biggerclass:'bl-bigger', 	// class added to the first contained link and others that trigger it
			hoverclass:'bl-hover', 		// class added to parent element on hover/focus
			hoverclassparent:'bl-hoverparent', // class added to parent parent element on hover/focus
			hoverclass2:'bl-hover2', 	// class added to parent element on hover/focus of other links
			clickableclass:'bl-hot', 	// class added to parent element with behaviour
			otherstriggermaster: true,	// will all links in containing biggerlink element trigger the first link
			follow: 'auto'				// follow master link on click? : 'auto',true,false
		};
		if(options) {
			$.extend(settings, options);
		}
		$(this).filter(function(){
			 return $('a',this).length > 0;

		}).addClass(settings.clickableclass).css('cursor', 'pointer').each(function(i){
			
			// store element references
			var big = $(this).data('biggerlink',{hovered:false,focused:false,hovered2:false,focused2:false});
			var links = {
				all: $('a',this),
				big: $(this),
				master: $('a:first',this).data('biggerlink',{status:'master'}).addClass(settings.biggerclass),
				other: $('a',this).not($('a:first',this)).data('biggerlink',{status:'other'})
			};
			
			
			$('a',this).andSelf().each(function(){
				var newdata = $.extend($(this).data('biggerlink'),links);
				$(this).data('biggerlink',newdata);
			});
			
			
			
			// Add title of first link with title to parent if not already set
			var thistitle = big.attr('title');
			var newtitle = big.data('biggerlink').master.attr('title');
			if(newtitle && !thistitle)
			{
				big.attr('title', newtitle);
			}
			


		// events on biggerlink element
		
		big
			.mouseover(function(event){
				window.status = $(this).data('biggerlink').master.get(0).href;
				$(this).addClass(settings.hoverclass);
				$(this).parent().addClass(settings.hoverclassparent);
				$(this).data('biggerlink').hovered = true;
			})
			.mouseout(function(event){
				window.status = '';
				if(!$(this).data('biggerlink').focused)
				{
					$(this).parent().removeClass(settings.hoverclass);
					$(this).parent().removeClass(settings.hoverclassparent);
				}
				$(this).data('biggerlink').hovered = false;
			})
			.bind('click',function(event){

				// if clicked direct or non-link
				if(!$(event.target).closest('a').length)
				{
					$(this).data('biggerlink').master.trigger({type:'click',source:'biggerlink'});
					event.stopPropagation();
				}
			});
			
			
			
			// focus/blur
			
			links.all
			.bind('focus',function(){
				$(this).data('biggerlink').big.addClass(settings.hoverclass);
				$(this).data('biggerlink').big.data('biggerlink').focused = true;
			}).bind('blur',function(){
				if(!$(this).data('biggerlink').big.data('biggerlink').hovered)
				{
					$(this).data('biggerlink').big.removeClass(settings.hoverclass);
				}
				$(this).data('biggerlink').big.data('biggerlink').focused = false;
			});
			
		
			
			// click/focus/blur event on master (first) link within biggerlink
		
			links.master
			.bind('click',function(event){
				if(event.source == 'biggerlink')
				{
					if(settings.follow === true || settings.follow == 'auto' && event.result !== false)
					{
						window.location = $(this).attr('href');
					}
					else
					{
						event.stopPropagation();
					}
				}
			});
			
			
			// links other than the first (master) link also within biggerlink
			
			// other links are independent
			if(settings.otherstriggermaster)
			{
				links.other.addClass(settings.biggerclass)
				.bind('click',function(event){
					// trigger click events on master link instead
					$(this).data('biggerlink').master.trigger({type:'click',source:'biggerlink'});
					
					// stop this link being followed
					event.preventDefault();
					
					// prevent events on parent elements being triggered
					event.stopPropagation();
				});
			}
			
			// other links are slaves of master link 
			else
			{
				links.other
				.bind('focus',function(){
					$(this).data('biggerlink').big.addClass(settings.hoverclass2);
					$(this).data('biggerlink').big.data('biggerlink').focused2 = true;
				})
				.bind('blur',function(){
					if(!$(this).data('biggerlink').big.data('biggerlink').hovered2)
					{
						$(this).data('biggerlink').big.removeClass(settings.hoverclass2);
					}
					$(this).data('biggerlink').big.data('biggerlink').focused2 = false;
					
				})
				.bind('mouseover',function(event){
					$(this).data('biggerlink').big.addClass(settings.hoverclass2);
					$(this).data('biggerlink').big.data('biggerlink').hovered2 = true;
					event.stopPropagation();
				})
				.bind('mouseout',function(event){
					if(!$(this).data('biggerlink').big.data('biggerlink').focused2)
					{
						$(this).data('biggerlink').big.removeClass(settings.hoverclass2);
					}
					$(this).data('biggerlink').big.data('biggerlink').hovered2 = false;
					event.stopPropagation();
				});
				
				if(!links.other.attr('title'))
				{
					links.other.attr('title','');
				}
			}
		});
		return this;
	};
})(jQuery);


