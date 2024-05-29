<script>
  export let hour;
  export let minute;
</script>

{hour > 12 ? hour - 12 : hour}:{minute > 9 ? minute : `0${minute}`} {hour >= 12 ? "PM": "AM"}