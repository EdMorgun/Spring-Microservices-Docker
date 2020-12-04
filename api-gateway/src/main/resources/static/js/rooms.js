var localKeyName = "roomToken";
var curRoomId = 0;

$(document).ready(function () {

    checkCurrentUser();
    loadRooms(null);

    $(".login").on('click', function() {
        showLogForm();
        return false;
    });

    $(".registration").on('click', function() {
        showRegForm();
        return false;
    });

    $('#someinf').on('input', function() {
        loadRooms($('#someinf').val());
    });
});

function refreshContent() {
    loadRooms(null);
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
                if(filterName !== null) {filterName = filterName.toLowerCase()};
                if(filterName === null || item["type"].toLowerCase().includes(filterName) || item["description"].toLowerCase().includes(filterName) || item["avermark"].toString().includes(filterName)) {
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

function setOrderFeedbackHandlers() {
    var token = localStorage.getItem(localKeyName);
    $('.orderButs').on('click', function (event) {
        try { $('.feedbackListBlock').remove(); } catch (e) {}
        try { $('#newBook').remove(); } catch (e) {}
        event.preventDefault();
        var id = event.target.id.replace('ordRoom','');
        try { $('#forFeedback').remove(); } catch (e) {}
        $('#' + id + 'room').after(getAppointmentBlock(id));
        curRoomId = id;
        colorAppointments(id);
        $('.appointment').on('click', function(event) {
            performAppointment(event.target.id.replace('app',''))
        });
        $('.newBook').on('click', function (event) {
                    event.preventDefault();
                    var newBook = {};
                    newBook["checkindate"] = $("#checkin").val();
                    newBook["evictiondate"] = $("#checkout").val();
                    console.log(newBook["checkindate"]);
                    $.ajax({
                        type: "POST",
                        headers: {"Authorization": 'Bearer ' + token},
                        data: newBook,
                        dataType: 'json',
                        url: "/booking/booking/new/" + username + '/' + curRoomId,
                        cache: false,
                        timeout: 10000,
                        success: function (data) {
                            console.log("SUCCESS : ", data);
                            try { $('#newBook').remove(); } catch (e) {}
                        },
                        error: function (e) {
                            console.log("ERROR : ", e);
                        }
                    });
                });
    });
    $('.viewFeedback').on('click', function (event) {
        event.preventDefault();
        try { $('.feedbackListBlock').remove(); } catch (e) {}
        try { $('#forFeedback').remove(); } catch (e) {}
        try { $('#newBook').remove(); } catch (e) {}
        var id = event.target.id.replace('viewFeedback','');
        console.log(id);
        getAllRoomFeedback(id);
    });

}

function colorAppointments(roomid) {
    var token = localStorage.getItem(localKeyName);
    $.ajax({
        type: "GET",
        headers: {"Authorization": 'Bearer ' + token},
        url: "/booking/booking/getall/byroom/" + roomid,
        cache: false,
        timeout: 10000,
        success: function (data) {
            console.log("SUCCESS : ", data);
            data.forEach(function (item) {
                $("#" + item["time"] + "app").css({"visibility":"hidden"});
            });
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });
}

function getAllRoomFeedback(roomid) {
    var token = localStorage.getItem(localKeyName);
    $.ajax({
        type: "GET",
        headers: {"Authorization": 'Bearer ' + token},
        url: "/feedback/feedback/getall/feed/" + roomid,
        cache: false,
        timeout: 10000,
        success: function (data) {
            console.log("SUCCESS : ", data);
            var insert = "";
            var iter = 0;
            data.forEach(function (item) {
                iter++;
                insert += getFeedbackListBlock(item["userid"]["username"], item["body"], item["time"], item["mark"]);
            });
            if(iter === 0) {
                $('#' + roomid + 'room').after("<div class='feedbackListBlock'>There is no feedback on this room!</div>");
            } else { $('#' + roomid + 'room').after(insert); }
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });
}

function performAppointment(time) {
    var token = localStorage.getItem(localKeyName);
    $.ajax({
        type: "GET",
        headers: {"Authorization": 'Bearer ' + token},
        url: "/booking/booking/new/" + username + '/' + curRoomId + '/' + time,
        cache: false,
        timeout: 10000,
        success: function (data) {
            console.log("SUCCESS : ", data);
            $('#forFeedback').remove();
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });
}
