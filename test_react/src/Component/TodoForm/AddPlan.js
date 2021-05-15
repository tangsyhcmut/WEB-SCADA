import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { PlanContext } from '../../context/PlanContext'

const AddPlanModal = () => {
	// Contexts
	const {
		showAddPlanModal,
		setShowAddPlanModal,
		addPlan,
		setShowToast
	} = useContext(PlanContext)

	// State
	const [newPlan, setNewPlan] = useState({
		title: '',
		description: '',
		status: 'TO DO'
	})

	const { title, description } = newPlan

	const onChangeNewPlanForm = event =>
		setNewPlan({ ...newPlan, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddPlanData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addPlan(newPlan)
		resetAddPlanData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddPlanData = () => {
		setNewPlan({ title: '', description: '', status: 'TO DO' })
		setShowAddPlanModal(false)
	}

	return (
		<Modal show={showAddPlanModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>What do you want to do?</Modal.Title>
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
							onChange={onChangeNewPlanForm}
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
							onChange={onChangeNewPlanForm}
						/>
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

export default AddPlanModal