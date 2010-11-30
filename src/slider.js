slider = function(){
	// Параметры слайдера
	this.step = 20;
	this.max_img = 5;
	this.def_w = 200;
	this.obj = $("#slider > img");
	this.contaner = $("#slider");
	this.speed = 250;
	// Хранение id параметров
	this.params = [{}];
	this.notshown = [{}];
	
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
		// Описание скрытых картинок
		new_width = ( this.params[ 0 ].width / 100 ) * ( 100 - this.step );
		new_top = this.params[ 0 ].top + this.step;
		new_zindex = this.params[ 0 ].zindex - 1;
		this.notshown[ 0 ] = {
			width: new_width,
			top: new_top,
			left: this.params[ 0 ].left - new_width + this.step,
			zindex: new_zindex
		}
		this.notshown[ 1 ] = {
			width: new_width,
			top: new_top,
			left: this.params[ 4 ].left + this.params[ 4 ].width - this.step,
			zindex: new_zindex
		}		
		
		for (i = 0; i < this.max_img; i++) {
			this.obj.eq( i ).css({ 'z-index' : this.params[ i ].zindex }).animate({
				'width' : this.params[ Math.floor( this.max_img / 2 ) ].width,
				'top' : this.params[ Math.floor( this.max_img / 2 ) ].top,
				'left' : this.params[ Math.floor( this.max_img / 2 ) ].left,
			}, this.speed )			
		}
	}
	
	this.start = function () {
		for ( i = 0; i < this.max_img ; i++ ){
			this.obj.eq( i ).animate({
				'width' : this.params[i].width,
				'top' : this.params[i].top,
				'left' : this.params[i].left,
			}, this.speed ).css({ 'z-index' : this.params[ i ].zindex });
		};
	}
	
	this.move_right = function () {
		for ( i = 0; i < this.max_img; i++ ){
			this.move( i , i + 1 );
		};
	}

	this.move_left = function () {
		for ( i = this.max_img; i >= 0; i-- ){
			this.move( i , i - 1 );
		};
	}
	
// Перемещение и анимация картинки на одну позицию.	
	this.move = function(from, to){
		if (to == 5) {
			this.obj.eq(from).animate({
				'width': this.notshown[ 1 ].width,
				'top': this.notshown[ 1 ].top,
				'left': this.notshown[ 1 ].left,
				'opacity': 0
			}, this.speed , function() {
				this.obj.eq(from).hide();				
			});
			this.obj.eq(from).css({ 'z-index' : this.notshown[ 1 ].zindex });
		};
		this.obj.eq(from).animate({
			'width': this.params[to].width,
			'top': this.params[to].top,
			'left': this.params[to].left,
		}, this.speed );
		this.obj.eq(from).css({ 'z-index' : this.params[ to ].zindex });
	}

}
