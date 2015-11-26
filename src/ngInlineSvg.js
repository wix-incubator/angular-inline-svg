(function () {
	'use strict';

	angular
		.module('inline-svg', [])
		.directive('inlineSvgSymbol', ['$document', '$http', '$templateCache', '$compile', '$rootScope', function ($document, $http, $templateCache, $compile, $rootScope) {
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
							var spriteSvg = angular.element(response.data);
							spriteSvg
								.attr('class', 'ng-hide') // hide
								.attr('data-sprite', ''); // mark
							spriteSvg = $compile(spriteSvg)($rootScope);
							angular.element($document[0].body).prepend(spriteSvg);
						});
					}
				}
			};
		}]);
})();