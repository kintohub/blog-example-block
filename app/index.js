import Hapi from 'hapi'

const server = new Hapi.server({
  port: process.env.PORT || 8000
})

/**
 * @api {POST} /articles create a new article
 * @apiName CreateArticle
 * @apiParam (Body) {String} title article title
 * @apiParam (Body) {String} body article body
 * @apiHeader (Session) {String} [authexample-id] logged in user id
 * @apiHeader (Session) {String} [authexample-name] logged in user name
 * @apiError (Error_401) {String} errors unauthenticated error message
 * @apiSuccess (Success_200) {Number} id new article id
 * @apiSuccess (Success_200) {String} title new article title
 * @apiSuccess (Success_200) {String} body new article body
 * @apiSuccess (Success_200) {String} username name of the user who created the article
 * @apiSuccess (Success_200) {String} userId id of the user who created the article
 */
server.route({
  method: 'POST',
  path: '/articles',
  handler(request, h) {
    const { title, body } = request.payload
    const userId = request.headers['authexample-id']
    const name = request.headers['authexample-name']
    if (!userId || !name) {
      return h.response({ error: 'You must login first' }).code(401)
    }
    return h.response({ id: 1, title, body, userId, name })
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
