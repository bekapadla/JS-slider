slider = {};

slider.prototype.step = 20;

slider.prototype.id = function(sel_id){
	switch (sel_id) {
		case 0:
			this.height = 100;
			this.top = 150;
			this.left = 200;
			break
	};
};
