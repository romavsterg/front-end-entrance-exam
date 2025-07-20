export const openPopup = (id, x, y) => {
	const popupElement = document.querySelector('.popup')

	Array.from(popupElement.children).forEach(child => {
		child.classList.remove('active')
	})

	popupElement.classList.add('active')
	popupElement.style.left = x + 'px'
	popupElement.style.top = y - 20 + 'px'

	document.querySelector(`.${id}-popup`).classList.add('active')
}
