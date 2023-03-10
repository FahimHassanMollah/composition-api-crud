import axios from "axios";

export const appointments = {
    namespaced: true,
    state: {
        appointments: [],
        meta: {},
        paginateLinks: {},
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
    },
    getters: {
        appointments(state) {
            return state.appointments
        },
        meta(state) {
            return state.meta
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
        isSuccess(state) {
            return state.isSuccess;
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
        setIsSuccess(state, isSuccess) {
            state.isSuccess = isSuccess;
        },
        setAppointments(state, appointments) {
            state.appointments = appointments
        },
        setPagination(state, meta) {
            state.meta = meta
        }

    },
    actions: {
        async getAppointments({ commit }, params) {
            commit('setIsLoading', true);
            commit('setIsError', false);
            commit('setIsSuccess', false);
            commit('setError', {});
            commit('setAppointments', []);

            const path = `v1/appointments`;

            try {
                const response = await axios.get(path, { params });
                console.log(response);

                if (response?.data?.data) {
                    await commit('setIsSuccess', true);
                    await commit('setAppointments', response.data.data);
                }
                if (response?.data?.meta) {
                    await commit('setPagination', response.data.meta);
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