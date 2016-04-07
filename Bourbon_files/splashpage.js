// Tabicons

$('.tabicons').each(function setTabs() {
	var tabs = $(this).find('.tabicon');
	var images = 	$('.device img');
	var current;
	var index;

	$(this).mouseenter(removeCurrent).mouseleave(addCurrent);

	tabs.click(setCurrentTab);

	function setCurrentTab() {
		current = this;
		index = tabs.index(current);
		slideImages();
	}

	function removeCurrent() {
		current = $(this).find('.current').removeClass('current');
	}

	function addCurrent() {
		$(current).addClass('current');
	}

	function slideImages() {
		images.eq(index).removeClass('in out');
		images.slice(0, index).removeClass('in').addClass('out');
		images.slice(index + 1).removeClass('out').addClass('in');
	}
})