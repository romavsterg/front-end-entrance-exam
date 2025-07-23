import { openPopup } from './openPopup.js'

export const handleClick = e => {
	const el = e.target

	if (
		el.classList.contains('popup') ||
		el.parentNode.classList.contains('popup') ||
		el.parentNode.parentNode.classList.contains('popup') ||
		(el.parentNode.parentNode.parentNode.classList &&
			el.parentNode.parentNode.parentNode.classList.contains('popup'))
	) {
		return
	}

	document.querySelector('.popup').classList.remove('active')

	if (!el.id) return

	const x = e.x

	const y = el.id.startsWith('job-') ? e.y : el.offsetTop

	localStorage.setItem('currentDataId', el.getAttribute('data-id'))

	openPopup(el.id, x, y)
}

const saveData = newData => {
	const savedData = JSON.parse(localStorage.getItem('savedData'))

	localStorage.setItem(
		'savedData',
		JSON.stringify({
			...savedData,
			[localStorage.getItem('currentDataId')]: newData,
		}),
	)
}

export const handleChange = (id, newData) => {
	const input = document.querySelector(`#${id}-input`)

	switch (id) {
		case 'avatar':
			document.querySelector('#avatar').style.backgroundImage =
				`url(${newData})`
			break
		case 'lang-progress':
			document
				.querySelector(`[data-id=${localStorage.getItem('currentDataId')}]`)
				.style.setProperty('--level', `${newData * 10}%`)
			input.value = '0'
			input.style = ''
			document.querySelector(`#save-${id}`).classList.add('disabled')
			document.querySelector(`#save-${id}`).disabled = true
			break
		default:
			document.querySelector(
				// eslint-disable-next-line prettier/prettier
				`[data-id="${localStorage.getItem('currentDataId')}"]`
			).textContent = newData

			// console.log(newData)

			input.value = ''
			break
	}

	saveData(newData)

	document.querySelector('.popup').classList.remove('active')
}

export const handleAvatarChange = e => {
	const file = e.target.files[0]

	if (file) {
		const imageURL = URL.createObjectURL(file)

		handleChange('avatar', imageURL)
	}
}

export const handleLangProgressInput = e => {
	const slider = e.target

	const value = slider.value * 10

	slider.style.background = `linear-gradient(to right, #28d979 ${value}%, transparent ${value}%)`

	document
		.querySelector(`#save-lang-progress`)
		.classList.toggle('disabled', slider.value === '0')

	document.querySelector(`#save-lang-progress`).disabled = slider.value === '0'
}

export const handleLangProgressChange = () => {
	const newValue = document.querySelector(`#lang-progress-input`).value

	handleChange('lang-progress', newValue)
}

export const handleInput = e => {
	const inputId = e.target.id.match(/.+(?=-input)/)[0]
	const input = document.querySelector(`#${inputId}-input`)
	const saveButton = document.querySelector(`#save-${inputId}`)

	input.classList.toggle('error', !e.target.value)
	saveButton.classList.toggle('disabled', !e.target.value)
	saveButton.disabled = !e.target.value
}

export const handleSave = e => {
	const inputId = e.target.id.match(/(?<=save-).+/)[0]

	const newValue = document.querySelector(`#${inputId}-input`).value

	handleChange(inputId, newValue)
}
