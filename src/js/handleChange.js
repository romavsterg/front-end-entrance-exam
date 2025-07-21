import { openPopup } from './openPopup.js'

export const handleClick = e => {
	const element = e.target
	const x = element.offsetLeft + e.target.offsetWidth / 2
	const y = element.offsetTop

	localStorage.setItem('currentDataId', element.getAttribute('data-id'))

	openPopup(element.id, x, y)
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
			input.value = ''
			break
	}

	document.querySelector('.popup').classList.remove('active')
}
