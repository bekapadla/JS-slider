SliderTest = TestCase("SliderTest");

// Тест конфига слайдера
SliderTest.prototype.testConfig = function () {
	var test = new slider();
	assertEquals( 5 , test.max_img );
	assertEquals( 20 , test.step );
}

// Проверка работоспособности id параметров
SliderTest.prototype.testIdParams = function () {
	var test = new slider();
	test_param = 150;
	assertEquals( test_param, test.params[0].width = test_param );
}

SliderTest.prototype.testInit = function () {
	var test = new slider();
	assertTrue( test.init() );
	assertEquals( 200 , test.params[ Math.floor( this.max_img / 2 ) + 1 ].width );
	assertEquals( 40 , test.params[ Math.floor( this.max_img / 2 ) + 1 ].top );
	assertEquals( 900 , test.params[ Math.floor( this.max_img / 2 ) + 1 ].zindex );
	
}
