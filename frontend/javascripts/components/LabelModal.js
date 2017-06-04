import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'

export default class LabelModal extends Component {
  onChange(e) {
    this.props.actions.updateLabelModal(e.target.value)
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
      this.props.actions.updateLabel(this.props.label.id, {description: this.props.label.description})
    } else {
      this.props.actions.createLabel(this.props.label)
    }
    this.close()
  }

  close() {
    this.props.actions.closeLabelModal()
  }

  render() {
    const style = {
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
      <Modal className="LabelModal label-modal modal-dialog" isOpen={this.props.isOpen} style={style} contentLabel="Modal">
        <div className="modal-content">
          <div className={`modal-header LabelModal-header is-${this.props.label.typ}`}>
            <h4 className="LabelModal-title modal-title">{this.props.label.typ}</h4>
          </div>
          <div className="modal-body">
            <textarea className="LabelModal-textarea form-control" rows="10" onChange={::this.onChange} onKeyDown={::this.onKeyDown} value={this.props.label.description}></textarea>
          </div>
          <div className="modal-footer">
            <button type="button" className="LabelModal-close btn btn-secondary" onClick={::this.close}>Close</button>
            <button type="button" className="LabelModal-save btn btn-primary" onClick={::this.save}>Save</button>
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
  }).isRequired
}
