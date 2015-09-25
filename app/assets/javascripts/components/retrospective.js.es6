'use strict';

class Retrospective extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getState();
  }

  componentDidMount() {
    labelStore.addListener(this.onChange.bind(this));
    retrospectivesUserStore.addListener(this.onChange.bind(this));
  }

  componentWillUnmount() {
    labelStore.removeListener(this.onChange.bind(this));
    retrospectivesUserStore.removeListener(this.onChange.bind(this));
  }

  onChange() {
    this.setState(this.getState());
  }

  getState() {
    return {
      dragStartId: labelStore.getDragStatId(),
      labels: labelStore.getLabels(),
      users: retrospectivesUserStore.getUsers()
    };
  }

  openLabelForm(event) {
    let typ = $(event.target).closest('.js-board').data('typ');
    labelActions.openDialog(this.props.id, {typ: typ}, event.clientX, event.clientY);
  }

  onDrop(event) {
    event.preventDefault();
    let typ = null;
    let index = null;
    if ($(event.target).hasClass('js-labels')) {
      typ = $(event.target).closest('.js-board').data('typ');
      index = this.state.labels[typ].length;
    } else {
      let id = $(event.target).closest('.js-label').data('id');
      typ = $(event.target).closest('.js-board').data('typ');
      for (let i in this.state.labels[typ]) {
        let label = this.state.labels[typ][i];
        if (label.id == id) {
          index = parseInt(i);
          break;
        }
      }
    }
    labelActions.drop(this.props.id, this.state.dragStartId, typ, index);
  }

  onDragOver(event) {
    event.preventDefault();
  }

  render() {
    let keepLabels = this.state.labels.keep.map((label) => {
      return (
        <RetrospectiveLabel key={label.id} retrospectiveId={this.props.id} label={label} />
      );
    });

    let problemLabels = this.state.labels.problem.map((label) => {
      return (
        <RetrospectiveLabel key={label.id} retrospectiveId={this.props.id} label={label} />
      );
    });

    let tryLabels = this.state.labels.try.map((label) => {
      return (
        <RetrospectiveLabel key={label.id} retrospectiveId={this.props.id} label={label} />
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

          <RetrospectiveMenu retrospectiveId={this.props.id} users={this.state.users} />
        </div>
      </div>
    );
  }
}
