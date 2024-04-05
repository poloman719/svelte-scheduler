<script>
	import Task from './Task.svelte';
	let tasks = [
		{ text: 'task 1', duration: 5 },
		{ text: 'task 1', duration: 7 }
	];
  console.log(tasks)
	let initTime = 5;
	$: times = [initTime];
	$: {
		for (let i = 0; i < tasks.length; i++) {
			times.push(times[i] + tasks[i].duration);
		}
	}
</script>

<div class="bg-main-300 w-1/3 p-10 flex flex-col gap-3">
	<div class="text-xl">EDITOR</div>
	<div class="text-center border-b border-main-50">{initTime}</div>
	{#each tasks as task, i (i)}
		<Task
			text={task.text}
			duration={task.duration}
			time={times[i + 1]}
      onChange={newText => tasks[i].text = newText}
		/>
	{/each}
	<div class="rounded-3xl bg-main-500 p-7 flex justify-between bg-opacity-50">
		<input type="text" class="outline-none bg-main-500 bg-opacity-0" value="type to add task" />
		<div>15 min</div>
	</div>
</div>
