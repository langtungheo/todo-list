import React, { useState, useRef, useEffect } from 'react';
import styles from './TodoList.module.css';
import { Input, Checkbox, Popconfirm, Form, Select, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteTask,
	deleteTasksCheck,
	getTasksRender,
	updateTask,
} from '../../redux/actions/todoListActions';
import {piority} from '../../utils/globalConst' 
import moment from 'moment';
import { setFormAddTask } from '../../redux/actions/modalActions';
import CreateNewTask from '../createTask/CreateNewTask'
import { SET_MODAL_VISIABLE } from '../../redux/types/modalTypes';
let checkArr = [];
const { Option } = Select;
const { TextArea } = Input;

export default function TodoListComponent() {
	const [isVisiable, setVisiable] = useState(false);
	const [taskDetail, setTaskDetail] = useState({});
	const [isChecked, setChecked] = useState([]);
	const checkRef = useRef(false);
	const searchRef = useRef('');
	const text = 'Are you sure to delete this task?';
	const { listTaskRender  } = useSelector((state) => state.todoList);
	listTaskRender && listTaskRender.sort(
		(first, last) => Date.parse(first.dueDate) - Date.parse(last.dueDate)
	);

	const dispatch = useDispatch();
	const handleClick = (id) => {
		dispatch(deleteTask(id));
	};
	
	//Ham xu ly check box
	const handleChangeCheckBox = (e, id) => {
		const index = checkArr.findIndex((todo) => todo.id === id);
		if (index === -1 && e.target.checked) {
			checkArr.push({ id: id, status: e.target.checked });
		} else {
			checkArr.splice(index, 1);
		}
		const isStatus = checkArr.some((todo) => todo.status === true);
		setVisiable(isStatus);
		const arrSetCheck = [];
		checkArr.map((item) => {
			return arrSetCheck.push(item.id);
		});
		setChecked(arrSetCheck);
	};

	// Ham xu ly xoa hang loat task
	const handleRemoveCheck = () => {
		const taskArrRemove = checkArr.filter((todo) => todo.status === true);
		dispatch(deleteTasksCheck(taskArrRemove));
		setVisiable(false);
		checkArr = [];
	};

	// Ham xu ly debounce search
	const handleSearch = (e) => {
		if (searchRef.current) {
			clearTimeout(searchRef.current);
		}
		searchRef.current = setTimeout(() => {
			dispatch(getTasksRender(e.target.value.trim()));
		}, 500);
	};

	//Ham xu ly update task
	const handleUpdateTask = (values) => {
		values = { ...values, dueDate: moment(values.dueDate._d).toJSON()};
		dispatch(updateTask(taskDetail.id, values));
		setTaskDetail({});
	};

	// Ham xu ly mo modal Add Task man hinh di dong
	const handleClickAddForm = ()=>{
		dispatch(setFormAddTask(SET_MODAL_VISIABLE, <CreateNewTask />))
	}

	useEffect(() => {
		dispatch(getTasksRender(''));
	}, []);
	return (
		<div className={styles.todoListBody}>
			<div>
				<h2 className="font-bold text-lg">To Do List</h2>
			</div>
			<div className="mb-6 grid grid-cols-6 md:grid-cols-1 items-center gap-2 md:gap-0">
				<div className="col-span-5 md:col-span-1"><Input onChange={handleSearch} placeholder="Search..." /></div>
				<button onClick={()=>{handleClickAddForm()}} className={styles.btnUpdate + ' md:hidden'}>Add</button>
			</div>
			<ul className={styles.listTodo}>
				{listTaskRender
					? listTaskRender.map((todo, index) => {
							return (
								<div key={index}>
									<li className={styles.listTasks}>
										<Checkbox
											onChange={(e) => {
												handleChangeCheckBox(e, todo.id);
											}}
											checked={isChecked.includes(todo.id)}
											ref={checkRef}
										/>
										<div className="mr-auto ml-4">{todo.taskName}</div>
										<div className="text-white  ">
											<button
												onClick={() => {
													if (taskDetail.id === todo.id) {
														setTaskDetail({});
													} else {
														setTaskDetail({ ...todo, status: true });
													}
												}}
												className={styles.btnDetail}
											>
												Detail
											</button>
											<Popconfirm
												placement="topLeft"
												onConfirm={() => {
													handleClick(todo.id);
												}}
												title={text}
												okText="Yes"
												cancelText="No"
											>
												<button className={styles.btnRemove}>Remove</button>
											</Popconfirm>
										</div>
									</li>
									{todo.id === taskDetail.id && taskDetail.status === true ? (
										<div className="py-3 px-4 border-2 mb-2 border-black">
											<Form onFinish={handleUpdateTask} layout="vertical">
												<Form.Item
													name="taskName"
													rules={[
														{
															required: true,
															message: 'Please input task name',
														},
													]}
													initialValue={taskDetail.taskName}
												>
													<Input maxLength={15}/>
												</Form.Item>
												<Form.Item
													label={
														<span className="font-semibold">Description</span>
													}
													name="Description"
													initialValue={taskDetail.Description}
													rules={[
														{
															required: true,
															message: 'Please input desctiption',
														},
													]}
												>
													<TextArea rows={4} />
												</Form.Item>
												<div className="grid grid-cols-2 gap-8">
													<Form.Item
														name="dueDate"
														label={
															<span className="font-semibold">Due Date</span>
														}
														initialValue={moment(
															(new Date(taskDetail.dueDate)),
															'YYYY-MM-DD'
														)}
														rules={[
															() => ({
																validator(_, value) {
																	let dueDay = value?._d;
																	let toDay = new Date();
																	dueDay = dueDay?.toString().slice(0, 10);
																	toDay = toDay.toString().slice(0, 10);
																	const status =
																		Date.parse(dueDay) - Date.parse(toDay);
																	if (status >= 0) {
																		return Promise.resolve();
																	}

																	return Promise.reject(
																		new Error('Selected a date in the past !')
																	);
																},
															}),
														]}
													>
														<DatePicker
															className="w-full"
															format={'DD-MM-YYYY'}
														/>
													</Form.Item>
													<Form.Item
														label={
															<span className="font-semibold">Piority</span>
														}
														name="pioryti"
														initialValue={todo.piority}
													>
														<Select>
															{piority.map((piority, index)=>{
																return <Option key={index} value={piority.value}>{piority.name}</Option>
															})}	
														</Select>
													</Form.Item>
												</div>
												<button type="submit" className={styles.btnUpdate}>
													Update
												</button>
											</Form>
										</div>
									) : (
										''
									)}
								</div>
							);
					  })
					: ''}
			</ul>
			<div className={isVisiable ? styles.bluckAction : 'hidden'}>
				<div>
					<span>Bulk Action:</span>
				</div>
				<div className="text-white">
					<button className={styles.btnDetail}>Done</button>
					<button
						onClick={() => {
							handleRemoveCheck();
						}}
						className={styles.btnRemove}
					>
						Remove
					</button>
				</div>
			</div>
		</div>
	);
}
