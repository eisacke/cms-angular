angular
    .module('QiAngular')
    .controller('UploaderController', UploaderController)

UploaderController.$inject = ['Record', 'List', 'Artist', 'Exhibition', 'Image', '$state', '$stateParams', 'record', 'list', 'artist', 'exhibition']
function UploaderController (Record, List, Artist, Exhibition, Image, $state, $stateParams, record, list, artist, exhibition) {

    var self = this;
    self.records = record;
    self.newImage = {};

    self.getRecord = function() {
        Record.get({ id: $stateParams.id}, function(returnedRecord){
            self.records.single = returnedRecord;
        });
    }

    self.createImage = function() {
        self.newImage.recordId = $stateParams.id;
        Image.save(self.newImage, function(image) {
            self.newImage = {};
            self.records.single.files.push(image._id);
            Record.update(self.records.single);
        });
    };

    self.deleteImage = function(image) {
        Image.delete({id: image._id});
        var index = self.records.single.files.indexOf(image);
        self.records.single.files.splice(index, 1);
    }
    
    function init(){

        $('.upload__btn').on('click', function (){
            $('.upload__input').click();
            $('.progress-bar').text('0%');
            $('.progress-bar').width('0%');
        });

        $('.upload__input').on('change', function(){

            var files = $(this).get(0).files;
  
            if (files.length > 0){
                var formData = new FormData();
    
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    formData.append('uploads[]', file, file.name);
                    console.log(file);
                    self.newImage.path = file.name;
                    self.newImage.fileSize = file.size;
                }
    
                $.ajax({
                    url: '/upload',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(data){
                        console.log('upload successful!\n' + data);
                    },
                    xhr: function() {
                        var xhr = new XMLHttpRequest();
                        xhr.upload.addEventListener('progress', function(evt) {
        
                            if (evt.lengthComputable) {
                                var percentComplete = evt.loaded / evt.total;
                                percentComplete = parseInt(percentComplete * 100);
            
                                $('.progress-bar').text(percentComplete + '%');
                                $('.progress-bar').width(percentComplete + '%');
            
                                if (percentComplete === 100) {
                                    $('.progress-bar').html('Done');
                                }
                            }
        
                        }, false);
                        return xhr;
                    }
                });
            }
        });
    }

    init();

}