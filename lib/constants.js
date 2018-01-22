export default {
	/**
  * <ul>
  *<li> EVENT_ENUM: ENUM constant for the types of events
  *<li>"KEEP_ON": The event will be listened even when the module has not been rendered.
  *<li> "RE_PLAY": Non rendered modules with replay events will be queued on publishing. Will automatically call the callback once the rendering is complete.
  *<li> "PLAY_AFTER_RENDER",{@defaultvalue} If the event is of this type then the module starts listening
  * to the event once the rendering completes.
  * </ul>
  */
	EVENT_ENUM: {
		keepOn: 'KEEP_ON',
		replay: 'RE_PLAY',
		playAfterRender: 'PLAY_AFTER_RENDER'
	},

	/**
  * Based on the module lifecycle. The following events occur
  * <ul>
  *<li> 1) resolveRenderOn: event occurs just before resolveRenderOn method is called
  *<li> 2) render: event occurs when page renders(in case template passed) or just before render method is called
  *<li> 3) onRenderComplete: event is fired just before onRenderComplete method is called
  *<li> 4) onStatusChange: event is fired whenever the status of module is changed. The status change events are mentioned
  *    on the next section
  *<li> 5) destroy: event occurs when module is destroyed.
  * </ul>
  */
	MODULE_EVENTS: {
		resolveRenderOn: 'resolveRenderOn',
		render: 'render',
		onRenderComplete: 'onRenderComplete',
		onStatusChange: '__onStatusChange',
		destroy: 'destroy'
	},
	/**
  *
  * LIFECYCLE EVENTS LIST:
  * <ul>
  *<li>1)"LIFECYCLE:CREATED",
  *<li>2)"LIFECYCLE:KEEP_ON_&_REPLAY_SUBSCRIBED",
  *<li>3)"LIFECYCLE:INIT_ON_SUBSCRIBED",
  *<li>4)"LIFECYCLE:RESOLVE_RENDER_ON_CALLED",
  *<li>5)"LIFECYCLE:LISTENS_TO_PLAY_AFTER_RENDER_SUBSCRIBED",
  *<li>6)"LIFECYCLE:ON_RENDER_CALLED",
  *<li>7)"LIFECYCLE:ON_RENDER_CAOMPLETE_CALLED"
  * </ul>
  */
	onStatusChange_EVENTS: {
		onCreate: 'LIFECYCLE:CREATED',
		keepOnReplaySubscribed: 'LIFECYCLE:KEEP_ON_&_REPLAY_SUBSCRIBED',
		initOnSubscribed: 'LIFECYCLE:INIT_ON_SUBSCRIBED',
		resolveRenderOnCalled: 'LIFECYCLE:RESOLVE_RENDER_ON_CALLED',
		listensToPlayAfterRenderSubscribed: 'LIFECYCLE:LISTENS_TO_PLAY_AFTER_RENDER_SUBSCRIBED',
		renderCalled: 'LIFECYCLE:ON_RENDER_CALLED',
		onRenderCompleteCalled: 'LIFECYCLE:ON_RENDER_CAOMPLETE_CALLED'
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
};