
<template>
  <div class="text-xs bb bg-gray-100  p-1 m-1 h-96 w-96">
    <h3 class="font-bold mb-2">Source</h3>
    <textarea
    ref="thetextarea"
    style="font-family: monospace; font-weight:bold; line-height: 1em; letter-spacing: 0px;"
    :value="initialValue"   
    class="h-64 w-full resize-none border rounded-md p-2"
    @input="$emit('update:modelValue', $event.target.value)"
    />

  </div>
</template>

<script setup>
import {onMounted, defineEmits,defineProps,ref } from 'vue'

const props = defineProps(['modelValue','initialValue'])

const emits = defineEmits(['update:modelValue','enterpressed'])

const thetextarea = ref({})

onMounted(() => {
    // Execute a function when the user presses a key on the keyboard
    thetextarea.value.addEventListener("keypress", function(event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // Cancel the default action, if needed
        //event.preventDefault();
        // Trigger the button element with a click
        emits('enterpressed',true)
      }
    }); 
})

const inputhandler = ()=> {
    //alert('elja')
    ////$emit('update:modelValue', $event.target.value)
    //$emit('update:modelValue', e.target.value)
}
</script>

<style scoped>
/* Add any custom styles here */
</style>

