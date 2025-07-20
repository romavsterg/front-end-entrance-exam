import { handleChange, handleClick } from './handleChange.js'

document.addEventListener('click', e => {
	if (
		e.target.classList.contains('popup') ||
		e.target.parentNode.parentNode.classList.contains('popup')
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

document.querySelector('#name-input').addEventListener('input', e => {
	document
		.querySelector('#name-input')
		.classList.toggle('error', !e.target.value)

	document
		.querySelector('#save-name')
		.classList.toggle('disabled', !e.target.value)

	document.querySelector('#save-name').disabled = !e.target.value
})

document.querySelector('#save-name').addEventListener('click', () => {
	const newValue = document.querySelector('#name-input').value

	handleChange('name', newValue)
})
