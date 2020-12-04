var localKeyName = "roomToken";
var lastMark = 1;

$(document).ready(function () {

    checkCurrentUser();
    loadAppointments();

    $(".login").on('click', function() {
        showLogForm();
        return false;
    });

    $(".registration").on('click', function() {
        showRegForm();
        return false;
    });

});

function refreshContent() {
    loadAppointments();
}

function loadRooms(filterName)  {
    var token = localStorage.getItem(localKeyName);
    $.ajax({
        type: "GET",
        headers: {"Authorization": 'Bearer ' + token},
        url: "/search/room/getall",
        cache: false,
        timeout: 10000,
        success: function (data) {
            console.log("SUCCESS : ", data);
            var iter = 0;
            var insert = getRoomBlock(0, "Type", "Description", "Average rating");
            var isAuth = true;
            data.forEach(function (item) {
                isAuth = token !== null;
                if(filterName !== null) { filterName = filterName.toLowerCase()};
                if(filterName === null || item["type"].toLowerCase().includes(filterName) || item["description"].toLowerCase().includes(filterName) ||  item["avermark"].toString().includes(filterName)) {
                    iter++;
                    var avermark = item["avermark"];
                    if(avermark === -1) { avermark = "No feedback"; }
                    insert += getRoomBlock(item["roomid"], item["type"], item["description"], avermark, isAuth);
                }
            });
            if(iter === 0 && token !== null) {
                $("#multiContainer").html("There are no rooms we can offer you!");
            }
            else {
                $('#multiContainer').html(insert);
            }
            setTimeout(function () { setOrderFeedbackHandlers(); }, 100);
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });
}

function loadAppointments()  {
    var token = localStorage.getItem(localKeyName);
    if(token === null) {
        $('#multiContainer').html("You need to be authorized first!");
    } else {
        $.ajax({
            type: "POST",
            headers: {"Authorization": 'Bearer ' + token},
            url: "/auth/getusername",
            data: token,
            dataType: 'text',
            cache: false,
            timeout: 10000,
            success: function (data) {
                console.log("SUCCESS : ", data);
                $.ajax({
                    type: "GET",
                    headers: {"Authorization": 'Bearer ' + token},
                    url: "/booking/booking/getall/byuser/" + data,
                    cache: false,
                    timeout: 10000,
                    success: function (data) {
                        console.log("SUCCESS : ", data);
                        var iter = 0;
                        var insert = getOrderAppointmentBlock(0, "Name", "Description", "Average rating", "Check In", "Check Out");
                        var appointmentid = 0;
                        if(token === null) {
                            $("#multiContainer").html("You need to be authorized first!");
                            return 0;
                        }
                        data.forEach(function (item) {
                            iter++;
                            appointmentid = 0;
                            if(token !== "null") { appointmentid = item["bookingid"]; }
                            var avermark = item["roomid"]["avermark"];
                            if(avermark === -1) { avermark = "No feedback"; }
                            insert += getOrderAppointmentBlock(appointmentid, item["roomid"]["type"], item["roomid"]["description"], avermark, item["checkInDate"], item["evictionDate"]);
                        });""
                        if(iter === 0) {
                            $("#multiContainer").html("There are no orders yet!");
                        }
                        else {
                            $("#multiContainer").html(insert);
                            setTimeout(function () { setDeleteAndFeedbackHandler(); }, 100);
                        }
                    },
                    error: function (e) {
                        console.log("ERROR : ", e);
                    }
                });
            },
            error: function (e) {
                console.log("ERROR : ", e);
            }
        });
    }
}

function setDeleteAndFeedbackHandler() {
    $('.orderButs').on('click', function (event) {
        sendDeleteAppointment(event.target.id.replace('delApp',''));
    });
    $('.viewFeedback').on('click', function (event) {
        event.preventDefault();
        var id = event.target.id.replace('viewFeedback','');
        console.log(id);
        try { $('#forFeedback').remove(); } catch (e) {}
        $('#' + id + 'room').after(getFeedbackBlock(id));
        $('.markFeedback').on('mouseover', function(event) {
            colorFill(event.target.id.replace('mrk',''));
        });
        $('.markFeedback').on('click', function(event) {
            lastMark = event.target.id.replace('mrk','');
        });
        $('.markFeedback').on('mouseleave', function(event) {
            colorFill(lastMark);
        });
        setTimeout(function () { colorFill(lastMark);; }, 50);
        setTimeout(function () { feedbackHandlers(); }, 100);
    });
}

function colorFill(num) {
    for(var i = 1; i <= num; i++) {
        $('#' + i +  "mrk").css({"background" : "yellow"});
    }
    num++;
    for(var j = num; j <= 5; j++) {
        $('#' + j +  "mrk").css({"background" : "white"});
    }
}

function feedbackHandlers() {
    $('.cancelFeedbackBut').on('click', function () {
        $('#forFeedback').remove();
    });
    $('.submitFeedbackBut').on('click', function (event) {
        sendFeedback(event.target.id.replace('submitFeedback', ''));
    });
}

function sendFeedback(id) {
    var token = localStorage.getItem(localKeyName);
    $.ajax({
        type: "POST",
        headers: {"Authorization": 'Bearer ' + token},
        contentType: 'text/plain',
        url: "/feedback/feedback/new/" + username + '/' + id + '/' + lastMark,
        data: $('#textareaFeedback').val(),
        cache: false,
        timeout: 100000,
        success: function (data) {
            console.log("SUCCESS : ", data);
            refreshContent();
            $('#forFeedback').remove();
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });
}