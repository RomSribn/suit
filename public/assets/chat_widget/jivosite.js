const widgetId = 'jivo_custom_widget';

const messagesContainerCN = '.messagesLabel_FQ';

const cssStylesFromObject = (styleObject) => {
	const styleString = (
		Object.entries(styleObject).reduce((styleString, [propName, propValue]) => {
			return `${styleString}${propName}:${propValue};`;
		}, '')
	);
	return styleString;
};

let api = window.jivo_api;

let unreadMessagesCountContainer = document.createElement('div');
unreadMessagesCountContainer.setAttribute('id', 'unread-messages-count-container');

const unreadElementsCountBlockStyles = cssStylesFromObject({
	position: 'absolute',
	display: 'flex',
	'justify-content': 'center',
	'align-items': 'center',
	top: '-5.5px',
	right: '-5.5px',
	'z-index': 9,
	background: 'red',
	width: '22px',
	height: '22px',
	'border-radius': '50px',
	color: 'white',
	'font-weight': 500,
});

const updateUnreadCount = () => {
	const unreadCount = Number((document.querySelector(messagesContainerCN) || {textContent: 0}).textContent);
	unreadMessagesCountContainer.innerText = unreadCount;

	const targetStyle = unreadCount === 0 ? 'display: none' : unreadElementsCountBlockStyles;

	unreadMessagesCountContainer.setAttribute('style', targetStyle);
};

/*
	Коллбек-функция, вызывается сразу после того, как
	JivoSite окончательно загрузился
*/
function jivo_onLoadCallback(){
	api = window.jivo_api;
	const widgetContainer = document.createElement('div');
	widgetContainer.setAttribute('id', 'jivo_custom_widget-container');

	window.jivo_cstm_widget = document.createElement('div');
	jivo_cstm_widget.setAttribute('id', 'jivo_custom_widget');


	widgetContainer.appendChild(jivo_cstm_widget);
	widgetContainer.appendChild(unreadMessagesCountContainer);
	document.body.appendChild(widgetContainer);
	
	// Добавляем обработчик клика по ярлыку - чтобы при клике разворачивалось окно
	jivo_cstm_widget.onclick = function(){
		api.open();
	}
	
	// Изменяем CSS класс, если есть операторы в онлайне
	if (jivo_config.chat_mode === 'online'){
		jivo_cstm_widget.setAttribute('class', 'jivo_online');
	}
	
	// Теперь можно показать ярлык пользователю
	window.jivo_cstm_widget.style.display='block';

	setInterval(() => {
		updateUnreadCount();
	}, 5000);
}

/*
	Коллбек-функции jivo_onOpen и jivo_onClose вызываеются всегда,
	когда окно чата JivoSite разворачивается или сворвачивается
	пользователем, либо по правилу активного приглашения.
*/
function jivo_onOpen(){
	// Если чат развернут - скрываем ярлык
	if (jivo_cstm_widget)
		jivo_cstm_widget.style.display = 'none';
}
function jivo_onClose(){
	// Если чат свернут - показываем ярлык
	if (jivo_cstm_widget)
		jivo_cstm_widget.style.display = 'block';
}

function jivo_onChangeState(state) {
	updateUnreadCount();
}

