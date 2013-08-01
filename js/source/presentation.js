jQuery(function () {
	var c, // alias for cache
	d, // alias for defaults
	Presentation;

	Presentation = {
		cache: {
			snapperElement: $('#content'),
			employmentChart: $('#shift-in-employment'),
			emplomentChartFigures: $('#opportunity .js-figure'),
			tractionChart: $('#traction-chart'),
			averageBudgetChart: $('#average-budget'),
			tractionNumbers: $('.js-traction-numbers'),
		},

		ready: function () {
			c = Presentation.cache;
			d = Presentation.defaults;
			Presentation.initializeSnapperSidebar();
			Presentation.initializeScrollSpy();
			Presentation.initializeTypers();
			
			Presentation.initializeAverageBudgetChart();
		},

		initializeSnapperSidebar: function () {

			var snapper = new Snap({
			 	element: document.getElementById('content'),
			 	disable: 'right',
				touchToDrag: false,
				tapToClose: false
			});

			$('#control-button').click(function (event) {
				if (snapper.state().state == "left") {
			        snapper.close();
			        $(this).removeClass('active');
			    } else {
			        snapper.open('left');
			        $(this).addClass('active');
			    }
			    event.preventDefault();
			});

		},

		initializeScrollSpy: function () {
			var items = [
				{
					selector: $('#opportunity'),
					delay: 250,
					offset: 100,
					onEnter: Presentation.initializeEmploymentChart,
					onLeave: null
				},
				{
					selector: $('#traction'),
					onEnter: Presentation.initializeTractionChart,
					delay: 1000,
					offset: 500,
					onLeave: null
				},
				{
					selector: $('#js-traction-numbers'),
					onEnter: Presentation.initializeTractionNumbers,
					delay: 500,
					offset: 500,
					onLeave: null
				},
				{
					selector: $('#fortune-500'),
					onEnter: Presentation.initializeFortune500Numbers,
					delay: 250,
					offset: 50,
					onLeave: null
				},
			];

			$.each(items, function (index, element) {
				var $element = $(element.selector);
				var position = $element.position();
				$element.scrollspy({
					container: c.snapperElement,
					min: position.top + element.offset,
					max: position.top + $element.height() + element.offset,
					onEnter: function () {
						setTimeout(function () {
							element.onEnter();
						}, element.delay);
					},
					onLeave: function () {
						if (typeof element.onLeave === 'function') {
							element.onLeave();
						}
					}
				});
			});
		},

		initializeTypers: function () {
			$('[data-typer-targets]').typer();
		},

		initializeEmploymentChart: function () {
			var ctx,
				data,
				options;

			ctx = c.employmentChart.get(0).getContext("2d");

			data = {
				labels : ["2011","2020"],
				datasets : [
					{
						fillColor : "rgba(200,200,200,0.5)",
						strokeColor : "rgba(200,200,200,1)",
						pointColor : "rgba(200,200,200,1)",
						pointStrokeColor : "#fff",
						data : [60, 58]
					},
					{
						fillColor : "rgba(62,177,226,.5)",
						strokeColor : "rgba(62,177,226,1)",
						pointColor : "rgba(62,177,226,1)",
						pointStrokeColor : "#fff",
						data : [16,70]
					}
				]
			};

			options = {
				scaleOverlay : true,
				scaleOverride : true,
				scaleSteps : 4,
				scaleStepWidth : 20,
				scaleStartValue : 0,
				scaleLineColor : "rgba(0,0,0,.2)",
				scaleLabel : "<%=value%> MM",
				animationSteps : 120,
				pointDotRadius : 5,
				pointDotStrokeWidth : 2,
				datasetStroke : true,
				datasetStrokeWidth : 2,
				scaleFontFamily : "'Helvetica Neue'",
				scaleFontStyle : "bold",
				scaleFontColor : "#999",	
				scaleShowGridLines : true,
				scaleGridLineColor : "rgba(0,0,0,.1)",
			}

			new Chart(ctx).Line(data, options);

			c.emplomentChartFigures.fadeIn('slow');
		},

		initializeTractionChart: function () {
			var ctx,
				data,
				options;

			ctx = c.tractionChart.get(0).getContext("2d");

			data = {
				labels : ["Feb 13","Mar 13", "Apr 13", "May 13", "Jun 13", "Jul 13", "Aug 13"],
				datasets : [
					{
						fillColor : "rgba(62,177,226,.5)",
						strokeColor : "rgba(62,177,226,1)",
						pointColor : "rgba(62,177,226,1)",
						pointStrokeColor : "#fff",
						data : [55300, 103638, 243668, 352408, 507358, 722391, 951279]
					}
				]
			};

			options = {
				scaleOverlay : true,
				scaleOverride : true,
				scaleSteps : 5,
				scaleStepWidth : 200000,
				scaleStartValue : 0,
				bezierCurve : false,
				scaleLineColor : "rgba(0,0,0,.2)",
				scaleLabel : "$<%=value%>",
				animationSteps : 120,
				pointDotRadius : 5,
				pointDotStrokeWidth : 2,
				datasetStroke : true,
				datasetStrokeWidth : 2,
				scaleFontFamily : "'Helvetica Neue'",
				scaleFontStyle : "bold",
				scaleFontColor : "#999",	
				scaleShowGridLines : true,
				scaleGridLineColor : "rgba(0,0,0,.1)",
			}

			new Chart(ctx).Line(data, options);
		},

		initializeTractionNumbers: function () {
			$('#revenue-in-4-months').animateNumbers(650000, true, 3000);
			$('#growth-rate').animateNumbers(27, true, 3000);
		},

		initializeAverageBudgetChart: function () {
			var ctx,
				data,
				options;

			ctx = c.averageBudgetChart.get(0).getContext("2d");

			data = {
				labels : [""],
				datasets : [
					{
						fillColor : "rgba(62,177,226,.5)",
						strokeColor : "rgba(62,177,226,1)",
						data : [5000]
					},
					{
						fillColor : "rgba(200,200,200,0.5)",
						strokeColor : "rgba(200,200,200,1)",
						data : [500]
					}
				]
			};

			options = {
				scaleOverlay : true,
				scaleOverride : true,
				scaleSteps : 5,
				scaleStepWidth : 1000,
				scaleStartValue : 0,
				scaleLineColor : "rgba(0,0,0,.1)",
				scaleLineWidth : 1,
				scaleShowLabels : true,
				scaleFontFamily : "'Helvetica Neue'",
				scaleFontStyle : "bold",
				scaleFontColor : "#999",
				scaleLabel : "$<%=value%>",	
				scaleGridLineColor : "rgba(0,0,0,.05)",
				scaleGridLineWidth : 1,	
				barShowStroke : true,
				barStrokeWidth : 2,
				barValueSpacing : 5,
				barDatasetSpacing : 1,
				animationSteps : 120,
				onAnimationComplete : null
			};

			new Chart(ctx).Bar(data,options);
		},

		initializeFortune500Numbers: function () {
			$('#fortune-number').animateNumbers(50000, true, 3000);
		}
	}

	Presentation.ready();
});
