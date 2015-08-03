(function(){
	var cursor = 0,
	column = 4,
	maxRow = 4,
	curRow = 0,
	minCol = 0,
	maxCol = 0,
	flippedNum = 0,
	point = 0,
	cardLeft = 16,
	step = 0,
	maxCard = column * maxRow,
	$cover = $('.cover'),
	$card = $('.card'),
	$restartBtn = $('.restart-btn'),
	colour = [1,2,3,4,5,6,7,8],
	colorGrid = [],
	flippedCard = [];
	
	
	function move()
	{
		$cover.removeClass('highlight');
		$card.removeClass('active');
		$('.card-area').each(function(){
			if($(this).data('pos') === cursor) {
				$(this).find('.cover').addClass('highlight');
				$(this).find('.card').addClass('active');
			}
		});
	}
	
	function init() {
		cursor = 0;
		curRow = 0;
		minCol = 0;
		maxCol = 0;
		point = 0;
		flippedNum = 0;
		step = 0;
		cardLeft = column * maxRow;
		flippedCard = [];
		colorGrid = shuffleArray(colour.concat(colour));
		$cover.removeClass('highlight');
		$card.removeClass('active');
		$restartBtn.removeClass('highlight');
		$card.html("");
		$('.card-area').find('img').removeClass('vs-hidden');
		$('.card-area').removeClass('flipped');
		$cover.first().addClass('highlight');
		$card.first().addClass('active');
		$('#step').text('0');
		$('#point').text('0');
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
		var cardArea = $('.highlight').parent(),
			pos = cardArea.data('pos');
		if(!cardArea.hasClass('flipped') && !cardArea.find('img').hasClass('vs-hidden')) {
			step++;		
			$('#step').text(step);
			if(cardArea.find('.card').html() === '') {
				cardArea.find('.card').append('<img src="img/colour'+colorGrid[pos]+'.gif">');
			}
			cardArea.addClass('flipped');
			flippedNum++;
			flippedCard.push({"pos":pos,"colour":colorGrid[pos]});
		}
	}
	
	function checkFlip()
	{
		var cardArea = $('.card-area');
		if(flippedCard[0].colour === flippedCard[1].colour) {
			cardLeft = cardLeft - 2;
			point++;
			cardArea.each(function(){
				if($(this).data('pos') === flippedCard[0].pos || $(this).data('pos') === flippedCard[1].pos) {
					$(this).find('img').addClass('vs-hidden');
				}
			});
			if(cardLeft === 0) {
				$('.popup').show();
			}
		} else {
			point--;
			cardArea.each(function(){
				if($(this).data('pos') === flippedCard[0].pos || $(this).data('pos') === flippedCard[1].pos) {
					$(this).removeClass('flipped');
				}
			});
		}
		$('#point').text(point);
		flippedCard = [];
	}
	
	$(document).keydown(function(e){
		//console.log(e.keyCode);
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
					flip();
					if(flippedNum === 2) {
						flippedNum = 0;
						setTimeout(checkFlip,500);
					}
				}
				break;
		}
	});
	
	$(document).ready(function(){
		createGame();
		$('#winner-info').submit(function(e){
			e.preventDefault();
			var $formData = $(this).serializeArray();
			$formData['point'] = point;
			$.ajax({
				url : this.href,
				data : $formData,
				type : 'post'
			}).done(function(){
				
			}).fail(function(){
				
			});
		});
		
		$('#play-again').on('click',function(){
			$('.popup').hide();
			init();
		});
	});
})();