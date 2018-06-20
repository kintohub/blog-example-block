import Hapi from 'hapi'

const server = new Hapi.server({
  port: process.env.PORT || 8000
})

/**
 * @api {POST} /articles A dummy create article action, user must be logged in via authexample/login first before calling this action.
 * @apiName CreateArticle
 * @apiParam {String} title article title
 * @apiParam {String} body article body
 * @apiHeader (Session) {String} [authexample-id] logged in user id
 * @apiHeader (Session) {String} [authexample-name] logged in user name
 * @apiSuccess {Number} id new article id
 * @apiSuccess {String} title new article title
 * @apiSuccess {String} body new article body
 * @apiSuccess {String} username name of the user who created the article
 * @apiSuccess {String} userId id of the user who created the article
 * @apiError (401) {String} error unauthenticated error message
 * @apiError {String} error invalid params error message
 */
server.route({
  method: 'POST',
  path: '/articles',
  handler(request, h) {
    const { payload } = request
    const userId = request.headers['authexample-id']
    const name = request.headers['authexample-name']
    if (!userId || !name) {
      return h.response({ error: 'You must login first' }).code(401)
    }
    if (!payload || !payload.title || !payload.body) {
      return h.response({ error: 'title and body are required' })
    }
    return h.response({
      id: 1,
      title: payload.title,
      body: payload.body,
      userId,
      name
    })
  }
})

async function start() {
  try {
    await server.start()
  } catch (e) {
    console.log('app crashed', e)
    process.exit(1)
  }
  console.log('Server running at ', server.info.uri)
}

start()
