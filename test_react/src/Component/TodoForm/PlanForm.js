import { PlanContext } from '../../context/PlanContext'
import { AuthContext } from '../../context/AuthContext'
import { useContext, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col'
import SinglePlan from './SinglePlan'
import AddPlanModal from './AddPlan'
import UpdatePlanModal from './UpdatePlan'
import addIcon from '../img/trash.svg'

const Dashboard = () => {
	// Contexts
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		planState: { plan, plans, plansLoading },
		getPlans,
		setShowAddPlanModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(PlanContext)

	// Start: Get all plans
	useEffect(() => getPlans(), [])

	let body = null

	if (plansLoading) {
		body = (
			<div className='spinner-container'>
				{/* <Spinner animation='border' variant='info' /> */}
                hello
			</div>
		)
	} else if (plans.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h1'>Hi {username}</Card.Header>
					<Card.Body>
						<Card.Title>TO DO LIST</Card.Title>
						<Card.Text>
							Click the button below to create plan
						</Card.Text>
						<Button
							variant='primary'
							onClick={setShowAddPlanModal.bind(this, true)}
						>
							DoIt!
						</Button>
					</Card.Body>
				</Card>
			</>
		)
	} else {
		body = (
			<>
				<Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
					{plans.map(plan => (
						<Col key={plan._id} className='my-2'>
							<SinglePlan plan={plan} />
						</Col>
					))}
				</Row>

				{/* Open Add Plan Modal */}
				<OverlayTrigger
					placement='left'
					overlay={<Tooltip>Add a new to do</Tooltip>}
				>
					<Button
						className='btn-floating'
						onClick={setShowAddPlanModal.bind(this, true)}
					>
						<img src={addIcon} alt='add-plan' width='60' height='60' />
					</Button>
				</OverlayTrigger>
			</>
		)
	}

	return (
		<>
			{body}
			<AddPlanModal />
			{plan !== null && <UpdatePlanModal />}
			{/* After plan is added, show toast */}
			<Toast
				show={show}
				style={{ position: 'fixed', top: '20%', right: '10px' }}
				className={`bg-${type} text-white`}
				onClose={setShowToast.bind(this, {
					show: false,
					message: '',
					type: null
				})}
				delay={3000}
				autohide
			>
				<Toast.Body>
					<strong>{message}</strong>
				</Toast.Body>
			</Toast>
		</>
	)
}

export default Dashboard