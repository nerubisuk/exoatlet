const mediator = (function () {
	const subscribe = function (channel, fn) {
		if (!mediator.channels[channel]) {
			mediator.channels[channel] = [];
		}
		mediator.channels[channel].push({context: this, callback: fn});
		return this;
	};

	const publish = function (channel) {
		if (!mediator.channels[channel]) {return false;}
		const args = Array.prototype.slice.call(arguments, 1);
		for (let i = 0, l = mediator.channels[channel].length; i < l; i++) {
			const subscription = mediator.channels[channel][i];
			subscription.callback.apply(subscription.context, args);
		}
		return this;
	};

	return {
		channels: {},
		publish,
		subscribe,
		installTo(obj) {
			obj.subscribe = subscribe;
			obj.publish = publish;
		}
	};
}());

export default mediator;
