import MessageBus from "./MessageBus";

test("message bus simple test", () => {
	const mb = new MessageBus();
	const this1 = {};
	const this2 = {};
	mb.on(this1, "topic1", ({text}) => {
		mb.emit({
			text: "Hello from this1!",
			topics: ["topic2"],
			delay: 1000,
			author: this1
		});
		expect(text).toBe("Hello from this2!");
	});
	mb.on(this2, "topic2", ({text}) => {
		expect(text).toBe("Hello from this1!");
	});
	mb.emit({
		text: "Hello from this1!",
		topics: ["topic1"],
		delay: 1000,
		author: this1
	});
});
