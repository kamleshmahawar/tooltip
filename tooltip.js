var tooltip = (function () {
    let option = {
        target: 'tooltip',
        content: 'some content for tooltip',
        position: 'bottom',
        trigger: 'hover'
    }
    let tooltip = document.createElement('div'), btn;
    tooltip.setAttribute('class', 'tooltip up-arrow');
    tooltip.innerHTML = option.content;

    function initialize(options) {
		if(options) {
			option = {
				target: options.target || option.target,
				content: options.content || option.content,
				position: options.position || option.position,
				trigger: options.trigger || option.trigger
			}
		}
        btn = document.getElementsByClassName(option.target);
        const event = option.trigger === 'hover' ? 'mouseover': option.trigger;
        for (let i = 0; i < btn.length; i++) {
            (function (item) {
                btn[item].addEventListener(event, showTooltip);
                btn[item].addEventListener('mouseout', hideTooltip);
            })(i)

        }
        document.body.appendChild(tooltip);
    }

    function hideTooltip() {
        tooltip.style.visibility = 'hidden';
    }

    function showTooltip(e) {
        tooltip.style.visibility = 'visible';
        let position = e.target.dataset.position || option.position;
        tooltip.innerHTML = e.target.dataset.tip || option.content;
        switch (position) {
            case 'top': {
                tooltip.setAttribute('class', 'tooltip down-arrow');
                tooltip.style.top = e.target.offsetTop - e.target.offsetHeight - (tooltip.offsetHeight / 2) + 10 + 'px';
                tooltip.style.left = e.target.offsetLeft + e.target.offsetWidth - (tooltip.offsetWidth / 2) - 20 + 'px';
                break;
            }
            case 'left': {
                tooltip.setAttribute('class', 'tooltip right-arrow');
                tooltip.style.top = e.target.offsetTop + 'px';
                tooltip.style.left = e.target.offsetLeft - tooltip.offsetWidth - 15 + 'px';
                break;
            }
            case 'right': {
                tooltip.setAttribute('class', 'tooltip left-arrow');
                tooltip.style.top = e.target.offsetTop + 'px';
                tooltip.style.left = e.target.offsetLeft + e.target.offsetWidth + 15 + 'px';
                break;
            }
            case 'bottom': {
                tooltip.setAttribute('class', 'tooltip up-arrow');
                tooltip.style.top = e.target.offsetTop + e.target.offsetHeight + 10 + 'px';
                tooltip.style.left = e.target.offsetLeft + e.target.offsetWidth - (tooltip.offsetWidth / 2) - 20 + 'px';
                break;
            }
        }
    }
    return {
        initialize: initialize,
    }
})();
