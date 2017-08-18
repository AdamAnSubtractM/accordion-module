jQuery(document).ready(function($){
    console.log("Ready");
    accordionHoverStates();
    accordionClickStates();
});

function accordionHoverStates() {
    $('.accordionModule .item').mouseenter(function() {
        $(this).find('img.learnMoreBtn').attr("src", "//s7d2.scene7.com/is/image/dksfed/detailsPlusHover?fmt=png-alpha");
    }).mouseleave(function(){
        $(this).find('img.learnMoreBtn').attr("src", "//s7d2.scene7.com/is/image/dksfed/detailsPlus?fmt=png-alpha");
    });
}

function accordionClickStates() {
    $('.accordionModule .item').click(function() {
        var _$t = $(this);
        if (!_$t.hasClass('activeItem')) {
            _$t.addClass('activeItem desk-four-fifths').removeClass('closedItem desk-one-tenth').siblings('.accordionModule .item').addClass('closedItem desk-one-tenth').removeClass("activeItem desk-four-fifths");
        } else {
            _$t.removeClass('activeItem desk-four-fifths').siblings('.accordionModule .item').removeClass('closedItem desk-one-tenth');
        }
    });
}
