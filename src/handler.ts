import { Router } from 'itty-router'
import { errorHandler, getCurrentWeatherHandler } from './handlers'

import { NotFoundError } from './errors'

const router = Router()

router
  .get(
    '/',
    () =>
      new Response(
        `
        <!DOCTYPE html>
          <html>
            <head>
              <style>
                a.link{
                        display: block;
                        font-size: 16px;
                        text-decoration: none;
                        background-color: black;
                        padding: 15px 32px;
                        border-radius: 3px;
                        color: white;
                        border: none;
                        max-width: 100px;
                        text-align: center;
                        text-transform: uppercase;
                      }
                a.link:hover{
                  opacity: 0.8;
                  transition: all 0.07s ease-in;
                }
              </style>
            </head>
            <body>

              <div>
                <h1>Hello, Thanks for checking me out</h1>
                <br/>
                <a title="to see the sample" class="link" href="current_weather?lat=49.2&lon=16.61">
                  click here
                </a>
              </div>
            </body>
          </html>
        `,
        {
          status: 200,
          headers: new Headers({
            'Content-Type': 'text/html'
          })
        }
      )
  )
  .get('/current_weather', getCurrentWeatherHandler)
  .all('*', () => {
    throw new NotFoundError()
  })

export const handleRequest = (request: Request): Response =>
  router.handle(request).catch(errorHandler)
