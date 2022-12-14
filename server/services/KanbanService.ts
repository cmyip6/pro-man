import { Knex } from 'knex';
import { format } from 'date-fns';

export class KanbanService {
	constructor(private knex: Knex) {}

	async getKanbanInfo(project_id: number) {
		const kanbanDetail = await this.knex
			.with('items', (qb) => {
				qb.select(
					'items.id as id',
					'items.name as name',
					this.knex.raw('JSON_AGG(type_persons.name) as membersList')
				)
					.from('items')
					.join('type_persons', 'type_persons.item_id', 'items.id')
					.join('type_dates', 'type_dates.item_id', 'items.id')
					.groupBy('items.id')
					.where('items.project_id', project_id);
			})
			.select(
				'states.id as id',
				'states.name as name',
				'states.color as color',
				this.knex.raw('JSON_AGG(items.*) as itemsLists')
			)
			.from('states')
			.join('projects', 'states.project_id', '=', 'projects.id')
			.join('kanban_order', 'kanban_order.state_id', '=', 'states.id')
			.join('type_status', 'type_status.state_id', '=', 'states.id')
			.join('items', 'type_status.item_id', '=', 'items.id')
			.where('projects.id', project_id)
			.groupBy('states.id');

		return kanbanDetail;
	}

	async addKanbanitem(
		itemName: string,
		projectId: number,
		groupId: number,
		date: number
	) {
		const txn = await this.knex.transaction();
		try {
			const addItem = await txn
				.insert({
					name: itemName,
					project_id: projectId,
					item_group_id: groupId
				})
				.into('items')
				.returning('items.id');

			addItem;

			const addDate = await txn.insert({
				datetime: format(new Date(date), 'yyyy-MM-dd')
			});

			addDate;
			// const addMember = await txn .insert({name})
		} catch (e) {
			await txn.rollback();
			return;
		}
	}
}
