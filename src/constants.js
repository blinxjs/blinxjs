export default {
	EVENT_ENUM: {
		/**
		 * The event will be listened even when the module has not been rendered.
		 */
		keepOn: "KEEP_ON",
		/**
		 * Whenever this type of event is published, the module will receive all the past events along with the current event in the form of an array
		 */
		replay: "RE_PLAY",
		/**
		 * {@defaultvalue} If the event is of this type then the module starts listening
		 * to the event once the rendering completes.
		 */
		playAfterRender: "PLAY_AFTER_RENDER"
	},


	MODULE_EVENTS: {
		resolveRenderOn: "resolveRenderOn",
		render: "render",
		onRenderComplete: "onRenderComplete",
		onStatusChange: "__onStatusChange",
		destroy: "destroy"
	},

	onStatusChange_EVENTS: {
		onCreate: "LIFECYCLE:CREATED",
		keepOnReplaySubscribed: "LIFECYCLE:KEEP_ON_&_REPLAY_SUBSCRIBED",
		initOnSubscribed: "LIFECYCLE:INIT_ON_SUBSCRIBED",
		resolveRenderOnCalled: "LIFECYCLE:RESOLVE_RENDER_ON_CALLED",
		listensToPlayAfterRenderSubscribed: "LIFECYCLE:LISTENS_TO_PLAY_AFTER_RENDER_SUBSCRIBED",
		renderCalled: "LIFECYCLE:ON_RENDER_CALLED",
		onRenderCompleteCalled: "LIFECYCLE:ON_RENDER_CAOMPLETE_CALLED"
	},

	/**
	 * @readonly
	 * @private
	 * @constant {Object} lifeCycleFlags following fields
	 * <ul>
	 * <li>booted: true </li>
	 * <li>rendered: false</li>
	 * <li>preRenderResolved: false</li>
	 * </ul>
	 */
	lifeCycleFlags: {
		booted: true,
		preRenderResolved: false,
		rendered: false
	}
}
