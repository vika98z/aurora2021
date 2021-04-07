class MessageBus {
	constructor() {
		this.listeners = [];
	}

	on(sub, topic, callback) {
		this.listeners.push({
			topic,
			sub,
			callback
		});
	}

	off(sub, topic) {
		this.listeners = this.listeners.filter(listener => listener.sub !== sub || listener.topic !== topic);
	}

	offAll(sub) {
		this.listeners = this.listeners.filter(listener => listener.sub !== sub);
	}

	emit(message) {
		const {text, topics, delay, author} = message;
		if (text === undefined || topics === undefined || delay === undefined || author === undefined) {
			throw new Error("Wrong message format");
		}
		setTimeout(() => {
			this.listeners.filter(({topic}) => topics.includes(topic)).forEach(({callback}) => {
				callback(message);
			});
		}, delay);
	}

	destroy() {
		delete this.listeners;
	}
}

export default MessageBus;
