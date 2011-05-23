$.fn.progressiveType = function(opts){
	var defaults = {
		speed : 1000,
		concurrent : false,
		maintainHeight : false,
		complete : function(){console.log('text rendered');}
	}
	var options = $.extend(defaults, opts);
	var $this = $(this);
	var txt;
	var ind = 0;
	var $elems;
	var theElem;
	var eIndex = 0;
	var txtArray = [];
	if($this.children().length){
		$elems = $this.children();
	}else{
		$elems = $this;
	}
		
	var printer = function(ind){
		theElem = $elems.eq(ind)
		
		$({count:0}).animate({count:txt.length}, {
		    duration: options.speed,
		    step: function() {
		        theElem.text(txt.substring(0, Math.round(this.count)) );
		    }, 
			complete: function(){
				if($elems.length > 1 && eIndex < $elems.length - 1){
					eIndex++;
					txt = txtArray[eIndex];
					printer(eIndex);
				}else{
					options.complete();
				}
			}
		});
	}
	
	$elems.each(function(){
		var t = $(this);
		txtArray.push(t.text());
		if(options.maintainHeight === true){
			t.height(t.height())
		}
	}).text('');
	
	if(options.concurrent === true){
		$elems.each(function(i){
			txt = txtArray[i];
			printer(i);
		});
	}else{
		txt = txtArray[0];
		printer(0);
	}

	return this;
}


