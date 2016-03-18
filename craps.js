$(function(){

	// Spining Dice in the header
	$(".dieL").addClass("animated");
	$(".dieR").addClass("animated");

	// Checking if browser supports CSS transform
	// This is care of Joseph Lowery @Lynda: CSS Transitions & Transforms
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

	// Die sides
	var die1 = [1,2,3,4,5,6];
	var die2 = [1,2,3,4,5,6];
	var $d1bs = document.querySelector('#show-buttons').children;
	var $d2bs = document.querySelector('#show-buttons2').children;
	var rolls = [];
	var one;
	var two;
	var rollCount = 0;
	var $rollNum = $('#rollCount');
	var $msg = $('.modal-content');

	// Player dice display
	var $d1 = $('#d1');
	var $d2 = $('#d2');
	// Player total & point
	var $total = $('#total');
	var $point = $('#point');


	$('#roll').on('submit', function(e){
		e.preventDefault();
		$("#player")[0].play();
		one = die1[Math.floor(Math.random()*die1.length)];
		two = die2[Math.floor(Math.random()*die2.length)];

		$($d1bs[one - 1]).trigger('click');
		$($d2bs[two - 1]).trigger('click');
		dealer(one,two);
		one = 0;
		two = 0;
	});

	function dealer(a,b){
		var sum = a + b;	
		

		if (rollCount >= 1) {
			if (sum === Number($point.text())) {
				$msg.text("Congratulations, you've won!");
				window.setTimeout(messenger, 2000);
				rollCount = 0;
				$rollNum.text(rollCount);
			} else if(sum === 7){
				$msg.text('House wins!');
				window.setTimeout(messenger, 2000);
				rollCount = 0;
				$rollNum.text(rollCount);
			} else {
				allBetsIn(sum);
			}
		} else {
			if (sum === 7 || sum === 11) {
				$msg.text("You rolled a "+ sum + ' on your first throw!' + " Congratulations, you've won!");
				window.setTimeout(messenger, 2000);
				rollCount = 0;
				$rollNum.text(rollCount);
			} else if(sum === 2 || sum === 3 || sum === 12){
				$msg.text('Craps! House wins!');
				window.setTimeout(messenger, 2000);
				rollCount = 0;
				$rollNum.text(rollCount);
			} else{
				$point.text(sum);
				allBetsIn(sum);
			}
		}
	}

	function messenger(){
		$('.msgBtn').trigger('click');
	}

	function allBetsIn(sum){
		rollCount++;
		$rollNum.text(rollCount);
		$msg.text('Roll again. You want to make your point.');
		window.setTimeout(messenger, 1000);
	}
});