'use strict';

class RetrospectiveLabel extends React.Component {
  destroy(event) {
    let id = this.refs.label.getDOMNode().dataset.id;
    this.props.destroy(id);
    event.stopPropagation();
  }

  edit(event) {
    let id = this.refs.label.getDOMNode().dataset.id;
    this.props.edit(event, id);
    event.stopPropagation();
  }

  onDragStart(event) {
    let id = this.refs.label.getDOMNode().dataset.id;
    this.props.onDragStart(event, id);
  }

  onDragEnd(event) {
    this.props.onDragEnd(event);
  }

  render() {
    return (
      <div className={'js-label retrospective__label retrospective__label--' + this.props.label.typ} onClick={this.edit.bind(this)} data-id={this.props.label.id} draggable="true" onDragStart={this.onDragStart.bind(this)} onDragEnd={this.onDragEnd.bind(this)} ref="label">
        <div className="retrospective__label-content">
          <div className="retrospective__label-header">
            <i className="retrospective__label-remove fa fa-remove" onClick={this.destroy.bind(this)}></i>
            <div className="retrospective__label-created-at">{this.props.label.created_at}</div>
            <div className="retrospective__label-user-name">{this.props.label.user_name}</div>
          </div>
          <div className="retrospective__label-description">{this.props.label.description}</div>
        </div>
      </div>
    );
  }
}
