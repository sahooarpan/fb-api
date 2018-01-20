/*=================
 function to initiate jquery on scroll effect
 using wow js framework
    
    
===================*/
$(function () {
    new WOW().init();
});
/*===========================

initializing doc.ready method
============================*/
$(document).ready(function () {

    $("#input").click(function () { //when user submits and clicks the go! button the token will be saved on fbtoken variable
        var myFacebookToken = $("#fbToken").val();
        console.log(myFacebookToken); // testing purpose only for checking the api token


        /*============================
        initializing ajax call for 
        basic information of the person 
        ===============================*/
        $.ajax('https://graph.facebook.com/me?fields=about,hometown,id,name,first_name,last_name,birthday,languages,gender,education,work,relationship_status,quotes,family,website,email,picture.width(300).height(300),cover&access_token=' + myFacebookToken, {
                //initializing success function
                success: function (response) {
                    console.log(response);
                    console.log(typeof (response));
                    $("#welcome").html("<h1>" + " " + response.first_name + " " + response.last_name + "</h1>").css({
                        "text-transform": "uppercase",
                        "text-align": "center",
                        "font-weight": "900",
                        "margin-top": "20px"

                    });
                    $("#firstName").html(response.first_name);
                    $("#lastName").html(response.last_name);
                    $("#myEmail").html(response.email);
                    $("#relStatus").html(response.relationship_status);
                    $(".profilePhoto").attr("src", "" + response.picture.data.url + "");
                    $(".myCoverPic").attr("src", "" + response.cover.source + "");
                    $("#gender").html(response.gender);
                    console.log($("#schoolName").html(response.education));
                    var family = response.family.data;
                    var getName = $.map(family, function (i) {
                        return i.name;
                    });
                    $("#family").html(getName);
                    var work = response.work;
                    var myWork = $.map(work, function (i) {
                        return i.employer.name;
                    });
                    $("#myWork").text(myWork);
                    var education = response.education;
                    var myEducation = $.map(education, function (i) {
                        return i.school.name;
                    });
                    $("#myEducation").text(myEducation);




                },

                timeout: 1000, // keeping the timeout for 1 sec 
                beforeSend: function () { //before sending the request to api the loader loads and displays on screen
                    $('.loader').delay(1500).show();
                    $(".form-group").hide();

                },
                complete: function () {
                    $('.loader').delay(1500).hide(); // after getting the request hide the loader on screen 


                },
                error: function (req, status, error) { // error function for showing the error on console and giving warining to users via alert
                    console.log('Error occured', status, error);
                    alert("Token is  either not inserted or it is expired.");
                }
            } //end argument list 



        ); // end ajax call

        /*============================
        ajax call for the feed 
        ============================*/
        $.ajax("https://graph.facebook.com/me?fields=posts{created_time,type,full_picture,story,message,source},name,picture&access_token=" + myFacebookToken, {
            success: function (response) {
                var posts = response.posts.data;
                var feeds = $.map(posts, function (value, index) {
                    if (index <= 5) { //for limiting the posts upto 6 
                        return value;
                    }
                });
                //first Post goes here
                var feed1 = $.map(feeds, function (value, index) {
                    if (index == 0) {
                        return value;
                    }
                });
                //conditions for fb stories it may be status,photo,video or music 
                if (feed1[0].type == "status") { // for status

                    $("#postStory1").html(response.name + " shared a status </br>" + feed1[0].message);


                } else if (feed1[0].type == "photo") { // for photo 

                    $("#postStory1").text("" + feed1[0].story + "").css({
                        "text-decoration": "none",
                        "color": "#4B4F56",
                        "font-weight": "400"
                    });
                    $(".photoDisplay1").html("<img src=" + feed1[0].full_picture + " " + "class=" + " img-responsive" + ">");
                    //for video shared
                } else if (feed1[0].type == "video") { //for video shared
                    $("#postStory1").text("" + feed1[0].story + "").css({
                        "text-decoration": "none",
                        "color": "#4B4F56",
                        "font-weight": "400"
                    });
                    $(".photoDisplay1").html("<video controls> <source  src=" + "" + feed1[0].source + " " + "type= " + "video/mp4" + "></video>");
                } else {}

                //second post goes here
                var feed2 = $.map(feeds, function (value, index) {
                    if (index == 1) {
                        return value;
                    }
                });
                //conditions for fb stories it may be status,photo,video or music 
                if (feed2[0].type == "status") { // for status

                    $("#postStory2").html(response.name + " shared a status </br>" + feed2[0].message);
                    //for photo shared
                } else if (feed2[0].type == "photo") { //for photo shared

                    $("#postStory2").text("" + feed2[0].story + "").css({
                        "text-decoration": "none",
                        "color": "#4B4F56",
                        "font-weight": "400"
                    });
                    $(".photoDisplay2").html("<img src=" + feed2[0].full_picture + " " + "class=" + " img-responsive" + ">");

                } else if (feed2[0].type == "video") { //for video shared
                    $("#postStory2").text("" + feed2[0].story + "").css({
                        "text-decoration": "none",
                        "color": "#4B4F56",
                        "font-weight": "400"
                    });
                    $(".photoDisplay2").html("<video controls> <source  src=" + "" + feed2[0].source + " " + "type= " + "video/mp4" + "></video>");
                } else {}


                //third post starts here
                var feed3 = $.map(feeds, function (value, index) {
                    if (index == 2) {
                        return value;
                    }
                });
                //conditions for fb stories it may be status,photo,video or music 
                if (feed3[0].type == "status") {

                    $("#postStory3").html(response.name + " shared a status </br>" + feed3[0].message).css({
                        "background-color": "white",
                        "font-size": "200%"
                    });
                    //for photo s
                } else if (feed3[0].type == "photo") {

                    $("#postStory3").text("" + feed3[0].story + "").css({
                        "text-decoration": "none",
                        "color": "#4B4F56",
                        "font-weight": "400"
                    });
                    $(".photoDisplay3").html("<img src=" + feed3[0].full_picture + " " + "class=" + " img-responsive" + ">");
                    //for video shared
                } else if (feed3[0].type == "video") {
                    $("#postStory3").text("" + feed3[0].story + "").css({
                        "text-decoration": "none",
                        "color": "#4B4F56",
                        "font-weight": "400"
                    });
                    $(".photoDisplay3").html("<video controls> <source  src=" + "" + feed3[0].source + " " + "type= " + "video/mp4" + "></video>");
                } else {}

                //fourth post starts here
                var feed4 = $.map(feeds, function (value, index) {
                    if (index == 3) {
                        return value;
                    }
                });
                //conditions for fb stories it may be status,photo,video or music 
                if (feed4[0].type == "status") { //for status

                    $("#postStory4").html(response.name + "shared a status  </br>" + feed4[0].message);

                } else if (feed4[0].type == "photo") { //for photo

                    $("#postStory4").text("" + feed4[0].story + "").css({
                        "text-decoration": "none",
                        "color": "#4B4F56",
                        "font-weight": "400"
                    });
                    $(".photoDisplay4").html("<img src=" + feed4[0].full_picture + " " + "class=" + " img-responsive" + ">");

                } else if (feed4[0].type == "video") { //for video
                    $("#postStory4").text("" + feed4[0].story + "").css({
                        "text-decoration": "none",
                        "color": "#4B4F56",
                        "font-weight": "400"
                    });
                    $(".photoDisplay4").html("<video controls> <source  src=" + "" + feed4[0].source + " " + "type= " + "video/mp4" + "></video>");
                } else {}

                //fifth post starts here
                var feed5 = $.map(feeds, function (value, index) {
                    if (index == 4) {
                        return value;
                    }
                });
                //conditions for fb stories it may be status,photo,video or music 
                if (feed5[0].type == "status") { //for status

                    $("#postStory5").html(response.name + " shared a status " + feed5[0].message);

                } else if (feed5[0].type == "photo") { //for photo

                    $("#postStory5").text("" + feed5[0].story + "").css({
                        "text-decoration": "none",
                        "color": "#4B4F56",
                        "font-weight": "400"
                    });
                    $(".photoDisplay5").html("<img src=" + feed5[0].full_picture + " " + "class=" + " img-responsive" + ">");

                } else if (feed5[0].type == "video") { //for video
                    $("#postStory5").text("" + feed5[0].story + "").css({
                        "text-decoration": "none",
                        "color": "#4B4F56",
                        "font-weight": "400"
                    });
                    $(".photoDisplay5").html("<video controls> <source  src=" + "" + feed5[0].source + " " + "type= " + "video/mp4" + "></video>");
                } else {}


                //sixth post starts here
                var feed6 = $.map(feeds, function (value, index) {
                    if (index == 5) {
                        return value;
                    }
                });
                //conditions for fb stories it may be status,photo,video or music 
                if (feed6[0].type == "status") { //for status

                    $("#postStory6").html(response.name + " shared a status " + feed6[0].message);

                } else if (feed6[0].type == "photo") { //for photo

                    $("#postStory6").text("" + feed6[0].story + "").css({
                        "text-decoration": "none",
                        "color": "#4B4F56",
                        "font-weight": "400"
                    });
                    $(".photoDisplay6").html("<img src=" + feed6[0].full_picture + " " + "class=" + " img-responsive" + ">");

                } else if (feed6[0].type == "video") { //for video
                    $("#postStory6").text("" + feed6[0].story + "").css({
                        "text-decoration": "none",
                        "color": "#4B4F56",
                        "font-weight": "400"
                    });
                    $(".photoDisplay6").html("<video controls> <source  src=" + "" + feed6[0].source + " " + "type= " + "video/mp4" + "></video>");
                } else {}




            } //end success function





        });





    });
    /*=======================
    these will start to appear at first
    basic details and feeds are hidden as token is not inserted yet!
    ========================*/
    $(".form-group").show();
    $(".profilePhoto").show();
    $("#welcome").show();
    $(".loader").hide();
    $(".panel").hide();
    $(".feed1").hide();
    $(".feed2").hide();
    $(".feed3").hide();
    $(".feed4").hide();
    $(".feed5").hide();
    $(".feed6").hide();
    $(".panel").show(500);
    $(".profilePhoto").show(500);
    $(".work").show();
    $(".cover").show();



}); //end doc ready function

/*=============================

when user clicks the feed button basic details will be hidden


==============================*/
$(".feed").on("click", function () {

    $("#welcome").hide();
    $(".feed1").show(500);
    $(".feed2").show(500);
    $(".feed3").show(500);
    $(".feed4").show(500);
    $(".feed5").show(500);
    $(".feed6").show(500);
    $(".basic-details").hide(500);
    $(".profilePhoto").hide(500);
    $(".panel").hide(500);
    $(".work").hide();
    $(".cover").hide();



});
/*=============================

when user clicks the home button feed  will be hidden


==============================*/
$(".home-btn").on("click", function () {

    $(".form-group").hide();
    $(".panel").show(500);
    $(".profilePhoto").show(500);
    $("#welcome").show();
    $(".work").show(500);
    $(".cover").show(500);
    $(".feed1").hide();
    $(".feed2").hide();
    $(".feed3").hide();
    $(".feed4").hide();
    $(".feed5").hide();
    $(".feed6").hide();



});