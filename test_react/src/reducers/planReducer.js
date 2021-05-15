import {
	PLANS_LOADED_SUCCESS,
	PLANS_LOADED_FAIL,
	ADD_PLAN,
	DELETE_PLAN,
	FIND_PLAN,
	UPDATE_PLAN

} from '../context/constants'

export const planReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case PLANS_LOADED_SUCCESS:
			return {
				...state,
				plans: payload,
				plansLoading: false
			}

		case PLANS_LOADED_FAIL:
			return {
				...state,
				plans: [],
				plansLoading: false
			}

		case ADD_PLAN:
			return {
				...state,
				plans: [...state.plans, payload]
			}
		case FIND_PLAN:
			return { ...state, plan: payload }

		case DELETE_PLAN:
			return {
				...state,
				plans: state.plans.filter(plan => plan._id !== payload)
			}


		case UPDATE_PLAN:
			const newPlans = state.plans.map(plan =>
				plan._id === payload._id ? payload : plan
			)

			return {
				...state,
				plans: newPlans
			}

		default:
			return state
	}
}