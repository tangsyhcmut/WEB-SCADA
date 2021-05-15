import { createContext, useReducer, useState } from 'react'
import { planReducer } from '../reducers/planReducer'
import {
	apiUrl,
	PLANS_LOADED_FAIL,
	PLANS_LOADED_SUCCESS,
	ADD_PLAN,
	DELETE_PLAN,
	UPDATE_PLAN,
    FIND_PLAN
	
} from './constants'
import axios from 'axios'

export const PlanContext = createContext()

const PlanContextProvider = ({ children }) => {
	// State
	const [planState, dispatch] = useReducer(planReducer, {
		plan: null,
		plans: [],
		plansLoading: true
	})

	const [showAddPlanModal, setShowAddPlanModal] = useState(false)
	const [showUpdatePlanModal, setShowUpdatePlanModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	// Get all plans
	const getPlans = async () => {
		try {
			const response = await axios.get(`${apiUrl}/plans`)
			if (response.data.success) {
				dispatch({ type: PLANS_LOADED_SUCCESS, payload: response.data.plans })
			}
		} catch (error) {
			dispatch({ type: PLANS_LOADED_FAIL })
		}
	}

	// Add plan
	const addPlan = async newPlan => {
		try {
			const response = await axios.plan(`${apiUrl}/plans`, newPlan)
			if (response.data.success) {
				dispatch({ type: ADD_PLAN, payload: response.data.plan })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete plan
	const deletePlan = async planId => {
		try {
			const response = await axios.delete(`${apiUrl}/plans/${planId}`)
			if (response.data.success)
				dispatch({ type: DELETE_PLAN, payload: planId })
		} catch (error) {
			console.log(error)
		}
	}
        // Find plan when user is updating plan
	        const findPlan= planId => {
		    const plan = planState.plans.find(plan => plan._id === planId)
		    dispatch({ type: FIND_PLAN, payload: plan })
	    }
	

	// Update plan
	const updatePlan = async updatedPlan => {
		try {
			const response = await axios.put(
				`${apiUrl}/plans/${updatedPlan._id}`,
				updatedPlan
			)
			if (response.data.success) {
				dispatch({ type: UPDATE_PLAN, payload: response.data.plan })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Plan context data
	const planContextData = {
		planState,
		getPlans,
		showAddPlanModal,
		setShowAddPlanModal,
		showUpdatePlanModal,
		setShowUpdatePlanModal,
		addPlan,
		showToast,
		setShowToast,
		deletePlan,
        findPlan,
		updatePlan
	}

	return (
		<PlanContext.Provider value={planContextData}>
			{children}
		</PlanContext.Provider>
	)
}

export default PlanContextProvider