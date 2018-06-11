// Initialize the editor.

$(document).ready(function () {
  //  $(function() { $('textarea').froalaEditor() });
   
   $('#myImage').click( function () {
   $(function () { 
       $('#myImage').froalaEditor({
           aviaryKey: 'ec730bdac5564cdc81ddc69695ceb9fc'
       });
      });
   });

   $('#myImage1').click( function () {
   $(function () { 
       $('#myImage1').froalaEditor({
           aviaryKey: 'ec730bdac5564cdc81ddc69695ceb9fc'
       });
      });
   });

   $('#myImage11').click( function () {
   $(function () { 
       $('#myImage11').froalaEditor({
           aviaryKey: 'ec730bdac5564cdc81ddc69695ceb9fc'
       });
      });
   });
   

   

//    $(function() {
//                                 $('#edit').froalaEditor({
//                                   // Set the file upload URL.
//                                   imageUploadURL: 'image_upload',
//                                   imageUploadParams: {
//                                     id: 'my_editor'
//                                   }
//                                 })
//                               });
                          
  }); 