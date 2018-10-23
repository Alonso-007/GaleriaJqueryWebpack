import $ from "jquery"; //importa o jquery do node modules

function loadIncludes(parent) {
    if(!parent) parent = "body";

    $(parent).find("[wm-include]").each(function(i,e){
        const url = $(e).attr("wm-include");
        $.ajax({
            url,
            success(data){
                $(e).html(data);
                $(e).removeAttr("wm-include");

                loadIncludes(e); //processa de forma recussiva caso tenha varios includes
            }
        });
    });
}

loadIncludes();