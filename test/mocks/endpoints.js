/** @HINT: Disallow all http connections, mocked or not */
nock.disableNetConnect()

/** @HINT: Allow only localhost connections so we can test local routes and othe local-host mock servers. */
nock.enableNetConnect('127.0.0.1')

/** @HINT: Mock VerifyMe API request(s) */
const scope = nock('https://vapi.verifyme.ng', {
  reqheaders: {
    'Content-Type': 'multipart/form-data; boundary=webkitAiuri773hnBSybcjNiikcnc',
    'User-Agent': 'Mozilla/5.0 (compatible; Cloudinary/1.0)'
  }
})
  .presist()
  .defaultReplyHeaders({
    'Vary': 'User-Agent,Content-Type',
    'X-Powered-By': 'Rails',
    'Content-Type': 'application/json'
  })
  .replyContentLength()
  .replyDate()
  .post('/files/upload/storage', body => Boolean(body.file))
  .delayConnection(500)
  .delayBody(250)
  .reply(200, {
    secure_url: 'https://res.cloudinary.com/alpha-kapital/image/upload/s--klIoP56387sDbf94201znxm41wQ--/v1619727354/avatars/passport_1632751559326.jpg',
    url: 'https://res.cloudinary.com/alpha-kapital/image/upload/v1619727354/avatars/passport_1632751559326.jpg'
  })