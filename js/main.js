(function(){
	var cursor = 0,
	column = 4,
	maxRow = 4,
	curRow = 0,
	minCol = 0,
	maxCol = 0,
	flippedNum = 0,
	cardNum = 16,
	$cover = $('.cover'),
	$card = $('.card'),
	$restartBtn = $('.restart-btn'),
	maxCard = column * maxRow,
	colour = ['red','orange','yellow','green','blue','purple','indigo','black'],
	colorGrid = [];
	
	
	function move()
	{
		$cover.removeClass('highlight');
		$card.removeClass('active');
		$cover.each(function(){
			if($(this).data('pos') === cursor) {
				$(this).addClass('highlight');
				$(this).siblings().addClass('active');
			}
		});
	}
	
	function init() {
		cursor = 0;
		curRow = 0;
		minCol = 0;
		maxCol = 0;
		flippedNum = 0;
		cardNum = 16;
		colorGrid = shuffleArray(colour.concat(colour));
		$cover.removeClass('highlight');
		$card.removeClass('active');
		$restartBtn.removeClass('highlight');
		$cover.first().addClass('highlight');
		$card.first().addClass('active');
		$('.card-area').removeClass('flipped');
	}
	
	function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}
	
	
	function createGame() {
		init();
	}
	
	function flip()
	{
		var cardArea = $('.highlight').parent();
		if(!cardArea.hasClass('flipped')) {
			cardArea.addClass('flipped');
			flippedNum++;
		}
	}
	
	$(document).keydown(function(e){
		console.log(e.keyCode);
		switch(e.keyCode) {
			case 37:  //  left		
				var current = cursor - 1;
				minCol = curRow * column; //0,4,8,12
				if(current < minCol) return;
				if(cursor == maxCard) {
					$restartBtn.removeClass('highlight');
				}
				cursor = current;
				move();
				break;
			case 39:  //  right
				var current = cursor + 1;
				maxCol = (curRow + 1) * column - 1;//3,7,11,15
				if(current > maxCol && current < maxCard - 1) return;
				cursor = current;
				if(current === maxCard) {
					$cover.removeClass('highlight');
					$card.removeClass('active');
					$restartBtn.addClass('highlight');		
				} else if(current === maxCard + 1) {
					init();
				} else {
					move();
				}
				break;
			case 38: // up
				var current = cursor - column;
				if(current < 0) return;
				if(cursor == maxCard) {
					init();
				} else {
					curRow--;
					cursor = current;
					move();
				}
				break;
			case 40: //down
				var current = cursor + column;	
				if(cursor === maxCard) {
					init();
				} else if(current > maxCard - 1) {
					return;
				} else {
					curRow++;
					cursor = current;
					move();
				}
				break;
			case 13: //enter
				if(cursor === maxCard) { //restart
					init();
				} else {
					// add step
					if(flippedNum < 2) {
						flip();
					} else {
						flippedNum = 0;
						//card1 == card2
						//+1 point
						//remove two card	
						//finished popup winner
						// not finish , inital flippednum
						
						//card1!== card2
						//-1 point
						//flipped back
						//inital flippednum
					
					}
				}
				break;
		}
		
		
		
		
	});

	createGame();



})();