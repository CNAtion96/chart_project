$(document).ready(function() {


	var ctx = document.getElementById("myChart");


	function getRandomColors() {
	    var letters = '0123456789ABCDEF';
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 12)];
	    }
	    return color;
	}


	$.ajax({
	   url: `http://www.NflArrest.com/api/v1/team`,
	   success: (res)=>{
        console.log(res);
	   	let data = res.reduce((obj,team)=>{
	   		obj.teams.push(team.Team_name);
	   		obj.arrests.push(team.arrest_count);
	   		obj.colors.push(getRandomColors());
	   		return obj;
	   	},{
	   		teams:[],
	   		arrests:[],
	   		colors:[],
	   	})
	   	createChart(data);

	   }
	});


	function createChart(data)
	{
		const myChart = new Chart(ctx,{
		    type: 'doughnut',
		    data: { 
			    labels: data.teams,
			    datasets: [
		        {
		        	data: data.arrests,
		            backgroundColor: data.colors
		        }]
	    	},
		    options: {
	        	responsive: false
	    	}
		});
	}


});