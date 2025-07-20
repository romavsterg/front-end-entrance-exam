import { openPopup } from './openPopup.js'

export const handleClick = e => {
	const element = e.target
	const x = element.offsetLeft + e.target.offsetWidth / 2
	const y = element.offsetTop

	openPopup(element.id, x, y)
}

export const handleChange = (id, newData) => {
	switch (id) {
		case 'avatar':
			document.querySelector('#avatar').style.backgroundImage =
				`url(${newData})`

			break
		case 'name':
			document.querySelector('#name').textContent = newData
			break
	}
	document.querySelector('.popup').classList.remove('active')
}
