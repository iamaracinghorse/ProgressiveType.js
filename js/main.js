$.fn.progressiveType = function(opts){
	var defaults = {
		speed : 0,
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
	var txtArray = [];
	if($this.children().length){
		$elems = $this.children();
	}else{
		$elems = $this;
	}
	
	var loop = function(eIndex){
		window.setTimeout(function(){
			theElem = $($elems[eIndex]);
			// console.log(txt);
			if(ind<txt.length){
				theElem.text(theElem.text() + txt[ind] );
				ind++;
				loop(eIndex);
			}else if(ind==txt.length && eIndex < $elems.length - 1){
				eIndex++;
				ind = 0;
				txt = txtArray[eIndex]
				loop(eIndex);
			}else{
				options.complete();
			}
		}, options.speed);
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
			loop(i);
		});
	}else{
		txt = txtArray[0];
		loop(0);
	}

	return this;
}

$(document).ready(function() {
	$('.content').each(function(){
		$(this).progressiveType({maintainHeight:true});
	});
	
	$('.sidebar').each(function(){
		$(this).progressiveType({maintainHeight:true});
	});
	
	$('.footer').each(function(){
		$(this).progressiveType({maintainHeight:true});
	});
});


