myApp.controller('indexCtrl',function($scope, $interval)
{
	console.log('indexCtrl');
	
	var on = true;
	
	var blink = $interval(function(){ 
		if (on)
		{
			on = false;
			document.getElementById('blinker').innerHTML = "where you FiNish off your friends'";
		}
		else
		{
			on = true;
			document.getElementById('blinker').innerHTML = "where you FiNish off your friends'_";
		}
	}, 800);
});