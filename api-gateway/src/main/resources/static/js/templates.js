function getRegBlock() {
    return "<form id='signup' class='logRegForm'>" +
        "<div><label> Username (must be unique): <input required type='text' id='username'/> </label></div>" +
        "<div><label> E-mail: <input type='text' id='email'/> </label></div>" +
        "<div><label> Password: <input required type='password' id='password'/> </label></div>" +
        "<div><input class='cancelPerfButs' type='submit' value='Sign Up'/></div>" +
        "<div><input class='cancelPerfButs' type='button' id='cancelRegLog' value='Cancel'/></div>" +
        "</form>";
}

function getLogBlock() {
    return "<form id='login' class='logRegForm'>" +
        "<div><label> Nickname: <input required type='text' id='usernameLog'/> </label></div>" +
        "<div><label> Password: <input required type='password' id='passwordLog'/> </label></div>" +
        "<div><label id='errorLog' style='color: red'></label></div>" +
        "<div><input class='cancelPerfButs' type='submit' value='Sign In'/></div>" +
        "<div><input class='cancelPerfButs' type='button' id='cancelRegLog' value='Cancel'/></div>" +
        "</form>";
}

function getLogRegButs() {
    return "<div class='logRegButs' id='noCurrentUser'>" +
        "<button class='login' style='border-radius: 10px 0 0 10px;'>Already have an account!</button>" +
        "<button class='registration' style='border-radius: 0 10px 10px 0;'>Create a new account</button>" +
        "</div>";
}

function getCurrentUserBlock(username) {
    return "<div class='logRegButs'>" +
        "<label style='display: inline-block;' id='currentUsername'>Welcome, " + username + "</label>" +
        "<button style='display: inline-block;' id='currentUser'>Sign Out</button>" +
        "</div>";
}

function getRoomBlock(roomid, type, description, averRating, isAuth) {
    var ret = "<div class='foodBlock' id='" + roomid + "room'>" +
        "<div style='width: 15%'>" + type + "</div>" +
        "<div style='width: 15%'>" + description + "</div>" +
        "<div style='width: 15%'>" + averRating + "</div>";
    if(roomid !== 0) {
        if(isAuth) {
            ret += "<input style='width: 10%; float: right; height:100%;' type='button' value='Book' class='orderButs' id='" + roomid + "ordRoom'/>";
        }
        ret += "<input style='width: 10%; float: right; height:100%;' type='button' value='View feedback' class='viewFeedback' id='" + roomid + "viewFeedback'/>";
    }
    return ret + "</div>";
}

function getRoomAdminBlock(roomid, type, description, averRating) {
    var ret = "<div class='foodBlock'>" +
        "<div style='width: 20%'>" + type + "</div>" +
        "<div style='width: 20%'>" + description + "</div>" +
        "<div style='width: 20%'>" + averRating + "</div>";
    if (roomid !== 0) {
        ret += "<input type='button' value='Delete' class='delRoom' id='" + roomid + "delRoom'/>";
    }
    return ret + "</div>";
}

function getNewRoomAdminBlock() {
    return "<form id='newRoom'>" +
        "<div style='display: inline-flex; width: 100%; margin-bottom: 10px;'>"+
        "<div class='lineo'><label><input style='width: 100%' required type='text' id='type' placeholder='Type of room'/> </label></div>" +
        "<div class='lineo'><label><input style='width: 100%' required type='text' id='description' placeholder='description'/> </label></div>" +
        "<div class='lineo'></div>" +
        "<div class='lineo'><input style='width: 100%' type='submit' value='Add'/></div>" +
        "</div>" +
        "</form>";
}

function getOrderAppointmentBlock(appointmentid, type, description, averRating, checkin, checkout) {
    var ret = "<div class='foodBlock' id='" + appointmentid + "room'>" +
        "<div style='width: 15%'>" + type + "</div>" +
        "<div style='width: 15%'>" + description + "</div>" +
        "<div style='width: 10%'>" + averRating + "</div>" +
        "<div style='width: 10%'>" + checkin + "</div>" +
        "<div style='width: 10%'>" + checkout + "</div>";
    if(appointmentid !== 0) {
        ret += "<input style='width: 10%; height:100%; margin-inline: 20px;' type='button' value='Delete' class='orderButs' id='" + appointmentid + "delApp'/>";
        ret += "<input style='width: 10%; height:100%; margin-inline: 20px;' type='button' value='Leave Feedback' class='viewFeedback' id='" + appointmentid + "viewFeedback'/>";
    }
    return ret + "</div>";
}

function getOrderAppointmentAdminBlock(appointmentid, username, type, description, averRating, checkin, checkout) {
    var ret = "<div class='foodBlock'>" +
        "<div style='width: 15%'>" + username + "</div>" +
        "<div style='width: 12%'>" + type + "</div>" +
        "<div style='width: 15%'>" + description + "</div>" +
        "<div style='width: 10%'>" + averRating + "</div>" +
        "<div style='width: 10%'>" + checkin + "</div>" +
        "<div style='width: 10%'>" + checkout + "</div>";
    if(appointmentid !== 0) {
        ret += "<input style='width: 15%; float: right; height:100%;' type='button' value='Delete' class='orderButs' id='" + appointmentid + "delApp'/>";
    }
    return ret + "</div>";
}

function getFeedbackListBlock(username, body, time, mark) {
    return "<div style='border-bottom: 3px double black;' class='feedbackListBlock'>" +
        "<div style='width: 100%'>Feedback from <b>" + username + "</b> (" + time + " with mark " + mark + "):</div>" +
        "<div style='width: 100%'>" + body + "</div>" +
        "</div>";
}

function getFeedbackBlock(roomid) {
    return "<div id='forFeedback' style='text-align: center'>" +
        "<input type='button' value='1/5' class='markFeedback' id='" + 1 + "mrk'/>" +
        "<input type='button' value='2/5' class='markFeedback' id='" + 2 + "mrk'/>" +
        "<input type='button' value='3/5' class='markFeedback' id='" + 3 + "mrk'/>" +
        "<input type='button' value='4/5' class='markFeedback' id='" + 4 + "mrk'/>" +
        "<input type='button' value='5/5' class='markFeedback' id='" + 5 + "mrk'/>" +
        "<div></div>" +
        "<textarea style='height: 75px; width: 75%; resize: none;' rows='1' placeholder='Type your Feedback' maxlength='255' id='textareaFeedback'></textarea>" +
        "<div></div>" +
        "<input style='width: 20%; height:30px;' type='button' value='Cancel' class='cancelFeedbackBut' id='" + roomid + "cancelFeedback'/>" +
        "<input style='width: 20%; height:30px;' type='button' value='Submit' class='submitFeedbackBut' id='" + roomid + "submitFeedback'/>" +
        "</div>";
}

function getAppointmentBlock() {
    return "<form id='newBook'>" +
        "<i>Check In  </i>"+
        "<input type='date' id='checkin' required>" +
        "<i>  Check Out  </i>"+
        "<input type='date' id='checkout' required>" +
        "<input type='button' value='Book' class='newBook' id='submit'/>" +
        "</form>";
}


//-----------------------------------------------------------------

var username = "";

function logRegHandler() {
    $(".login").on('click', function() {
        showLogForm();
        return false;
    });

    $(".registration").on('click', function() {
        showRegForm();
        return false;
    });
}

function checkCurrentUser() {
    var token = localStorage.getItem(localKeyName);
    console.log(token);
    if(token !== null) {
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
                username = data;
                $("#forlogregbut").html(getCurrentUserBlock(data));
                setTimeout(function () { setLogoutHandler(); }, 100);
            },
            error: function (e) {
                console.log("ERROR : ", e);
            }
        });
    } else {
        $("#forlogregbut").html(getLogRegButs());
        logRegHandler();
    }
}

function setLogoutHandler() {
    $('#currentUser').on('click', function(event) {
        event.preventDefault();
        localStorage.removeItem(localKeyName);
        checkCurrentUser();
        refreshContent();
    });
}

function cancelRegLog() {
    $('#cancelRegLog').on('click', function () {
        $('#forreglogform').html('');
    });
}

function logEvent() {
    $('#login').on('submit', function(event) {
        event.preventDefault();
        var logUser = {};
        logUser["username"] = $("#usernameLog").val();
        logUser["password"] = $("#passwordLog").val();

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/auth/token",
            data: JSON.stringify(logUser),
            dataType: 'text',
            cache: false,
            timeout: 10000,
            success: function (data) {
                console.log("SUCCESS : ", data);
                localStorage.setItem(localKeyName, data);
                $('#forreglogform').html('');
                checkCurrentUser();
                refreshContent();
            },
            error: function (e) {
                console.log("ERROR : ", e);
                $('#errorLog').html("Incorrect username or password!")
            }
        });
        return false;
    });
    cancelRegLog();
}

function showRegForm() {
    $('#forreglogform').html(getRegBlock());
    regEvent();
}

function showLogForm() {
    $('#forreglogform').html(getLogBlock());
    logEvent();
}

function regEvent() {
    $('#signup').on('submit', function(event) {
        event.preventDefault();
        var regUser = {};
        regUser["username"] = $("#username").val();
        regUser["email"] = $("#email").val();
        regUser["active"] = 1;
        regUser["password"] = $("#password").val();
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/auth/registration",
            data: JSON.stringify(regUser),
            dataType: 'json',
            cache: false,
            timeout: 10000,
            success: function (data) {
                console.log("SUCCESS : ", data);
                $('#forreglogform').html('');
            },
            error: function (e) {
                console.log("ERROR : ", e);
            }
        });
        return false;
    });
    cancelRegLog();
}

function sendDeleteAppointment(id) {
    var token = localStorage.getItem(localKeyName);
    $.ajax({
        type: "DELETE",
        headers: {"Authorization": 'Bearer ' + token},
        url: "/booking/booking/del/" + id,
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
}