import { handleChange, handleClick } from './handleChange.js'

const inputs = ['name', 'bio-heading', 'job', 'lang']

document.addEventListener('click', e => {
	if (
		e.target.classList.contains('popup') ||
		e.target.parentNode.classList.contains('popup') ||
		e.target.parentNode.parentNode.classList.contains('popup') ||
		e.target.parentNode.parentNode.parentNode.classList.contains('popup')
	) {
		return
	}

	document.querySelector('.popup').classList.remove('active')

	if (!e.target.id) return

	handleClick(e)
})

document.querySelector('#avatar-input').addEventListener('change', e => {
	const file = e.target.files[0]

	if (file) {
		const imageURL = URL.createObjectURL(file)

		handleChange('avatar', imageURL)
	}
})

document.querySelector('#lang-progress-input').addEventListener('input', e => {
	const slider = e.target

	const value = slider.value * 10

	slider.style.background = `linear-gradient(to right, #28d979 ${value}%, transparent ${value}%)`

	document
		.querySelector(`#save-lang-progress`)
		.classList.toggle('disabled', e.target.value === '0')

	document.querySelector(`#save-lang-progress`).disabled =
		e.target.value === '0'
})

document.querySelector(`#save-lang-progress`).addEventListener('click', () => {
	const newValue = document.querySelector(`#lang-progress-input`).value

	handleChange('lang-progress', newValue)
})

inputs.forEach(inputId => {
	document.querySelector(`#${inputId}-input`).addEventListener('input', e => {
		document
			.querySelector(`#${inputId}-input`)
			.classList.toggle('error', !e.target.value)

		document
			.querySelector(`#save-${inputId}`)
			.classList.toggle('disabled', !e.target.value)

		document.querySelector(`#save-${inputId}`).disabled = !e.target.value
	})

	document.querySelector(`#save-${inputId}`).addEventListener('click', () => {
		const newValue = document.querySelector(`#${inputId}-input`).value

		handleChange(inputId, newValue)
	})
})
