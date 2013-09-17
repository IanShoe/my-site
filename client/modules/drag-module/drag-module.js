angular.module('DragModule', []).
service('DragService', function($rootScope){
	var currentDrag = {
		dragging: false,
		type: null
	}

	var dragService = {
		setDragging : function(value, type){
			currentDrag.dragging = value;
			currentDrag.type = type;
			$rootScope.$broadcast('DragService.dragging', currentDrag);
		},
		getDragging : function(){
			return currentDrag.dragging;
		}
	};
	return dragService;
}).
directive('ngDraggable', function (DragService) {
	return {
		link: function(scope, element, attrs, ctrl) {
			attrs.$set('draggable', true);
			var data = scope.$eval(attrs.ngModel);
			element.on('dragstart', function(event){
				event.originalEvent.dataTransfer.setData("Data", JSON.stringify(data));
				DragService.setDragging(true, data.type);
			});
			element.on('dragend', function(event){
				DragService.setDragging(false);
			});
		}
	}
}).
directive('ngDroppable', function (DragService) {
	// TODO: make this so that it can be outside DragService usable (for instance, dropping files as an upload)
	return {
		link: function(scope, element, attrs) {
			var cb = scope[attrs.ngDroppable];
			var mediaTypes = scope.$eval(attrs.mediaTypes);
			scope.$on('DragService.dragging', function(event, currentDrag){
				// Determine if it's a type we care about
				if(!currentDrag.type || !mediaTypes || mediaTypes.contains(currentDrag.type)){
					if(currentDrag.dragging){
						dragging();
					}
					else{
						notDragging();
					}
				}
			});

			function dragging(){
				element.on('dragenter', dragEnter);
				element.on('dragleave', dragLeave);
				element.on('dragover', dragOver);
				element.on('drop', drop);
				element.addClass('dropzone-hover-lite');
			}

			function notDragging(){
				element.unbind('dragenter', dragEnter);
				element.unbind('dragleave', dragLeave);
				element.unbind('dragover', dragOver);
				element.unbind('drop', drop);
				element.removeClass('dropzone-hover-lite');
			}

			// Maybe each event should be configurable on what happens?
			function dragEnter(event) {
				this.classList.add('dropzone-hover');
			}

			function dragLeave(event) {
				this.classList.remove('dropzone-hover');
			}

			function dragOver(event) {
				event.preventDefault();
				event.stopPropagation();
			}

			function drop(event) {
				var data = JSON.parse(event.originalEvent.dataTransfer.getData('Data'));
				this.classList.remove('dropzone-hover');
				scope.$apply(cb(data, event));
			}
		}
	}
});