import GmAlert from '../index.js'

const a = GmAlert({
  title: 'This is a title',
  body:
    'Some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content',
  maskCloseAble: true
}).show()

window.a = a
