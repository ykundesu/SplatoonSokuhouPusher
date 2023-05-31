importScripts('https://unpkg.com/@gauntface/logger@3.0.13/build/browser-globals.js')

logger.setPrefix('web-push-study/service worker')

self.addEventListener('install', () => {
	self.skipWaiting()
})

self.addEventListener('push', function (event) {
	logger.log('Push message received.')
	const options = {
		...{
			title: 'Hello',
			body: 'Thanks for sending this push msg.',
			icon: 'https://splatoonsokuhouimage.web.fc2.com/PushIcon.png',
			badge: 'https://splatoonsokuhouimage.web.fc2.com/PushIcon.png',
			tag: 'web-push-study-notification',
			data: {
				url: 'https://web.dev/push-notifications-overview/',
			},
		}, ...event.data.json()
	}
	console.log(options)

	event.waitUntil(self.registration.showNotification(options.title, options))
})

self.addEventListener('notificationclick', function (event) {
	logger.log('Notification clicked.')
	console.log(event)
	event.notification.close()

	let clickResponsePromise = Promise.resolve()
	if (event.action) {
		clickResponsePromise = clients.openWindow(event.action)
	} else if (event.notification.data && event.notification.data.url) {
		clickResponsePromise = clients.openWindow(event.notification.data.url)
	}

	event.waitUntil(clickResponsePromise)
})
