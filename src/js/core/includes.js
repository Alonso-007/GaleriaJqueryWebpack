import $ from "jquery"; //importa o jquery do node modules

const loadHtmlSucessCallbacks = [];

export function onLoadHtmlSucess(callback){
    if(!loadHtmlSucessCallbacks.includes(callback)){
        loadHtmlSucessCallbacks.push(callback);
    }
} 

function loadIncludes(parent) {
    if(!parent) parent = "body";

    $(parent).find("[wm-include]").each(function(i,e){
        const url = $(e).attr("wm-include");
        $.ajax({
            url,
            success(data){
                $(e).html(data);
                $(e).removeAttr("wm-include");

                loadHtmlSucessCallbacks.forEach(callback => callback(data));

                loadIncludes(e); //processa de forma recussiva caso tenha varios includes
            }
        });
    });
}

loadIncludes();