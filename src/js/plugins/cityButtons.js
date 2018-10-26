import $ from "jquery";

const duration = 300;

function filterByCity(city) {
    $("[wm-city]").each(function (i, e) {
        const isTarget = $(this).attr("wm-city") === city || city === null;

        if (isTarget) {
            $(this).parent().removeClass("d-none"); //ajuda realinhar as imagens escondendo os itens
            $(this).fadeIn(duration);
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass("d-none");
            });
        }
    });
}

$.fn.cityButtons = function () {
    
    const cities = new Set;
    $("[wm-city]").each(function (i, e) {
        cities.add($(e).attr("wm-city"));
    });

    //convert em um array
    const btns = Array.from(cities).map(city => {
        const btn = $("<button>").addClass(["btn", "btn-info"]).html(city);
        btn.on("click", function (e) {
            filterByCity(city);
        });
        return btn;
    });

    const btnAll = $("<button>").addClass(["btn", "btn-info", "active"]).html("Todas");
    btnAll.on("click", function (e) {
        filterByCity(null);
    });
    btns.push(btnAll);

    const btnGroup = $("<div>").addClass(["btn-group"]);
    btnGroup.append(btns);

    $(this).cityButtons.html(btnGroup);
    
    return this;
}

$("[wm-city-buttons]").cityButtons();