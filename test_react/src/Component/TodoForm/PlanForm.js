import { PostContext } from '../../context/PlanContext'
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
import SinglePost from './SinglePlan'
import AddPostModal from './AddPlan'
import UpdatePostModal from './UpdatePlan'
import addIcon from '../img/add.svg'
import './PlanForm.css'
const PlanForm = () => {
	// Contexts
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		postState: { post, posts, postsLoading },
		getPosts,
		setShowAddPostModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(PostContext)

	// Start: Get all posts
	useEffect(() => getPosts(), [])

	let body = null

	if (postsLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (posts.length === 0) {
		body = (
			<>
				<Card className='new-todo'>
					<Card.Header as='h1'>Hi {username}</Card.Header>
					<Card.Body>
						<Card.Title>Plan to do !</Card.Title>
						<Card.Text>
							Click the button below to add plan.
						</Card.Text>
						<Button
							className='btn-addplan'
							variant='primary'
							onClick={setShowAddPostModal.bind(this, true)}
						>
							Add Plan!
						</Button>
					</Card.Body>
				</Card>
			</>
		)
	} else {
		body = (
			<>
				<Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
					{posts.map(post => (
						<Col key={post._id} className='my-2'>
							<SinglePost post={post} />
						</Col>
					))}
				</Row>

				{/* Open Add Post Modal */}
				{/* <OverlayTrigger
					placement='left'
					// overlay={<Tooltip>Add a new plan to do</Tooltip>}
				> */}
					<Button
						className='btn-floating'
						onClick={setShowAddPostModal.bind(this, true)}
					>
						<img src={addIcon} alt='add-post' width='50' height='40' />
					</Button>
				{/* </OverlayTrigger> */}
			</>
		)
	}

	return (
		<>
			{body}
			<AddPostModal />
			{post !== null && <UpdatePostModal />}
			{/* After post is added, show toast */}
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

export default PlanForm