import ActionCable from 'actioncable'
import createRetrospectivesChannel from './retrospectives'
import createLabelsChannel from './labels'

class Channel {
  constructor() {
    this.cable = ActionCable.createConsumer()
    this.retrospectives = null
    this.labels = null
  }

  create(room, store) {
    this.retrospectives = createRetrospectivesChannel(this.cable, room, store)
    this.labels = createLabelsChannel(this.cable, room, store)
  }
}

export default new Channel()
