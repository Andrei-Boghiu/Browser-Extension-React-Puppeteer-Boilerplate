import { logEvent } from '../util/logger'

export const write = async (page: any) => {
	try {
		logEvent('info', 'write', 'just started...')
		const searchBox = await page.waitForSelector('#searchInput')
		await searchBox?.type('computer science')
		await page.keyboard.press('Enter')
		logEvent('info', 'write', 'completed successfully')
	} catch (error: unknown) {
		logEvent('error', 'write', error)
	}
}
