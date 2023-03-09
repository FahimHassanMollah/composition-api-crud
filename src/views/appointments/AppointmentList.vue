<script setup>
import { onMounted } from 'vue';
import { reactive,computed } from "vue";
import { useStore } from 'vuex';

// vuex  actions , getters  here
const store = useStore();
const appointmets = computed(() => store.getters['appointments/appointments']);
const isLoading = computed(() => store.getters['appointments/isLoading']);
const isScuccess = computed(() => store.getters['appointments/isScuccess']);
const isError = computed(() => store.getters['appointments/isError']);
const error = computed(() => store.getters['appointments/error']);


const appointmentParams = reactive({
    customer_id: '',
    service_id: '',
    reference: '',
    type: '',
    status: '',
    date: [],
    time: [],
    created_at: [],
    where_has_customer_user_or_customer_address_query: '',
    where_has_technician_id: '',
    where_has_franchisee_id: '',
    where_has_address_state: '',
    with_relation: ["customer.user", "customer.address", "billingAddress", "order", "service", "address",
        "appointmentCharges", "appointmentNotes", "appointmentCreator", "appointmentConsents",
        "appointmentPayments.payment", "technicianAppointment.technician.user", "appointmentRefundsByReference", "order", "appointmentSchedules"
    ],
    order_by_time: 'ASC',
    order_by_date: 'ASC',
    paginate: 1,
    pagination: '',
    page: '',
})



// functions

const getAppointmentsHandler = async (appointmentParams) => {
    await store.dispatch('appointments/getAppointments', appointmentParams);
}

onMounted(async ()=> {
    console.log("mounted", appointmentParams);
    await getAppointmentsHandler(appointmentParams);
    console.log(appointmets, "appointmets");
    console.log(isLoading, "isLoading");
    console.log(isScuccess, "isScuccess");
    console.log(isError, "isError");
    console.log(error, "error");
});

</script>
<template>
    <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur beatae tempora, nostrum vitae commodi architecto
        quisquam cum, quia error minima sapiente assumenda nobis officiis magnam maxime? Voluptates inventore laudantium
        provident?
    </div>
</template>