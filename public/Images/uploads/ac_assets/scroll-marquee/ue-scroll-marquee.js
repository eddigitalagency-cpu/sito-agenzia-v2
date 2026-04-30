function ueScrollMarquee(){
	
	//classes
	
	//selectors
	
	
	//objects
	var g_objWidget, g_objWrapper, g_objVideoPlayIcons, g_objVideoCovers;
	
	//helpers
	var g_widgetId, g_itemsArray, g_widgetsOptions, g_speed, g_direction, g_offset, g_widgetTop, g_isUpdating, g_nextTranslateX;

  /**
	* Apply the transform in sync with the browser's repaint
	*/
	function updateMarquee() {
		g_objWrapper[0].style.transform = 'translateX(' + (g_nextTranslateX) + 'px) translateZ(0)';
		
		g_isUpdating = false; // Reset the flag
	}
	
	/**
	* on page scroll
	*/
	function onScroll(){
		var scrollY = jQuery(this).scrollTop();
		var windowHeight = jQuery(window).height();
		
		// 1. Define Vertical Scroll Boundaries (using g_widgetHeight, which must be in init)
		var scrollStart = g_widgetTop - windowHeight;
		var scrollEnd = g_widgetTop + g_widgetHeight + 200;
		var animationRange = scrollEnd - scrollStart; // Total vertical distance for the effect
		
		// 2. Calculate the raw scroll progress
		var relativeScroll = scrollY - scrollStart; 
		
		// 3. Clamp the vertical scroll progress:
		var effectiveScroll = Math.max(0, relativeScroll); // Lower Bound (Start)
		// Upper Bound (End of visibility) - This is the ONLY clamp based on vertical scroll
		effectiveScroll = Math.min(animationRange, effectiveScroll); 
		
		// 4. Calculate the horizontal movement distance
		
		// The total horizontal travel distance is simply the effective vertical scroll scaled by speed.
		// When effectiveScroll = animationRange, this gives the total horizontal distance covered.
		var totalHorizontalMovement = effectiveScroll * g_speed; 
		
		// 5. Calculate the final translation (translateX)
		var direction = (g_direction == "right") ? 1 : -1;
		
		var translateX;
		
		// Start Position: This is where the marquee starts (often the required offset)
		if (g_direction === "left") {
			// Start from the desired offset (pushed right)
			var startPosition = g_offset; 
			
			// Subtract the movement to scroll further left
			translateX = startPosition - totalHorizontalMovement; 
			
		} else { // g_direction === "right"
			// Start from the desired offset (pushed right)
			var startPosition = g_offset;
			
			// Add the movement to scroll further right
			translateX = startPosition + totalHorizontalMovement;
		}

    g_nextTranslateX = translateX;

    // 6. Final CSS Application
    if (g_isUpdating == false) {
			g_isUpdating = true;
			window.requestAnimationFrame(updateMarquee);
		}
	}
	
	/**
	* on video cover click
	*/
	function onVideoCoverClick(objVideoPlayIcon){
		var objVideCover = jQuery(this);
		
		if(objVideoPlayIcon && objVideoPlayIcon.length > 0)
			objVideCover = objVideoPlayIcon.prev();			
		
		var objParentItem = objVideCover.closest(".ue-scroll-marquee-item");
		var poster = objVideCover.attr("poster");
		var title = objVideCover.data("title");
		var videoType = objVideCover.data("type");
		var videoUrl = objVideCover.data("link").trim();
		var videoHTML;
		
		if(videoType == "self")
			videoHTML = '<video class="ue-scroll-marquee-item-video" src="'+videoUrl+'" controls autoplay poster="'+poster+'" ></video>';
		
		if(videoType == "youtube")
			videoHTML = '<iframe class="ue-scroll-marquee-item-video" src="https://www.youtube.com/embed/'+videoUrl+'?autoplay=1" title="'+title+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
		
		if(videoType == "vimeo")
			videoHTML = '<iframe class="ue-scroll-marquee-item-video" src="https://player.vimeo.com/video/'+videoUrl+'?autoplay=1&title=0&byline=0&portrait=0" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
		
		objParentItem.addClass("ue-scroll-marquee-item-video-active");
		objParentItem.append(videoHTML)
	}
	
	/**
	* on video cover click
	*/
	function onVideoPlayIconClick(){
		var objVideoPlayIcon = jQuery(this);

		onVideoCoverClick(objVideoPlayIcon);
	}
	
	/**
	* init from external file   
	*/
	this.init = function(options){        
		//init vars
		g_itemsArray = options.items;
		g_widgetsOptions = options.widgetsOptions;
		g_widgetId = g_widgetsOptions.uc_id;        
		g_speed = Number(g_widgetsOptions.speed);        
		g_direction = g_widgetsOptions.direction;        
		g_offset = Number(g_widgetsOptions.offset);        
		
		//classes
		
		//selectors
		
		
		//objects
		g_objWidget = jQuery('#'+g_widgetId);
		g_objWrapper = g_objWidget.find(".uc-items-wrapper");
		g_objVideoCovers = g_objWidget.find(".ue-scroll-marquee-item-video-cover");
		g_objVideoPlayIcons = g_objWidget.find(".ue-scroll-marquee-item-video-play-icon");
		
		
		//helpers 
		g_widgetTop = g_objWidget.offset().top;
		g_widgetHeight = g_objWidget.outerHeight();
		
		g_wrapperWidth = g_objWrapper.outerWidth();
		g_viewportWidth = jQuery(window).width();
		
		// The difference between wrapper width and viewport width (this is the minimum required travel)
		g_scrollDiff = g_wrapperWidth - g_viewportWidth; 
		
		// Total horizontal distance the wrapper needs to travel (including offsets on both ends)
		g_maxTravel = g_scrollDiff + (2 * g_offset); 		
		g_maxScroll = g_maxTravel / g_speed;
		g_isUpdating = false;
    g_nextTranslateX = 0;
		
		onScroll();
		
		//init events
		jQuery(window).on("scroll", onScroll);
		g_objVideoPlayIcons.on("click", onVideoPlayIconClick);
		g_objVideoCovers.on("click", onVideoCoverClick);
	}   
}