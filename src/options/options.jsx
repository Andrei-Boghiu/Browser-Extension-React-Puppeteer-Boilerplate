import React from 'react'
import ReactDOM from 'react-dom'

const Options = () => {
	const startAutomation = () => {
		console.log('button was pressed')
		chrome.runtime.sendMessage({ action: 'startPuppeteer' }).then((res) => {
			console.log(res)
		})
	}

	return (
		<div>
			<h1>Puppeteer Starter</h1>
			<button onClick={startAutomation}>Start Automation</button>
		</div>
	)
}

ReactDOM.render(<Options />, document.getElementById('root'))
