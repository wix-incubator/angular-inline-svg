(function () {
	'use strict';

	angular
		.module('inline-svg', [])
		.directive('inlineSvgSymbol', ['$document', '$http', '$templateCache', function ($document, $http, $templateCache) {
			var sprites = [];
			return {
				restrict: 'E',
				replace : true,
				scope   : {
					symbol: '='
				},
				template: '<svg><use xlink:href="{{symbol}}"></use></svg>',
				link    : function (scope, element, attrs) {
					var sprite = attrs.sprite;
					// if not already loaded
					if (sprites.indexOf(sprite) < 0) {
						sprites.push(sprite);
						$http.get(sprite, {cache: $templateCache}).then(function (response) {
							var $spriteSVG = angular.element(response.data);
							$spriteSVG
								.attr('class', 'ng-hide') // hide
								.attr('data-sprite', ''); // mark
							angular.element($document[0].body).prepend($spriteSVG);
						});
					}
				}
			};
		}]);
})();