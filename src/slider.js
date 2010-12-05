slider = function(){
	// Параметры слайдера
	this.step = 20;
	this.max_img = 5;
	this.def_w = 200;
	this.obj = "#slider > img";
	this.contaner = "#slider";
	this.speed = 250;
	// Хранение id параметров
	this.params = [{}];

	this.init = function () {
		// Описание параметров
		// Описание центрального элемента
		this.max_img += 2;
		this.params[ Math.floor( this.max_img / 2 ) ] = {
			width: this.def_w,
			top: ( ( this.def_w / 100 ) * this.step ),
			left: ( ( $(this.contaner).width() / 2 ) - ( this.def_w / 2 ) ),
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

		this.max_img -= 2;
		
		console.log("Centering images");
		for (i = 1; i <= this.max_img; i++) {
			console.log("Centered image %s", i);
			$(this.obj).eq( i - 1 ).css({ 'z-index' : this.params[ i ].zindex }).animate({
				'width' : this.params[ Math.floor(( this.max_img + 2 ) / 2 ) ].width,
				'top' : this.params[ Math.floor(( this.max_img + 2 ) / 2 ) ].top,
				'left' : this.params[ Math.floor(( this.max_img + 2 ) / 2 ) ].left,
			}, this.speed )			
		}
	}

	this.start = function () {
		console.log("Set up images");
		for ( i = 1; i <= this.max_img ; i++ ){
			console.log("Set image %s", i);
			$(this.obj).eq( i - 1 ).animate({
				'width' : this.params[ i ].width,
				'top' : this.params[ i ].top,
				'left' : this.params[ i ].left,
			}, this.speed ).css({ 'z-index' : this.params[ i ].zindex });
		};
	}

	this.move_right = function () {
		console.log("Move images right");
		console.log("	Copy last image to the begin of slider");
		$(this.obj).eq(4).clone().prependTo(this.contaner);
		console.log("	Apply styles for first image and hide it");
		$(this.obj).eq(0).css({
			'width': this.params[0].width,
			'top': this.params[0].top,
			'left': this.params[0].left,
			'opacity': 0,
			'z-index': this.params[0].zindex
		});
		console.log("	Move all images rigth");
		for ( i = 0; i <= $(this.obj).length; i++){
			if ( i == 5 ) {
				console.log("		Hide last image");
				$(this.obj).eq(i).animate({
				'width': this.params[i+1].width,
				'top': this.params[i+1].top,
				'left': this.params[i+1].left,
				'opacity': 0
				}, this.speed,function(){
					console.log("		Delete first image");
					$(this).remove();
				});				
			} else if ( i == 0 ) {
				console.log("		Show last image");
				$(this.obj).eq(i).animate({
				'width': this.params[i+1].width,
				'top': this.params[i+1].top,
				'left': this.params[i+1].left,
				'opacity': 1
				}, this.speed ).css({'z-index': this.params[i+1].zindex});
			} else {
				$(this.obj).eq(i).animate({'top': this.params[i+1].top,'width': this.params[i+1].width,
				'left': this.params[i+1].left
				}, this.speed );
				$(this.obj).eq(i).css({'z-index': this.params[i+1].zindex});				
			}
		}
	}

	this.move_left = function () {
		console.log("Move images left");
		console.log("	Copy first image to the end of slider");
		$(this.obj).eq(0).clone().appendTo(this.contaner);
		console.log("	Apply styles for last image and hide it");
		$(this.obj).eq(5).css({
			'width': this.params[6].width,
			'top': this.params[6].top,
			'left': this.params[6].left,
			'opacity': 0,
			'z-index': this.params[6].zindex
		});
		console.log("	Move all images left");
		for ( i = 0; i <= $(this.obj).length; i++){
			if ( i == 0 ) {
				console.log("		Hide first image");
				$(this.obj).eq(i).animate({
				'width': this.params[i].width,
				'top': this.params[i].top,
				'left': this.params[i].left,
				'opacity': 0
				}, this.speed,function(){
					console.log("		Delete first image");
					$(this).remove();
				});				
			} else if ( i == 5 ) {
				console.log("		Show last image");
				$(this.obj).eq(i).animate({
				'width': this.params[i].width,
				'top': this.params[i].top,
				'left': this.params[i].left,
				'opacity': 1
				}, this.speed ).css({'z-index': this.params[i].zindex});
			} else {
				$(this.obj).eq(i).animate({
				'width': this.params[i].width,
				'top': this.params[i].top,
				'left': this.params[i].left
				}, this.speed );
				$(this.obj).eq(i).css({'z-index': this.params[i].zindex});				
			}
		}
	}

// Перемещение и анимация картинки на одну позицию.	
	this.move = function( id , to_pos, showhide ){
		console.log("    Move algorithm for image " + (id+1) )

		$(this.obj).eq(id).animate({
			'width': this.params[to_pos].width,
			'top': this.params[to_pos].top,
			'left': this.params[to_pos].left
		}, this.speed );
		$(this.obj).eq(id).css({
			'z-index': this.params[to_pos].zindex
		});

		if (showhide == "show") {
			$(this.obj).eq(id).fadeIn(this.speed);
		} else if (showhide == "hide") {
			$(this.obj).eq(id).fadeOut(this.speed);
		}

	}

}