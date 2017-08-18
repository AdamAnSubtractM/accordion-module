jQuery(document).ready(function($){
    var canvas1 = document.getElementById("buttStock");
    var canvas2 = document.getElementById("ergonomicGrip");
    var canvas3 = document.getElementById("fingerGaurd");
    var views = [canvas1.getContext("2d"), canvas2.getContext("2d"), canvas3.getContext("2d") ];
    var vertices = [];

    // Set to the id of the first button that you want to show
    // var currentLive = $("#jordan-shoe-container a.animate-button:first-of-type").attr("id");

    /*
    * id: needs to match the button id in html
    * image: image path from Scene 7
    * timer: how long the animation should take
    * x: array of coordinates for horizontal position on canvas
    * y: array of coordinates for vertical position on canvas
    */

    var data = [
        {
            id: "buttStock",
            timer: 400,
            x: [25, 25, 20, 30],
            y: [198, 0, 1, 1]
        },
        {
            id: "ergonomicGrip",
            timer: 400,
            x: [25, 25, 20, 30],
            y: [0, 198, 198, 198]
        },
        {
            id: "fingerGaurd",
            timer: 400,
            x: [25, 25, 20, 30],
            y: [0, 198, 200, 200]
        }
    ];

    var a = 1;
    var points;

    // Switch to whatever object in data that you want to go live firsts

    $('.canvasWrap').mouseenter(function(){
        var touchpointTracking = 1;
        if (touchpointTracking < 2) {
            var getPosition = 0;
            a=1;
            vertices = [];
            // clearAll();
            // for (getPosition = 0; getPosition < data.length; getPosition++) {
                goLive(data[getPosition]);
            // }

        }
        touchpointTracking++;
        console.log(touchpointTracking);
    });

    // function clearAll(){
    //     for (m = 0; m < views.length; m++) {
    //         views[m].clearRect(0,0,canvas1.width,canvas1.height,canvas2.width,canvas2.height,canvas3.width,canvas3.height);
    //     }
    // }

    function goLive(button) {
        for (m = 0; m < views.length; m++) {
            views[m].strokeStyle="#FFFFFF"
        }
        for(var i=0; i<button.x.length; i++) {
            vertices.push({x:button.x[i],y:button.y[i]});
        }
        points = calcWaypoints(vertices);
        animate();
    }

    function calcWaypoints(vertices){
        var waypoints=[];
        for(var i=1;i<vertices.length;i++){
            var pt0=vertices[i-1];
            var pt1=vertices[i];
            var dx=pt1.x-pt0.x;
            var dy=pt1.y-pt0.y;
            for(var j=0;j<20;j++){
                var x=pt0.x+dx*j/20;
                var y=pt0.y+dy*j/20;
                waypoints.push({x:x,y:y});
            }
        }
        return(waypoints);
    }

    function animate(){
        if(a<points.length-1){
            requestAnimationFrame(animate);
        }
        // draw a line segment from the last waypoint
        // to the current waypoint
        for (m = 0; m < views.length; m++) {
            views[m].beginPath();
            views[m].moveTo(points[a-1].x,points[a-1].y);
            views[m].lineTo(points[a].x,points[a].y);
            views[m].lineWidth=2;
            views[m].stroke();
        }
        // increment "a" to get the next waypoint
        a++;
    }

    crossbowDetailsActivate();
    crossbowDetailsClickActions();

    function crossbowDetailsActivate() {
        $('.crossbowDetails .item').mouseenter(function(){
            $(this).find('img').attr('src', '//s7d2.scene7.com/is/image/dksfed/detailsPlusHover?fmt=png-alpha');
        });
        $('.crossbowDetails .item').mouseleave(function(){
            $(this).find('img').attr('src', '//s7d2.scene7.com/is/image/dksfed/detailsPlus?fmt=png-alpha');
        });
    }
    function crossbowDetailsClickActions() {
        $('.crossbowDetails .item').click(function(){
            if ($(this).hasClass('desk-one-eighth')) {
                $(this).removeClass('desk-one-eighth');
            }
            if ($(this).hasClass('activeItem')) {
                $(this).removeClass('desk-three-quarters activeItem');
                $(this).addClass('desk-one-third');
                $(this).siblings('.item').addClass('desk-one-third');
                $(this).siblings('.item').removeClass('activeItem desk-one-eighth closedItems');
            } else {
                $(this).addClass('desk-three-quarters activeItem');
                $(this).siblings('.item').removeClass('activeItem desk-one-third desk-three-quarters');
                $(this).siblings('.item').addClass('closedItems desk-one-eighth');
            }
            $(this).removeClass('closedItems');
            // $('.activeItem').click(function(){
            //     // $(this).removeClass('desk-three-quarters activeItem');
            //     // $(this).addClass('desk-one-third');
            //     $(this).siblings('.item').addClass('desk-one-third');
            //     $(this).siblings('.item').removeClass('desk-one-eighth closedItems');
            // });
        });
    }
});

