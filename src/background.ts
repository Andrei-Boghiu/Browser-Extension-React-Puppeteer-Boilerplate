import puppeteer from 'puppeteer-core/lib/cjs/puppeteer/web'
import { ExtensionDebuggerTransport } from '../lib'

const run = async (tabId: number) => {
	const extensionTransport = await ExtensionDebuggerTransport.create(tabId)
	const browser = await puppeteer.connect({
		transport: extensionTransport,
		defaultViewport: null,
	})

	const [page] = await browser.pages()

	await page.goto('https://wikipedia.org')

	const englishButton = await page.waitForSelector('#js-link-box-en > strong')
	await englishButton?.click()

	const searchBox = await page.waitForSelector('#searchInput')
	await searchBox?.type('computer science')
	await page.keyboard.press('Enter')

	await page.close()
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'startPuppeteer') {
		console.log('started')
		chrome.tabs.create(
			{
				active: true,
				url: 'https://www.google.co.in',
			},
			(tab) => (tab.id ? run(tab.id) : null)
		)
	}
})
