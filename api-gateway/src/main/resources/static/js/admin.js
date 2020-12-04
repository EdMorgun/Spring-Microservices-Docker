var localKeyName = "roomToken";

$(document).ready(function () {

    checkCurrentUser();
    loadAdminStaff();

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
    loadAdminStaff();
}

function loadAdminStaff() {
    var token = localStorage.getItem(localKeyName);
    if(token === null) {
        $("#multiContainer").html("You need to be authorized first!");
        return 0;
    }
    $.ajax({
        type: "POST",
        headers: {"Authorization": 'Bearer ' + token},
        url: "/auth/isadmin",
        data: token,
        cache: false,
        timeout: 10000,
        success: function (data) {
            console.log("SUCCESS : ", data);
            if(data) {
                getRoomsForAdmin();
            } else {
                $("#multiContainer").html("You have no admin access!");
            }
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });
}

function getRoomsForAdmin() {
    var token = localStorage.getItem(localKeyName);
    $.ajax({
        type: "GET",
        headers: {"Authorization": 'Bearer ' + token},
        url: "/search/room/getall",
        cache: false,
        timeout: 10000,
        success: function (data) {
            console.log("SUCCESS : ", data);
            var insert = getRoomAdminBlock(0, "Type", "Description", "Average rating");
            insert += getNewRoomAdminBlock();
            data.forEach(function (item) {
                var avermark = item["avermark"];
                if(avermark === -1) { avermark = "No feedback"; }
                insert += getRoomAdminBlock(item["roomid"], item["type"], item["description"], avermark);
            });
            $.ajax({
                type: "GET",
                headers: {"Authorization": 'Bearer ' + token},
                url: "/booking/booking/getall",
                cache: false,
                timeout: 10000,
                success: function (data1) {
                    insert += "<div><b>All reservations:</b></div>";
                    insert += getOrderAppointmentAdminBlock(0, "Username", "Type", "Description", "Average mark", "Check In", "Check Out");
                    data1.forEach(function (item) {
                        var avermark = item["roomid"]["avermark"];
                        if(avermark === -1) { avermark = "No feedback"; }
                        insert += getOrderAppointmentAdminBlock(item["bookingid"], item["userid"]["username"], item["roomid"]["type"], item["roomid"]["description"], avermark, item["checkInDate"], item["evictionDate"]);
                    });
                    $("#multiContainer").html(insert);
                    setTimeout(function () { adminHandlers(); }, 100);
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

function adminHandlers() {
    $('#newRoom').on('submit', function (event) {
        event.preventDefault();
        var newRoom = {};
        newRoom["type"] = $("#type").val();
        newRoom["description"] = $("#description").val();
        newRoom["avermark"] = 5.0;
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/search/room/add",
            data: JSON.stringify(newRoom),
            dataType: 'json',
            cache: false,
            timeout: 10000,
            success: function (data) {
                console.log("SUCCESS : ", data);
                $("#type").val("");
                $("#description").val("");
                refreshContent();
            },
            error: function (e) {
                console.log("ERROR : ", e);
            }
        });
    });
    $('.delRoom').on('click', function (event) {
        event.preventDefault();
        var token = localStorage.getItem(localKeyName);
        $.ajax({
            type: "DELETE",
            headers: {"Authorization": 'Bearer ' + token},
            url: "/search/room/del/" + event.target.id.replace('delRoom', ''),
            cache: false,
            timeout: 10000,
            success: function (data) {
                console.log("SUCCESS : ", data);
                refreshContent();
            },
            error: function (e) {
                console.log("ERROR : ", e);
            }
        });
    });
    $('.orderButs').on('click', function (event) {
        sendDeleteAppointment(event.target.id.replace('delApp', ''));
    });
}