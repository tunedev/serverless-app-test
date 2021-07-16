import { handleRequest } from './handler'

function handler(event: FetchEvent) {
  event.respondWith(handleRequest(event.request))
}

addEventListener('fetch', handler)
