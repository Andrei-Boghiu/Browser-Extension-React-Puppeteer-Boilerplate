import puppeteer from 'puppeteer-core/lib/cjs/puppeteer/web'
import { ExtensionDebuggerTransport } from '../lib'
import { logEvent } from './util/logger'
import { gotTo } from './workflow/goto'
import { write } from './workflow/write'

const run = async (tabId: number) => {
	logEvent('info', 'run', 'starting...')
	const extensionTransport = await ExtensionDebuggerTransport.create(tabId)
	const browser = await puppeteer.connect({
		transport: extensionTransport,
		defaultViewport: null,
	})

	const [page] = await browser.pages()

	await gotTo(page)

	await write(page)

	await page.close()
	logEvent('info', 'run', 'Done!')
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

chrome.runtime.onInstalled.addListener((details) => {
	let message = ''

	if (details.reason === 'install') {
		message = 'Extension installed for the first time'
	} else if (details.reason === 'update') {
		message = `Extension updated to version ${chrome.runtime.getManifest().version}`
	}

	logEvent('info', 'Extension Lifecycle', message)
})
