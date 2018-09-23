export default function findLabelPosition(labels, id) {
  for (let kind of ['keep', 'problem', 'try']) {
    for (let i = 0;  i < labels[kind].length; i++) {
      const label = labels[kind][i]
      if (label.id == id) {
        return { kind: kind, index: i }
      }
    }
  }
  return null
}
