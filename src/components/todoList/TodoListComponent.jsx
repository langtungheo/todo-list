import React, { useState, useRef, useEffect } from 'react';
import styles from './TodoComponent.module.css';
import { Input, Checkbox, Popconfirm, Form, Select, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteTask,
	deleteTasksCheck,
	getTasksRender,
	updateTask,
} from '../../redux/actions/todoListActions';
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
	const { listTaskRender } = useSelector((state) => state.todoList);
	listTaskRender.sort(
		(first, last) => Date.parse(first.dueDate) - Date.parse(last.dueDate)
	);
	const dispatch = useDispatch();
	const handleClick = (id) => {
		dispatch(deleteTask(id));
	};
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
	const handleRemoveCheck = () => {
		const taskArrRemove = checkArr.filter((todo) => todo.status === true);
		dispatch(deleteTasksCheck(taskArrRemove));
		setVisiable(false);
		checkArr = [];
	};

	const handleSearch = (e) => {
		if (searchRef.current) {
			clearTimeout(searchRef.current);
		}
		searchRef.current = setTimeout(() => {
			dispatch(getTasksRender(e.target.value.trim()));
		}, 500);
	};

	const handleUpdateTask = (values) => {
		values = { ...values, dueDate: values.dueDate._d };
		dispatch(updateTask(taskDetail.id, values));
		setTaskDetail({});
	};

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
															message: 'please input task name',
														},
													]}
													initialValue={taskDetail.taskName}
												>
													<Input />
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
															message: 'please input desctiption',
														},
													]}
												>
													<TextArea rows={8} />
												</Form.Item>
												<div className="grid grid-cols-2 gap-8">
													<Form.Item
														name="dueDate"
														label={
															<span className="font-semibold">Due Date</span>
														}
														initialValue={moment(
															taskDetail.dueDate,
															'DD-MM-YYYY'
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
																		new Error('selected a date in the past !')
																	);
																},
															}),
														]}
													>
														<DatePicker
															defaultValue={moment(new Date(), 'DD-MM-YYYY')}
															className="w-full"
														/>
													</Form.Item>
													<Form.Item
														label={
															<span className="font-semibold">Piority</span>
														}
														name="pioryti"
														initialValue="normal"
													>
														<Select defaultValue={'nomnal'}>
															<Option value="low">low</Option>
															<Option value="normal">normal</Option>
															<Option value="hight">hight</Option>
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
