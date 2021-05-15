import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { PlanContext } from '../../context/PlanContext'

const UpdatePlanModal = () => {
	// Contexts
	const {
		planState: { plan },
		showUpdatePlanModal,
		setShowUpdatePlanModal,
		updatePlan,
		setShowToast
	} = useContext(PlanContext)

	// State
	const [updatedPlan, setUpdatedPlan] = useState(plan)

	useEffect(() => setUpdatedPlan(plan), [plan])

	const { title, description , status } = updatedPlan

	const onChangeUpdatedPlanForm = event =>
		setUpdatedPlan({ ...updatedPlan, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setUpdatedPlan(plan)
		setShowUpdatePlanModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updatePlan(updatedPlan)
		setShowUpdatePlanModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	// const resetAddPlanData = () => {
	// 	setNewPlan({ title: '', description: '', url: '', status: 'TO LEARN' })
	// 	setShowAddPlanModal(false)
	// }

	return (
		<Modal show={showUpdatePlanModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Making progress?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Title'
							name='title'
							required
							aria-describedby='title-help'
							value={title}
							onChange={onChangeUpdatedPlanForm}
						/>
						<Form.Text id='title-help' muted>
							Required
						</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as='textarea'
							rows={3}
							placeholder='Description'
							name='description'
							value={description}
							onChange={onChangeUpdatedPlanForm}
						/>
					</Form.Group>
					
					<Form.Group>
						<Form.Control
							as='select'
							value={status}
							name='status'
							onChange={onChangeUpdatedPlanForm}
						>
							<option value='TO DO'>TO DO</option>
							<option value='DOING'>DOING</option>
							<option value='DONE'>DONE</option>
						</Form.Control>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}>
						Cancel
					</Button>
					<Button variant='primary' type='submit'>
						DoIt!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default UpdatePlanModal