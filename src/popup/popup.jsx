import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './popup.css'
import { automationLogs } from '../util/logger.ts'

const Popup = () => {
	const [status, setStatus] = useState('stopped')
	const [logs, setLogs] = useState(automationLogs)

	const startAutomation = () => {
		chrome.runtime.sendMessage({ action: 'startPuppeteer' })
	}

	const handleStart = () => {
		setStatus('started')
		console.log('Automation started')
		// Add logic to start automation here
	}

	const handlePause = () => {
		setStatus('paused')
		console.log('Automation paused')
		// Add logic to pause automation here
	}

	const handleStop = () => {
		setStatus('stopped')
		console.log('Automation stopped')
		// Add logic to stop automation here
	}

	return (
		<React.Fragment>
			<h1 className='title'>Puppeteer Extension</h1>
			<p className='description'>Web Automation and Testing with Puppeteer.</p>
			<div className='status-bar'>
				<button className={`control-button ${status === 'started' ? 'active' : ''}`} onClick={handleStart}>
					Start
				</button>
				<button className={`control-button ${status === 'paused' ? 'active' : ''}`} onClick={handlePause}>
					Pause
				</button>
				<button className={`control-button ${status === 'stopped' ? 'active' : ''}`} onClick={handleStop}>
					Stop
				</button>
			</div>
			<div className='log-container'>
				{logs?.length > 0 &&
					logs.map((log, index) => (
						<div key={index} className='log'>
							{log}
						</div>
					))}
			</div>
			<button className='automation-button' onClick={startAutomation}>
				Start Automation
			</button>
		</React.Fragment>
	)
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Popup />
	</React.StrictMode>
)
