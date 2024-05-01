import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './options.css'

const Options = () => {
	const [settings, setSettings] = useState({
		option1: true,
		option2: false,
	})

	const handleToggle = (setting) => {
		setSettings((prev) => ({
			...prev,
			[setting]: !prev[setting],
		}))
	}

	return (
		<React.Fragment>
			<h1 className='title'>Options for Puppeteer Extension</h1>
			<p className='description'>Configure your settings below.</p>
			<div className='settings-container'>
				<div className='setting'>
					<label>
						<input type='checkbox' checked={settings.option1} onChange={() => handleToggle('option1')} />
						Enable feature 1
					</label>
				</div>
				<div className='setting'>
					<label>
						<input type='checkbox' checked={settings.option2} onChange={() => handleToggle('option2')} />
						Enable feature 2
					</label>
				</div>
			</div>
			<button className='save-button' onClick={() => alert('Settings saved!')}>
				Save Settings
			</button>
		</React.Fragment>
	)
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Options />
	</React.StrictMode>
)
