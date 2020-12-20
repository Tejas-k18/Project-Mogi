
var nextMemID = 1;
var nextItmID = 1;


$(document).ready(function() {

            $("#addMem").on("click", function() {
              if ($("#memberName" + nextMemID).value == "") {
                $("#grpname").value = $("#grpName").value;
                $("#memName").append("<div><br><input type='text' id='memberName " + id + " '><br></div>");
                $("#memRole").append("<div><br><input type='text' id='memberRole " + id + " '><br></div>");
                console.log(err);
              } else {

                  var id = ++nextMemID;
              }


            });

            $("#delMem").on("click", function() {
                $("#memName").children().last().remove();
                $("#memRole").children().last().remove();
            });

            $("#submitMembers").on("click",function(){


            });
});

$(document).ready(function() {
        var id = ++nextItmID;
            $("#addItm").on("click", function() {
                $("#ItemName").append("<div><br><input type='text' id='itemName " + id + " '><br></div>");
                $("#price").append("<div><br><input type='text' id='itemsPrice " + id + " '><br></div>");
            });

            $("#delItm").on("click", function() {
                $("#ItemName").children().last().remove();
                $("#price").children().last().remove();
            });
});
