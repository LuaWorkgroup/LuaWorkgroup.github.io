$.ajaxSetup({ async: false })

// variables <<<

var Data          = []
// var Categories = []
var DDMSelection  = "ddmall" // DropDownMenu initialization

var Unknown       = '<span title="Unknown" class="grey"><span class="glyphicon glyphicon-minus"></span></span>'
var Supported     = '<span title="Supported" class="green"><span class="glyphicon glyphicon-ok"></span></span>'
var NotSupported  = '<span title="Not supported "class="red"><span class="glyphicon glyphicon-remove"></span></span>'
var Active        = '<span title="Active" class="glyphicon glyphicon-heart"></span>'
var Dead          = '<span title="Unmaintained" class="glyphicon glyphicon-flag"></span>'
var HelpNeeded    = '<span title="Help needed" class="glyphicon glyphicon-plus"></span>'
var NewMaintainer = '<span title="New maintainer" class="glyphicon glyphicon-user"></span>'

// >>>

function fillTable() // <<<
{
   var tbody = document.getElementsByTagName('tbody')[0]

   $("#databody").empty()

   for(var i=0; i < Data.length; i++)
   {
           if(DDMSelection == "ddmout")    { if(Data[i].lua["54"] == true){continue} }

      else if(DDMSelection == "ddmlua54")  { if(Data[i].lua["54"] == false){continue} }

      else if(DDMSelection == "ddmlua53")  { if(Data[i].lua["53"] == false){continue} }

      else if(DDMSelection == "ddmlua52")  { if(Data[i].lua["52"] == false){continue} }

      else if(DDMSelection == "ddmlua51")  { if(Data[i].lua["51"] == false){continue} }

      else if(DDMSelection == "ddmactive") { if(Data[i].status.active == false){continue} }

      else if(DDMSelection == "ddmdead")   { if(Data[i].status.active == true){continue} }

      else if(DDMSelection == "ddmhelp")   { if(Data[i].status.help == false){continue} }

      else if(DDMSelection == "ddmnew")    { if(Data[i].status.maintainer == false){continue} }


      // Add maintainance status
      var modstatus = (Data[i].status.active     ? Active : Dead )
                    + (Data[i].status.help       ? HelpNeeded : '' )
                    + (Data[i].status.maintainer ? NewMaintainer : '')

      // Adds support to Lua versions
      var modluaver = '';
      for (let ver=51; ver<=54; ver++) {
         let info = Data[i].lua[ver.toString(10)]
         let support = info ? Supported : ( info == false ? NotSupported : Unknown )
         modluaver += `<td luaver="${ver.toString(10).replace(/^(.)/,"$1.")}">${support}</td>`
      }

      var tr = tbody.insertRow(-1)
      tr.innerHTML += `<td><a href="${Data[i].link}" target="_blank">${Data[i].name}</a></td>`
      tr.innerHTML += `<td>${Data[i].description}</td>`
      tr.innerHTML += `<td title="status">${modstatus}</td>${modluaver}`
   }
} // >>>

function loadData() // <<<
{
   $.getJSON("data.json?_=" + new Date().getTime(), function(JSON_Data)
   {
      for(let Filename of JSON_Data)
      {
         $.getJSON(Filename + "?_=" + new Date().getTime(), function(Item)
         {
            Data[Data.length] = Item
         })
      }
   })

   fillTable()
} // >>>

function filterTable() // <<<
{
   var input, filter, table, tr, tdproj, tddesc, i, project, description;
   input = document.getElementById("searchbox");
   filter = input.value.toUpperCase();
   table = document.getElementsByClassName("data")[0];
   tr = table.getElementsByTagName("tr");
   for(i = 0; i < tr.length; i++)
   {
      tdproj = tr[i].getElementsByTagName("td")[0];
      tddesc = tr[i].getElementsByTagName("td")[1];
      if(tdproj)
      {
         project     = tdproj.textContent // || tdproj.innerText;
         description = tddesc.textContent // || tddesc.innerText;
         if((project.toUpperCase().indexOf(filter) > -1) || (description.toUpperCase().indexOf(filter) > -1))
         {
            tr[i].style.display = "";
         }
         else
         {
            tr[i].style.display = "none";
         }
      }       
   }
} // >>>
 
$(document).ready(function() // <<<
{ 
   loadData()

   $('.dropdown').click(function()
   {
      $(this).attr('tabindex', 1).focus();
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(300);
   });
   
   $('.dropdown').focusout(function()
   {
      $(this).removeClass('active');
      $(this).find('.dropdown-menu').slideUp(300);
   });
   
   $('.dropdown .dropdown-menu li').click(function()
   {
      $(this).parents('.dropdown').find('span').text($(this).text());
      $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
   });
   
   $('.dropdown-menu li').click(function()
   {
      DDMSelection = $(this).parents('.dropdown').find('input').val()
      fillTable()
   }); 
}) // >>>

$(document).ready(function() // <<<
{ 
   // $(".fldhead").click(function()
   //    {
   //       $(this)  
   //          .nextUntil("tr.fldhead")
   //          .toggle();
   //
   //       if($(this).next("tr").is(":hidden"))
   //       {
   //          $('span:first', this).replaceWith('<span class="glyphicon glyphicon-plus-sign"></span>');
   //       }
   //       else
   //       {
   //          $('span:first', this).replaceWith('<span class="glyphicon glyphicon-minus-sign"></span>');
   //       }
   //
   //    });
   //

   // init()
   $('.graph-bar').each(function()
   {
      var dataWidth = $(this).data('value');
      $(this).css("width", dataWidth + "%");
   });
}) // >>>

// $(document).keydown(function(k) // <<<
//    {
//       if(k.which == 67) #<{(| c |)}>#
//       {
//          $('.fldhead').each(function()
//             {
//                $('span:first', this).replaceWith('<span class="glyphicon glyphicon-plus-sign"></span>');
//                $(this)  
//                   .nextUntil("tr.fldhead")
//                   .hide();
//             });
//       }
//
//       if(k.which == 69) #<{(| e |)}>#
//       {
//          $('.fldhead').each(function()
//             {
//                $('span:first', this).replaceWith('<span class="glyphicon glyphicon-minus-sign"></span>');
//                $(this)  
//                   .nextUntil("tr.fldhead")
//                   .show();
//             });
//       }
//    }); // >>>

// vim: fmr=<<<,>>> fdm=marker sts=3 ts=3 sw=3
