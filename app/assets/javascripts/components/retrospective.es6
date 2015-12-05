app.Retrospective =

class Retrospective extends React.Component {
  openLabelForm(event) {
    let typ = $(event.target).closest('.js-board').data('typ');
    this.props.actions.openDialogLabel({typ: typ}, event.clientX, event.clientY, this.props.actions);
  }

  onDrop(event) {
    event.preventDefault();
    let typ = null;
    let index = null;
    if ($(event.target).hasClass('js-labels')) {
      typ = $(event.target).closest('.js-board').data('typ');
      index = this.props.labels[typ].length;
    } else {
      let id = $(event.target).closest('.js-label').data('id');
      typ = $(event.target).closest('.js-board').data('typ');
      for (let i in this.props.labels[typ]) {
        let label = this.props.labels[typ][i];
        if (label.id == id) {
          index = parseInt(i);
          break;
        }
      }
    }
    this.props.actions.dropLabel(this.props.dragStartId, typ, index);
  }

  onDragOver(event) {
    event.preventDefault();
  }

  render() {
    let keepLabels = this.props.labels.keep.map((label) => {
      return (
        <app.RetrospectiveLabel key={label.id} retrospectiveId={this.props.id} label={label} actions={this.props.actions} />
      );
    });

    let problemLabels = this.props.labels.problem.map((label) => {
      return (
        <app.RetrospectiveLabel key={label.id} retrospectiveId={this.props.id} label={label} actions={this.props.actions} />
      );
    });

    let tryLabels = this.props.labels.try.map((label) => {
      return (
        <app.RetrospectiveLabel key={label.id} retrospectiveId={this.props.id} label={label} actions={this.props.actions} />
      );
    });

    return (
      <div className="retrospective">
        <div className="retrospective__content">
          <div className="retrospective__boards">
            <div className="retrospective__board js-board" data-typ="keep" onClick={this.openLabelForm.bind(this)}>
              <h4 className="retrospective__board-title">Keep</h4>
              <div className="retrospective__labels js-labels" onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)}>{keepLabels}</div>
            </div>

            <div className="retrospective__board js-board" data-typ="problem" onClick={this.openLabelForm.bind(this)}>
              <h4 className="retrospective__board-title">Problem</h4>
              <div className="retrospective__labels js-labels" onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)}>{problemLabels}</div>
            </div>
          </div>

          <div className="retrospective__boards">
            <div className="retrospective__board js-board" data-typ="try" onClick={this.openLabelForm.bind(this)}>
              <h4 className="retrospective__board-title">Try</h4>
              <div className="retrospective__labels js-labels" onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)}>{tryLabels}</div>
            </div>
          </div>

          <app.RetrospectiveMenu users={this.props.users} actions={this.props.actions} />
        </div>
      </div>
    );
  }
}
