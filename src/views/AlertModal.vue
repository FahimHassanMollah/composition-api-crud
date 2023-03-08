
<script setup>
const props = defineProps({
    alertModalData: {
    type: Object,
    required: true
  },

});
const emit = defineEmits(['removeStudent'])

const applyChanges = () => {
    console.log(props.alertModalData);
  emit('removeStudent', {isRemoveTrue: true, id: props.alertModalData.id})
}


</script>

<template>
    <!-- Button trigger modal -->
  

    <!-- Modal -->
    <div class="modal fade" id="alertModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Warning</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {{ alertModalData.title }} {{ alertModalData.id }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="applyChanges()">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>