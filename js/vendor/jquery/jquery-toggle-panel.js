
(function( $ ) {
	 /**
	 * Toggle block element and attach close button 
	 * @param  closeElement - button element to be inserted before panel
	 * @param  iconShow - icon which is shown in button when the panel is shown
	 * @param  iconShow - icon which is shown in button when the panel is hide
	 * @return $
	 * Author: Dariusz Szulc, szulaaa@gmail.com
	 */

    $.fn.togglePanel = function( options ) {

	    var defaults = {
	        closeElement: 	options.closeElement || '<i class="fa"></i>',
	        iconShow: 		options.iconShow || 'fa-plus',
	        iconHide: 		options.iconHide || 'fa-times',
	    };
	   
	    this.each(function(){
	    	var $self = $(this);
	    	var closeLevelTableEl = 
	    		$(defaults.closeElement)
				.addClass(defaults.iconHide)
				.attr('title',$self.attr('data-panel-title') )
				.click(function(){
					$self.toggleClass('while-animation', 100);
					$(this).toggleClass(defaults.iconShow).toggleClass('opacity');
					$self.fadeToggle(200);
					;
				});


			$(this).before(closeLevelTableEl)

	    })

		 return this;
 
    };
 
}( jQuery ));