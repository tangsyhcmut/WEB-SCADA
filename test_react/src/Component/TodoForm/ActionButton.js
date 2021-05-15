import Button from 'react-bootstrap/Button'
import editIcon from '../img/pencil.svg'
import deleteIcon from '../img/trash.svg'
import { PlanContext } from '../../context/PlanContext'
import { useContext } from 'react'

const ActionButtons = ({ _id }) => {
	const { deletePlan, findPlan, setShowUpdatePlanModal } = useContext(
		PlanContext
	)

	const choosePlan = postId => {
		findPlan(postId)
		setShowUpdatePlanModal(true)
	}

	return (
		<>
			
			<Button className='post-button' onClick={choosePlan.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={deletePlan.bind(this, _id)}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}

export default ActionButtons