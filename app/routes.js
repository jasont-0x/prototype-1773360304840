const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/encounter-type', function (req, res) {
  res.render('encounter-type')
})

router.post('/encounter-type', function (req, res) {
  const answer = req.session.data['encounter-type']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'encounter-type': 'Select what type of encounter you had' }
    return res.render('encounter-type')
  }
  res.redirect('/encounter-date')
})

router.get('/encounter-date', function (req, res) {
  res.render('encounter-date')
})

router.post('/encounter-date', function (req, res) {
  const answer = req.session.data['encounter-date']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'encounter-date': 'Enter when the encounter happened' }
    return res.render('encounter-date')
  }
  res.redirect('/encounter-location')
})

router.get('/encounter-location', function (req, res) {
  res.render('encounter-location')
})

router.post('/encounter-location', function (req, res) {
  const answer = req.session.data['encounter-location']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'encounter-location': 'Enter where the encounter happened' }
    return res.render('encounter-location')
  }
  res.redirect('/witnessed-by-others')
})

router.get('/witnessed-by-others', function (req, res) {
  res.render('witnessed-by-others')
})

router.post('/witnessed-by-others', function (req, res) {
  const answer = req.session.data['witnessed-by-others']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'witnessed-by-others': 'Select yes if anyone else witnessed the encounter' }
    return res.render('witnessed-by-others')
  }
  res.redirect('/encounter-description')
})

router.get('/encounter-description', function (req, res) {
  res.render('encounter-description')
})

router.post('/encounter-description', function (req, res) {
  const answer = req.session.data['encounter-description']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'encounter-description': 'Enter a description of what happened' }
    return res.render('encounter-description')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('AE')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
