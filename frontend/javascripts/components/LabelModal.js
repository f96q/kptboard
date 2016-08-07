import React, { Component, PropTypes } from 'react'
import Modal from 'react-modal'

export default class LabelModal extends Component {
  onChange(e) {
    this.props.updateLabelModal(e.target.value)
  }

  onKeyDown(e) {
    if (e.keyCode == 13) {
      this.save()
    }
  }

  save() {
    if (this.props.label.description == '') {
      return
    }
    if (this.props.label.id) {
      this.props.updateLabel(this.props.label.id, {description: this.props.label.description})
    } else {
      this.props.createLabel(this.props.label)
    }
    this.close()
  }

  close() {
    this.props.closeLabelModal()
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
      <Modal className="LabelModal label-modal modal-dialog" isOpen={this.props.isOpen} style={style}>
        <div className="modal-content">
          <div className={`modal-header LabelModal-header is-${this.props.label.typ}`}>
            <h4 className="LabelModal-title modal-title">{this.props.label.typ}</h4>
          </div>
          <div className="modal-body">
            <textarea className="LabelModal-textarea form-control" rows="10" onChange={this.onChange.bind(this)} onKeyDown={this.onKeyDown.bind(this)} value={this.props.label.description}></textarea>
          </div>
          <div className="modal-footer">
            <button type="button" className="LabelModal-close btn btn-secondary" onClick={this.close.bind(this)}>Close</button>
            <button type="button" className="LabelModal-save btn btn-primary" onClick={this.save.bind(this)}>Save</button>
          </div>
        </div>
      </Modal>
    )
  }
}

LabelModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  clientX: PropTypes.number.isRequired,
  clientY: PropTypes.number.isRequired,
  label: PropTypes.shape({
    id: PropTypes.number,
    typ: PropTypes.string,
    description: PropTypes.string.isRequired
  }).isRequired,
  updateLabelModal: PropTypes.func.isRequired,
  closeLabelModal: PropTypes.func.isRequired,
  createLabel: PropTypes.func.isRequired,
  updateLabel: PropTypes.func.isRequired
}
