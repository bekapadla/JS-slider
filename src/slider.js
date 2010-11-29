slider = function(){
	// Параметры слайдера
	this.step = 20;
	this.max_img = 5;
	this.def_w = 200;
	this.obj = $("#slider > img");
	this.contaner = $("#slider");
	// Хранение id параметров
	this.params = [{}];
	
	this.init = function () {
		// Описание параметров
		// Описание центрального элемента 
		this.params[ Math.floor( this.max_img / 2 ) ] = {
			width: this.def_w,
			top: ( ( this.def_w / 100 ) * this.step ),
			left: ( ( this.contaner.width() / 2 ) - ( this.def_w / 2 ) ),
			zindex: 1000
		}
		// Описание остальных элементов
		for ( i = 1; i <= Math.floor( this.max_img / 2 ); i++ ) {
			new_width = ( this.params[ ( Math.floor( this.max_img / 2 ) ) + i - 1 ].width / 100 ) * ( 100 - this.step );
			new_top = this.params[ Math.floor( this.max_img / 2 ) - 1 + i ].top + this.step;
			new_zindex = this.params[ Math.floor( this.max_img / 2 ) - 1 + i ].zindex - 1;
			// Картинки справа
			this.params[ Math.floor( this.max_img / 2 ) + i ] = {
				width: new_width,
				top: new_top,
				left: (this.params[ Math.floor( this.max_img / 2 ) - 1 + i ].left) + (this.params[ Math.floor( this.max_img / 2 ) - 1 + i ].width) - this.step,
				zindex: new_zindex
			}
			// Картинки слева
			this.params[ Math.floor( this.max_img / 2 ) - i ] = {
				width: new_width,
				top: new_top,
				left: (this.params[ Math.floor( this.max_img / 2 ) + 1 - i ].left) - new_width + this.step,
				zindex: new_zindex
			}
		}
		
		for ( i = 0; i < this.max_img ; i++ ){
			this.obj.eq( i ).css({ 'z-index' : this.params[ i ].zindex }).animate({
				'width' : this.params[i].width,
				'top' : this.params[i].top,
				'left' : this.params[i].left,
			})
		};
		return true;
	}
	
// Перемещение и анимация картинки на одну позицию.	
//	this.move = function(from, to){
//		$(this.obj).eq(from).css({
//			'z-index': this.id(to).zindex
//		});
//		$(this.obj).eq(from).animate({
//			'width': this.id(to).width,
//			'top': this.id(to).top,
//			'left': this.id(to).left,
//		});
//		return true;
//	}
//		
//		for ( i = 0; i < this.obj.length; i++ ) {
//			this.params[i] = {
//				width: this.obj[i].width
//			};
//		}

}
