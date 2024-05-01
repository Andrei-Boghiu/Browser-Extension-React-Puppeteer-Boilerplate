import { logEvent } from '../util/logger'

export const gotTo = async (page: any) => {
	try {
		logEvent('info', 'gotTo', 'going to link...')
		await page.goto('https://wikipedia.org')

		const englishButton = await page.waitForSelector('#js-link-box-en > strong')
		await englishButton?.click()
		logEvent('info', 'goTo', 'completed successfully')
	} catch (error) {
		logEvent('error', 'goTo', error)
	}
}
