(function(){
	var cursor = 0,
	eachRow = 4,
	curCol = 0,
	min = 0,
	max = 0,
	$highLight = $('.highlight');
	
	$(document).keydown(function(e){
		switch(e.keyCode) {
			case 37:  //  <-		
				var current = cursor-1;
				min = curCol * eachRow;
				if(current < min) return;
				cursor = current;
				$('.card').removeClass('highlight');
				$('.card').data('')
				break;
			case 39:  //  ->
				
			break;
		
		
		
		
		
		
		}
		
		
		
	});





})();