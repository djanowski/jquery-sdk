function DragDrop(opts) {
  if (!opts) {
    opts = {}
  }

  this._$el = opts.$el
  this.onFileAdd = opts.onFileAdd || function() {}

  this._bindEvents()
}

DragDrop.prototype._bindEvents = function() {
  this._$el.on('dragenter', this.dragEnterCb.bind(this))
  this._$el.on('dragexit', this.dragExitCb.bind(this))
  this._$el.on('dragover', this.dragOverCb.bind(this))
  this._$el.on('dragleave', this.dragExitCb.bind(this))
  this._$el.on('drop', this.dropCb.bind(this))
}

DragDrop.prototype.dragEnterCb = function(e) {
  e.stopPropagation()
  e.preventDefault()
};

DragDrop.prototype.dragExitCb = function(e) {
  e.stopPropagation()
  e.preventDefault()
  this._$el.removeClass('hover')
};

DragDrop.prototype.dragOverCb = function(e) {
  e.stopPropagation()
  e.preventDefault()
  this._$el.addClass('hover')
};

DragDrop.prototype.dropCb = function(e) {
  e.stopPropagation()
  e.preventDefault()
  this._$el.removeClass('hover')

  if (!e.originalEvent || !e.originalEvent.dataTransfer) {
    return false
  }

  var files = e.originalEvent.dataTransfer.files
  if (files.length === 0) {
    return false
  }

  for (var i in files) {
    if (typeof files[i] === 'object') {
      this.onFileAdd(files[i])
    }
  }

  return false
}

module.exports = DragDrop