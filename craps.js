$(function(){
	$(".dieL").addClass("animated");
	$(".dieR").addClass("animated");

	if ($('html').hasClass('csstransforms3d')) {	
		$('.count').removeClass('slide').addClass('flip');		
		$('.count.flip').hover(
			function () {
				$(this).find('.rollsNrules').addClass('theFlip');
			},
			function () {
				$(this).find('.rollsNrules').removeClass('theFlip');			
			}
		);
	} else {
		$('.count').hover(
			function () {
				$(this).find('.rules').stop().animate({bottom:0}, 500, 'easeOutCubic');
			},
			function () {
				$(this).find('.rules').stop().animate({bottom: ($(this).height() * -1) }, 500, 'easeOutCubic');			
			}
		);

	}

	var die1 = [1,2,3,4,5,6];
	var die2 = [1,2,3,4,5,6];
	var rolls = [];
	var one;
	var two;
	var rollCount = 0;
	var $rollNum = $('#rollCount');

	// Player dice display
	var $d1 = $('#d1');
	var $d2 = $('#d2');
	// Player sum & point
	var $sum = $('#sum');
	var $point = $('#point');


	$('#roll').on('submit', function(e){
		e.preventDefault();

		one = die1[Math.floor(Math.random()*die1.length)];
		two = die2[Math.floor(Math.random()*die2.length)];
		$d1.val(one);
		$d2.val(two);

		dealer(one,two);
		one = 0;
		two = 0;
	});

	function dealer(a,b){
		var sum = a + b;	
		

		if (rollCount >= 1) {
			if (sum === Number($sum.val())) {
				alert('Player wins!');
				location.reload(true);
			} else if(sum === 7){
				alert('House wins!');
				location.reload(true);
			} else {
				allBetsIn(sum);
			}
		} else {
			if (sum === 7 || sum === 11) {
				alert('Player wins!');
				location.reload(true);
			} else if(sum === 2 || sum === 3 || sum === 12){
				alert('Craps! House wins!');
				location.reload(true);
			} else{
				$sum.val(sum);
				allBetsIn(sum);
			}
		}
	}

	function allBetsIn(sum){
		$point.val(sum);
		rollCount++;
		$rollNum.text(rollCount);
		alert('Roll again.');
	}
});