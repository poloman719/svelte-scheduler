<script>
	// @ts-nocheck

	import Draggable from './Draggable.svelte';
	import Task from './Task.svelte';
	import Time from './Time.svelte';
	import drag from '$lib/_drag.svg';
	let tasks = [
		{ text: 'task 1', duration: 5 },
		{ text: 'task 2', duration: 7 }
	];

	let dragEl;
	let initTime;
	let taskToAdd = '';
	let durationToAdd = '';
	let times;
	let initHour = 12;
	let initMinute = 0;
	let taskInput;
	let order = [1, 2];
	let taskToDrag;
	let dragOffsetX;
	let dragOffsetY;
	let initDragOffsetX;
	let initDragOffsetY;
	let dragWidth;
	let dragStartX;
	let dragStartY;
	let dragIdx;
	let tasksDistance;
	let shift = 0;
	$: {
		const date = new Date();
		date.setHours(initHour);
		date.setMinutes(initMinute);
		date.setSeconds(0);
		date.setMilliseconds(0);
		initTime = date.getTime();
	}
	$: {
		times = [initTime];
		for (let i = 0; i < tasks.length; i++) {
			times.push(times[i] + tasks[i].duration * 60 * 1000);
			times = times;
		}
	}

	const onAddTask = (e) => {
		if (e.code == 'Enter' && taskToAdd && durationToAdd) {
			tasks = [...tasks, { text: taskToAdd, duration: parseInt(durationToAdd) }];
			taskToAdd = '';
			durationToAdd = '';
		}
		taskInput.focus();
	};

	const moveTask = (from, to) => {
		const newTasks = [];
		for (let i = 0; i < tasks.length; i++) {
			if (i == from) {
				continue;
			}
			if (i == to) {
				if (from < to) {
					newTasks.push(tasks[to], tasks[from]);
				} else {
					newTasks.push(tasks[from], tasks[to]);
				}
			} else {
				newTasks.push(tasks[i]);
			}
		}
		tasks = newTasks;
	};

	const swapTasks = (i, j) => {
		const newTasks = [...tasks];
		newTasks[i] = tasks[j];
		newTasks[j] = tasks[i];
		tasks = newTasks;
	};

	const testDrag = (e) => {
		dragEl.startDrag(e.clientX, e.clientY);
	};

	const initiateDrag = (idx, offsetX, offsetY, width, startX, startY) => {
		taskToDrag = tasks[idx];
		initDragOffsetX = offsetX;
		initDragOffsetY = offsetY;
		dragOffsetX = initDragOffsetX;
		dragOffsetY = initDragOffsetY;
		dragStartX = startX;
		dragStartY = startY;
		dragIdx = idx;
		console.log(offsetX, offsetY);
		dragWidth = width;
	};

	$: {
		if (dragEl) {
			dragEl.startDrag(dragStartX, dragStartY);
		}
	}

	const updateDistance = (position) => {
		console.log(position, dragOffsetY);
		tasksDistance = Math.abs(position - dragOffsetY - shift);
	};

	const onDragMove = (e) => {
		// console.log(Math.abs(e.detail.Y + shift));
		if (dragIdx < tasks.length - 1 && e.detail.Y + shift < -tasksDistance / 2) {
			swapTasks(dragIdx, dragIdx + 1);
			dragIdx += 1;
			shift += tasksDistance;
		}
		if (dragIdx > 0 && e.detail.Y + shift > tasksDistance / 2) {
			swapTasks(dragIdx - 1, dragIdx);
			dragIdx -= 1;
			shift -= tasksDistance;
		}
	};

	const onEndDrag = () => {
		if (!dragEl) return;

		dragIdx = null;
		dragEl.endDrag();
		shift = 0;
	};
</script>

<div class="bg-main-300 w-1/3 p-10 flex flex-col gap-3">
	<div class="text-xl">EDITOR</div>
	<div class="text-center border-b border-main-50">
		<Time hour={initHour} minute={initMinute} />
	</div>
	{#each tasks as task, i (i)}
		<Task
			text={task.text}
			duration={task.duration}
			time={times[i + 1]}
			onDurationChange={(e) => (tasks[i].duration = e.target.value)}
			onTextChange={(e) => (tasks[i].text = e.target.value)}
			onStartDrag={(x1, y1, w, x2, y2) => initiateDrag(i, x1, y1, w, x2, y2)}
			{updateDistance}
			adjacent={Math.abs(dragIdx - i) == 1}
			dragging={dragIdx == i}
		/>
	{/each}
	<div class="rounded-3xl bg-main-500 p-7 flex justify-between bg-opacity-50 gap-2">
		<input
			type="text"
			class="outline-none bg-opacity-0 placeholder-main-50 w-3/4"
			placeholder="type to add task"
			bind:value={taskToAdd}
			bind:this={taskInput}
		/>
		<input
			type="number"
			class="outline-none w-5 placeholder-main-50 text-end"
			placeholder="0"
			bind:value={durationToAdd}
			on:change={(e) => {
				if (e.target.value > 60) e.preventDefault();
			}}
			on:keypress={onAddTask}
		/>
		min
	</div>
	{#if taskToDrag}
		<Draggable
			bind:this={dragEl}
			on:mousedown={testDrag}
			absolute
			bind:X={initDragOffsetX}
			bind:Y={initDragOffsetY}
			onDragEnd={() => (taskToDrag = null)}
			on:move={onDragMove}
		>
			<div
				class={`rounded-3xl bg-main-500 p-7 pl-2 flex justify-between gap-2 absolute z-50 overflow-hidden`}
				style={`width: ${dragWidth}px;`}
			>
				<img src={drag} alt="handle" />
				<div class="w-3/4 text-nowrap overflow-hidden">{taskToDrag.text}</div>
				<div class="w-5 text-end">{taskToDrag.duration}</div>
				min
			</div>
		</Draggable>
	{/if}
</div>
<svelte:document on:mouseup={onEndDrag} />
