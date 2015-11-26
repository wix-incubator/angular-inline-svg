'use strict';

describe('Directive: svgInlineSymbol', function () {
	var Driver = function () {
		var $document;
		var element;
		var template = '<inline-svg-symbol sprite="{{sprite}}" symbol="outerSymbolId" />';

		module('inline-svg');
		inject(function (_$document_) {
			$document = _$document_;
		});

		this.given = {
			symbol: function (sprite, symbolId) {
				element = angular.element(template.replace('{{sprite}}', sprite));
				inject(function ($compile, $rootScope) {
					var scope = $rootScope.$new();
					scope.outerSymbolId = symbolId;
					element = $compile(element)(scope);
					$rootScope.$apply();
				});
				return this;
			},
			sprite: function (sprite, content) {
				inject(function ($httpBackend) {
					$httpBackend.whenGET(sprite).respond(content);
				});
				return this;
			}
		};

		this.when = {
			loaded: function () {
				try {
					inject(function ($httpBackend) {
						$httpBackend.flush();
					});
				} catch (e) {
				}
			}
		};

		this.dispose = function () {
			var svgs = $document[0].querySelectorAll('svg[data-sprite]');
			for (var i = 0; i < svgs.length; i++) {
				$document[0].body.removeChild(svgs[i]);
			}
		};

		this.get = {
			domSprites: function () {
				return $document[0].querySelectorAll('svg[data-sprite]');
			},
			symbol    : function (symbolId) {
				return element[0].querySelector('use').getAttribute('xlink:href') === symbolId;
			}
		};

		this.matchers = {
			toBeHidden: function () {
				return {
					compare: function (actual) {
						var valid = true;
						for (var i = 0; i < actual.length; i++) {
							valid = valid && actual[i].classList.contains('ng-hide');
						}
						return {pass: valid};
					}
				};
			}
		};
	};

	var driver;
	beforeEach(function () {
		driver = new Driver();
		jasmine.addMatchers(driver.matchers);
	});

	afterEach(function () {
		driver.dispose();
	});

	it('should create one symbol with sprite', function () {
		driver.given
			.sprite('mySprite.html', '<svg></svg>')
			.symbol('mySprite.html', '#myId');
		driver.when.loaded();
		expect(driver.get.domSprites().length).toBe(1);
		expect(driver.get.domSprites()).toBeHidden();
		expect(driver.get.symbol('#myId')).toBeTruthy();
	});

	it('should create one sprite for each one', function () {
		driver.given
			.sprite('mySprite1.html', '<svg><g id="myId1"></g><g id="myId2"></g></svg>')
			.sprite('mySprite2.html', '<svg><g id="myId3"></g></svg>')
			.symbol('mySprite1.html', '#myId1');
		driver.given.symbol('mySprite1.html', '#myId2');
		driver.when.loaded();
		expect(driver.get.domSprites().length).toBe(1);

		driver.given.symbol('mySprite2.html', '#myId3');
		driver.when.loaded();
		expect(driver.get.domSprites().length).toBe(2);
	});
});
