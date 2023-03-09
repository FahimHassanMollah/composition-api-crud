import axios from "axios";

export const appointments = {
    namespaced: true,
    state: {
        appointments: [],
        paginateLinks: {},
        isLoading: false,
        isError: false,
        error: null,
        isScuccess: false,
    },
    getters: {
        appointments(state) {
            return state.appointments
        },
       
        isLoading(state) {
            return state.isLoading;
        },
        isError(state) {
            return state.isError;
        },
        error(state) {
            return state.error;
        },
        isScuccess(state) {
            return state.isScuccess;
        }


    },
    mutations: {
        setIsLoading(state, isLoading) {
            state.isLoading = isLoading
        },
        setIsError(state, isError) {
            state.isError = isError;
        },
        setError(state, error) {
            state.error = error;
        },
        setIsScuccess(state, isScuccess) {
            state.isScuccess = isScuccess;
        },
        setAppointments(state, appointments) {
            state.appointments = appointments
        }
      
    },
    actions: {
        async getAppointments({ commit }, params) {
            commit('setIsLoading', true);
            commit('setIsError', false);
            commit('setIsScuccess', false);
            commit('setError', {});
            commit('setAppointments', []);

            const path = `v1/appointments`;

            try {
                const response = await axios.get(path, { params });
                console.log(response);

                if (response?.data?.data?.user) {
                    await commit('setIsScuccess', true);
                    await commit('setAppointments', response.data.data.appointments);
                }

                // if (response?.data?.data?.token) {
                //     await commit('setAuthToken', response.data.data.token);
                // }
                commit('setIsLoading', false);


            } catch (error) {
                commit('setIsLoading', false);
                commit('setIsError', true);

                const errorData = {
                    message: null,
                    errors: []
                };
                if (error?.response?.data?.message) {
                    errorData.message = error.message;
                }
                if (error?.response?.data?.errors) {
                    errorData.errors = error.response.data.errors;

                }
                await commit('setError', errorData);



            }
        },
       
    },

}