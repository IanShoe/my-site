angular.module('DragModule', []).
service('DragService', function($rootScope){
	var currentDrag = {
		dragging: false,
		type: null,
		index: null
	}

	var dragService = {
		setDragging : function(value, type, metadata){
			currentDrag.dragging = value;
			currentDrag.type = type;
			if(metadata){
				currentDrag.index = metadata.index;
				currentDrag.dataId = metadata.dataId;
				currentDrag.decoratorId = metadata.decoratorId;
			}
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
		require: '^?decorator',
		link: function(scope, element, attrs, ctrl) {
			attrs.$set('draggable', true);
			var data = scope.$eval(attrs.ngModel);
			element.on('dragstart', function(event){
				event.originalEvent.dataTransfer.setData("Data", JSON.stringify(data));
				var metadata = {
					index: data.index,
					dataId: data.id,
					decoratorId: scope.id
				};
				DragService.setDragging(true, data.type, metadata);
			});
			element.on('dragend', function(event){
				console.log('dragend');
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
			var index;
			attrs.$observe('index', function(newValue){
				index = parseInt(newValue);
			});
			scope.$on('DragService.dragging', function(event, currentDrag){
				// Determine if it's a type we care about
				if(!currentDrag.type || !mediaTypes || mediaTypes.contains(currentDrag.type)){
					// Determine if we're dragging an already existing item
					if(currentDrag.dataId && currentDrag.decoratorId == scope.id){
						if(currentDrag.dragging && index != currentDrag.index && index != currentDrag.index + 1){
							dragging();
						}
						else{
							notDragging();
						}
					}
					else{
						currentDrag.dragging ? dragging() : notDragging();
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
				console.log('notDragging');
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
				data.index = parseInt(index);
				this.classList.remove('dropzone-hover');
				scope.$apply(cb(data, event));
			}
		}
	}
});