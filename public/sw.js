self.addEventListener('push', function (event) {
  if (!event.data) return
  const data = event.data.json()
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      vibrate: [200, 100, 200],
      data: { destination: data.destination || '/home' },
    })
  )
})

self.addEventListener('notificationclick', function (event) {
  event.notification.close()
  const destination = event.notification.data?.destination || '/home'
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      for (const client of clientList) {
        if ('focus' in client) {
          client.focus()
          client.navigate(destination)
          return
        }
      }
      if (clients.openWindow) return clients.openWindow(destination)
    })
  )
})
