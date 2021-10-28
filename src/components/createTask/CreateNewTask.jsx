import React, { useRef } from 'react';
import styles from './CreateTask.module.css';
import { Form, Input, DatePicker, Select } from 'antd';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setNewTask } from '../../redux/actions/todoListActions';
import { setModalHidden } from '../../redux/actions/modalActions';
import { SET_MODAL_HIDDEN } from '../../redux/types/modalTypes';
import { piority } from '../../utils/globalConst';

const { TextArea } = Input;
const { Option } = Select;

export default function CreateNewTask() {
	const formRef = useRef();
	const dispatch = useDispatch();
	const onFinished = (values) => {
		const data = { ...values, dueDate: moment(values.dueDate._d).toJSON(), id: Date.now() };
		formRef.current.resetFields();
		dispatch(setNewTask(data));
		dispatch(setModalHidden(SET_MODAL_HIDDEN))
	};

	
	return (
		<div className="py-5 px-10 text-center bg-white w-full rounded-md shadow-md">
			<div>
				<h2 className="font-bold text-lg">New Task</h2>
			</div>
			<Form ref={formRef} layout="vertical" onFinish={onFinished}>
				<Form.Item
					name="taskName"
					rules={[
						() => ({
							validator(_, value) {
								const taskName = value ? value.trim() : '';
								if (taskName && taskName.length > 0) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('Task name is  required !'));
							},
						}),
					]}
				>
					<Input maxLength={15} placeholder={'Add new task ...'} />
				</Form.Item>
				<Form.Item
					label={<span className="font-semibold">Description</span>}
					name="Description"
					rules={[
						() => ({
							validator(_, value) {
								const desctiption = value ? value.trim() : '';
								if (desctiption && desctiption.length > 0) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('Description is  required !'));
							},
						}),
					]}
				>
					<TextArea rows={8} />
				</Form.Item>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-0 md:gap-4">
					<Form.Item
						name="dueDate"
						label={<span className="font-semibold">Due Date</span>}
						initialValue={moment(new Date(), 'YYYY-MM-DD')}
						rules={[
							() => ({
								validator(_, value) {
									let dueDay = value?._d;
									let toDay = new Date();
									dueDay = dueDay?.toString().slice(0, 10);
									toDay = toDay.toString().slice(0, 10);
									const status = Date.parse(dueDay) - Date.parse(toDay);
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
						label={<span className="font-semibold">Piority</span>}
						name="piority"
						initialValue="normal"
					>
						<Select >
							{piority.map((piority, index)=>{
								return <Option key={index} value={piority.value}>{piority.name}</Option>
							})}
						</Select>
					</Form.Item>
				</div>
				<button type="submit" className={styles.btnAdd}>
					Add
				</button>
			</Form>
		</div>
	);
}
