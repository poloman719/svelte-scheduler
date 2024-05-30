<script>
	// @ts-nocheck

	import Task from './Task.svelte';
	import Time from './Time.svelte';
	let tasks = [
		{ text: 'task 1', duration: 5 },
		{ text: 'task 2', duration: 7 }
	];
	let initTime;
	let taskToAdd = '';
	let durationToAdd = '';
	let times;
	let initHour = 12;
	let initMinute = 0;
	let taskInput;
	let dragg;
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
		/> min
	</div>
	<div class="bg-main-500" bind:this={dragg}>draggable</div>
</div>

