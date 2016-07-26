import React, { Component } from 'react'
import Modal from 'react-modal'

class LabelModal extends Component {
  onChange(event) {
    this.props.actions.updateLabelModal(event.target.value)
  }

  onKeyDown(event) {
    if (event.keyCode == 13) {
      this.save()
    }
  }

  save() {
    if (this.props.description == '') {
      return
    }
    let id = this.props.id
    let label = {
      typ: this.props.typ,
      description: this.props.description
    }
    if (id) {
      this.props.actions.updateLabel(id, label)
    } else {
      this.props.actions.createLabel(label)
    }
    this.close()
  }

  close() {
    this.props.actions.closeLabelModal()
  }

  render() {
    let style = {
      overlay: {
        top: this.props.clientY,
        left: this.props.clientX,
        backgroundColor: 'transparent'
      },
      content: {
        marginTop: 0,
        marginLeft: 0
      }
    }
    return (
      <Modal className="label-modal modal-dialog" isOpen={this.props.isOpen} style={style}>
        <div className="modal-content">
          <div className={`modal-header modal-header--${this.props.typ}`}>
            <button type="button" className="close" onClick={this.close.bind(this)}>
               <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-title">{this.props.typ}</h4>
          </div>
          <div className="modal-body">
            <textarea className="form-control" rows="10" onChange={this.onChange.bind(this)} onKeyDown={this.onKeyDown.bind(this)} value={this.props.description}></textarea>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={this.close.bind(this)}>Close</button>
            <button type="button" className="btn btn-primary" onClick={this.save.bind(this)}>Save</button>
          </div>
        </div>
      </Modal>
    )
  }
}

export default LabelModal
