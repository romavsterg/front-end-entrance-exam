import {
	handleAvatarChange,
	handleChange,
	handleClick,
	handleInput,
	handleLangProgressChange,
	handleLangProgressInput,
	handleSave,
} from './handlers.js'

const ids = [
	'name',
	'bio-heading',
	'job',
	'lang',
	'job-date',
	'job-title',
	'job-type',
	'job-info',
]

let savedData = JSON.parse(localStorage.getItem('savedData'))

document.addEventListener('click', handleClick)

document
	.querySelector('#avatar-input')
	.addEventListener('change', handleAvatarChange)

document
	.querySelector('#lang-progress-input')
	.addEventListener('input', handleLangProgressInput)

document
	.querySelector(`#save-lang-progress`)
	.addEventListener('click', handleLangProgressChange)

ids.forEach(inputId => {
	document
		.querySelector(`#${inputId}-input`)
		.addEventListener('input', handleInput)

	document
		.querySelector(`#save-${inputId}`)
		.addEventListener('click', handleSave)
})

if (!savedData) {
	localStorage.setItem('savedData', '{}')
}

for (const key of Object.keys(savedData || {})) {
	localStorage.setItem('currentDataId', key)
	const id = key.match(/^[a-z]+(?:-[a-z]+)?/)[0]

	handleChange(id, savedData[key])
}
