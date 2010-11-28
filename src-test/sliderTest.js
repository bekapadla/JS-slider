SliderTest = TestCase("SliderTest");

SliderTest.prototype.testConfig = function () {
	var slider = new slider();
	assertEquals( 20 , slider.step )
}

SliderTest.prototype.testIdParams = function () {
	var slider = new slider();
	assertEquals( 100 , slider.id(0).height );
	assertEquals( 150 , slider.id(0).top );
	assertEquals( 200 , slider.id(0).left );
}

SliderTest.prototype.testIdHide = function () {
	var slider = new slider();
	assertTrue( slider.id(0).hide() );
}
