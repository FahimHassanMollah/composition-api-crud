<script setup>
import { reactive, computed, onMounted, watch, ref } from "vue";
import Loader from '../../components/Loader.vue'
import { useStore } from 'vuex';
import Pagination from '../../components/Pagination.vue';
import VueMultiselect from 'vue-multiselect'
// vuex  actions , getters  here
const store = useStore();
const appointments = computed(() => store.getters['appointments/appointments']);
const meta = computed(() => store.getters['appointments/meta']);
const isLoading = computed(() => store.getters['appointments/isLoading']);
const isScuccess = computed(() => store.getters['appointments/isScuccess']);
const isError = computed(() => store.getters['appointments/isError']);
const error = computed(() => store.getters['appointments/error']);

const selectedState = ref(null);
const selectedStatus = ref(null);

const defaultStates = [
  {
    value: "act",
    name: "Australian Capital Territory"
  },
  {
    value: "nsw",
    name: "New South Wales"
  },
  {
    value: "nt",
    name: "Northern Territory"
  },
  {
    value: "qld",
    name: "Queensland"
  },
  {
    value: "sa",
    name: "South Australia"
  },
  {
    value: "tas",
    name: "Tasmania"
  },
  {
    value: "vic",
    name: "Victoria"
  },
  {
    value: "wa",
    name: "Western Australia"
  }
];

const appointmentStatus = [
  {
    value: "0",
    name: "Open"
  },
  {
    value: "1",
    name: "Cancelled"
  },
  {
    value: "2",
    name: "Closed"
  },
  {
    value: "3",
    name: "Credited"
  },
  {
    value: "4",
    name: "Delivered"
  },
  {
    value: "5",
    name: "Dispute"
  },
  {
    value: "6",
    name: "Hold"
  },
  {
    value: "7",
    name: "Reassigned"
  },
  {
    value: "8",
    name: "Refund"
  },
  {
    value: "9",
    name: "Rescheduled"
  },
  {
    value: "10",
    name: "Rescheduled & Reassigned"
  }
]

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


watch(() => appointmentParams.page, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    getAppointmentsHandler(appointmentParams);
  }
})



// functions

const getAppointmentsHandler = async (appointmentParams) => {
  await store.dispatch('appointments/getAppointments', appointmentParams);
}

const changePage = (page) => {
  appointmentParams.page = page;

}

const appointmentFilter = () => {
  if (selectedState.value) {
    appointmentParams.where_has_address_state = selectedState.value.value;
  }
  if (selectedStatus.value) {
    appointmentParams.status = selectedStatus.value.value;
  }
  getAppointmentsHandler(appointmentParams);
}



onMounted(async () => {
  console.log("mounted", appointmentParams);
  await getAppointmentsHandler(appointmentParams);


});

</script>
<template>
  <div class="container">
    <div v-if="isLoading">
      <Loader/>
    </div>
    <div class="row py-4">
      <div class="col-md-4">
        <label for="state" class="form-label">state</label>
        <VueMultiselect id="state" v-model="selectedState" :options="defaultStates" :searchable="false"
          :allow-empty="false" label="name" placeholder="Select one" track-by="value">
        </VueMultiselect>
      </div>
      <div class="col-md-4">
        <label for="state" class="form-label">state</label>
        <VueMultiselect id="state" v-model="selectedStatus" :options="appointmentStatus" :searchable="false"
          :allow-empty="false" label="name" placeholder="Select one" track-by="value">
        </VueMultiselect>
      </div>
      <div class="col-md-4">
        <label for="state" class="form-label" style="visibility: hidden;">state</label>
        <button class="btn btn-primary w-100" @click="appointmentFilter">Filter</button>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table id="users-list-datatable" class="table">
            <thead>
              <tr>
                <th class="position-relative" style="width: 5%">SL</th>
                <th class="position-relative" style="width: 20%">Customer</th>
                <th class="position-relative" style="width: 10%">Service</th>
                <th class="position-relative" style="width: 10%">Panel</th>
                <th class="position-relative" style="width: 15%">Job Location</th>
                <th class="position-relative" style="width: 15%">Technician</th>
                <th class="position-relative" style="width: 5%">Status</th>
                <th class="position-relative text-right" style="width: 15%">Price</th>
                <th class="position-relative text-right" style="width: 5%">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(appointment, index) in appointments" :key="index">
                <td>{{ index + 1 }}</td>
                <td>
                  <div class="d-flex align-items-center">
                    <span>
                      <i class="bx"
                        :class="appointment.type === 'Home' ? 'bx-home text-warning' : 'bxs-business text-success'"></i>
                    </span>
                    <span title="Click to view customer details" v-if="appointment.customer && appointment.customer.user">
                      {{ `${appointment.customer.user.first_name} ${appointment.customer.user.last_name}` }}
                    </span>
                  </div>
                  <div>
                    <small>
                      Reference: #{{ appointment.reference }}
                    </small>
                  </div>
                  <div>
                    <small>
                      Service date : {{ `${appointment.date} ${appointment.time}` }}
                    </small>
                  </div>
                  <div>
                    <small>
                      Creation date : {{ appointment.created_at ? appointment.created_at : '-' }}
                    </small>
                  </div>
                </td>
                <td>
                  {{ appointment.service && appointment.service.name ? appointment.service.name : '-' }}
                </td>
                <td>
                  <div v-if="appointment?.appointmentCreator?.panel">
                    <span class="text-success"
                      v-if="appointment.appointmentCreator.panel === 'Online Appointment Form'">{{
                        appointment?.appointmentCreator?.panel
                      }}</span>
                    <span class="text-primary" v-if="appointment.appointmentCreator.panel === 'System Web-App'">{{
                      appointment?.appointmentCreator?.panel
                    }}</span>
                    <span class="text-info" v-if="appointment.appointmentCreator.panel === 'Technician Mob-App'">{{
                      appointment?.appointmentCreator?.panel
                    }}</span>
                    <span class="text-secondary" v-if="appointment.appointmentCreator.panel === 'Customer Web-App'">{{
                      appointment?.appointmentCreator?.panel
                    }}</span>
                  </div>
                  <span v-else>-</span>
                </td>
                <td>
                  <div v-if="appointment.preference === 'On-Site'">
                    <span v-if="appointment.address">
                      {{
                        `${appointment.address.street}, ${appointment.address.suburb}
                                            ${appointment.address.state.toUpperCase()} ${appointment.address.post_code},
                                            ${appointment.address.country}`
                      }}
                    </span>
                  </div>
                  <span v-else class="badge badge-pill">
                    {{ appointment.preference }}
                  </span>
                </td>
                <td>
                  <div v-if="appointment?.technicianAppointment?.id">
                    {{
                      `${appointment.technicianAppointment.technician.user.first_name}
                                        ${appointment.technicianAppointment.technician.user.last_name}`
                    }}
                  </div>
                  <div v-else>
                    <span class="badge badge-pill badge-danger">To be assign</span>
                  </div>
                </td>
                <td>
                  <span class="badge badge-pill">
                    {{ appointment.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <Pagination @changePage="changePage" :meta="meta" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>


</style>