jQuery.fn.extend({
    alertMessage: function(message, type, seconds, func) {
        var alertHtml = '<div id="mes"> <div class="alert alert-{{type}}"> <button data-dismiss="alert" class="close">×</button> {{message}} </div> </div>';
        this.html(alertHtml.replace("{{type}}", type).replace("{{message}}", message));
        seconds = seconds * 1000 || 1000;
        var that = this;
        setTimeout(function() {
            that.html("");
            if (func) func();
        }, seconds);
    },
    model : function(){
    	
    },
    radio : function(){
        var that = this;
        return {
            value : function(value){
                $(that).each(function(){
                    if($(this).val() == value){
                        $(this).attr("checked","checked");
                    }
                })
                return $(that.selector+":checked").val();
            }
        }
    }

});