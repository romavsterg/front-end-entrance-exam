import {
	handleAvatarChange,
	handleChange,
	handleClick,
	handleInput,
	handleLangProgressChange,
	handleLangProgressInput,
	handleSave,
	handleToolChange,
	handleToolInput,
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
	'tool-header',
	'education-date',
	'education-title',
	'education-hashtags',
	'education-school',
	'interest',
	'contact',
	'gmail',
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

document.querySelector('#tool-input').addEventListener('input', handleToolInput)

document.querySelector('#save-tool').addEventListener('click', handleToolChange)

if (!savedData) {
	localStorage.setItem('savedData', '{}')
}

for (const key of Object.keys(savedData || {})) {
	localStorage.setItem('currentDataId', key)
	const id = key.match(/^[a-z]+(?:-[a-z]+)?/)[0]

	handleChange(id, savedData[key])
}

document.querySelector('.download-button').addEventListener('click', () => {
	const element = document.querySelector('.cv-wrapper')

	const opt = {
		margin: 0,
		filename: 'resume.pdf',
		image: { type: 'jpeg', quality: 0.98 },
		html2canvas: {
			scale: 3,
			useCORS: true,
		},
		jsPDF: {
			unit: 'px',
			format: [595, 842],
			orientation: 'portrait',
		},
	}

	html2pdf().set(opt).from(element).save()
})
