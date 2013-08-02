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
			Presentation.initializeAverageBudgetChart();

			if (Modernizr.touch) {
				Presentation.mobileReady();
			} else {
				Presentation.desktopReady();
			}
		},

		desktopReady: function () {
			Presentation.initializeTypers();
			Presentation.initializeScrollSpy();
		},

		mobileReady: function () {
			Presentation.initializeEmploymentChart();
			Presentation.initializeTractionChart();
			Presentation.initializeTractionNumbers();
			Presentation.initializeFortune500Numbers();
			Presentation.initializeProductSection();
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
					offset: 50,
					onEnter: Presentation.initializeEmploymentChart,
					onLeave: null
				},
				{
					selector: $('#traction'),
					onEnter: Presentation.initializeTractionChart,
					delay: 500,
					offset: 2800,
					onLeave: null
				},
				{
					selector: $('#js-traction-numbers'),
					onEnter: Presentation.initializeTractionNumbers,
					delay: 500,
					offset: 2500,
					onLeave: null
				},
				{
					selector: $('#fortune-number'),
					onEnter: Presentation.initializeFortune500Numbers,
					delay: 500,
					offset: 3300,
					onLeave: null
				},
				{
					selector: $('#no-noise'),
					onEnter: Presentation.initializeProductSection,
					delay: 1000,
					offset: 2000,
					onLeave: null
				},
			];

			$.each(items, function (index, element) {
				var $element = $(element.selector);
				var position = $element.offset();

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
			var sentences,
				count,
				max,
				$type,
				loop;

			sentences = [
				"from anywhere",
				"in any space",
				"at anytime",
				"in any place"
			];

			count = 0;
			max = sentences.length - 1;

			$type = $('#type');

			loop = function () {
				setTimeout(function () {
					if (count > max) {
						count = 0;
					}
					$type.text(sentences[count]);
					count++;
					loop();
				}, 2000);
			}

			loop();
		},

		initializeEmploymentChart: function () {
			var ctx,
				data,
				options;

			ctx = c.employmentChart.get(0).getContext("2d");

			data = {
				labels : ["2012", "2014", "2016", "2018", "2020"],
				datasets : [
					{
						fillColor : "rgba(200,200,200,0)",
						strokeColor : "rgba(200,200,200,1)",
						pointColor : "rgba(200,200,200,1)",
						pointStrokeColor : "#fff",
						data : [60, 59.5, 59, 58.5, 58]
					},
					{
						fillColor : "rgba(62,177,226,0)",
						strokeColor : "rgba(62,177,226,1)",
						pointColor : "rgba(62,177,226,1)",
						pointStrokeColor : "#fff",
						data : [16, 20, 30, 45, 70]
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
				pointDotRadius : 0,
				pointDotStrokeWidth : 0,
				datasetStroke : false,
				bezierCurve : false,
				datasetStrokeWidth : 3,
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
		},

		initializeProductSection: function () {
			var $images = $('#no-noise .js-image');

			$images.eq(0).fadeIn();

			setTimeout(function () {
				$images.eq(1).fadeIn();
				setTimeout(function () {
					$images.eq(2).fadeIn();
				}, 1000);
			}, 1000);
		}
	};

	Presentation.ready();
});